import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Community = () => {
  // States
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "" });
  const [isLoading, setIsLoading] = useState(true);
  const chatContainerRef = useRef(null);

  // Fetch auth and initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [authRes, messagesRes, eventsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/auth/check-auth", { withCredentials: true }),
          axios.get("http://localhost:5000/api/messages"),
          axios.get("http://localhost:5000/api/events")
        ]);

        // Handle username
        const user = authRes.data.user;
        if (!user) throw new Error("No user data in response");
        const extractedUsername = user.username || user.name || user.email;
        if (!extractedUsername) throw new Error("No username found");
        setUsername(extractedUsername);

        // Set other data
        setMessages(messagesRes.data);
        setEvents(eventsRes.data);
      } catch (error) {
        console.error("Error:", error.message);
        alert("Please log in to chat");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Message handlers
  const handleInputChange = (e) => setInputMessage(e.target.value);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !username) return;

    try {
      const newMessage = {
        username,
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString()
      };
      const res = await axios.post("http://localhost:5000/api/messages", newMessage);
      setMessages(prev => [...prev, res.data]);
      setInputMessage("");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDeleteMessage = async (id) => {
    console.log('Deleting message with ID:', id); // Debugging line
    try {
      const res = await axios.delete(`http://localhost:5000/api/messages/${id}`);
      if (res.data.success) {
        setMessages(prev => prev.filter(message => message._id !== id));
      } else {
        throw new Error("Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message");
    }
  };

  // Event handlers
  const handleEventChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEvents = [...events];
    updatedEvents[index][name] = value;
    setEvents(updatedEvents);
  };

  const handleEditEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].isEditing = true;
    setEvents(updatedEvents);
  };

  const handleSaveEvent = async (index) => {
    const updatedEvents = [...events];
    const eventToUpdate = updatedEvents[index];
    eventToUpdate.isEditing = false;
    setEvents(updatedEvents);

    try {
      await axios.put(`http://localhost:5000/api/events/${eventToUpdate._id}`, {
        title: eventToUpdate.title,
        description: eventToUpdate.description,
        date: eventToUpdate.date
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save event");
    }
  };

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = async () => {
    if (!newEvent.title.trim() || !newEvent.description.trim() || !newEvent.date.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/events", newEvent);
      setEvents(prev => [...prev, { ...res.data, isEditing: false }]);
      setNewEvent({ title: "", description: "", date: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add event");
    }
  };

  const handleDeleteEvent = async (index) => {
    const eventToDelete = events[index];
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventToDelete._id}`);
      setEvents(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete event");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-5 font-sans">
      {/* Welcome Section */}
      <section className="mb-8 p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-extrabold">Welcome to Our Community!</h1>
          {username && (
            <div className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold border border-gray-300">
              Logged in as: {username}
            </div>
          )}
        </div>
        <p className="text-lg">Connect, share, and grow with fellow shoppers. Join discussions, get tips, and explore exciting topics.</p>
      </section>

      {/* Events Section */}
      <section className="mb-8 border border-gray-300 rounded-lg p-6 shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b-2 border-gray-300 pb-2">
          Events and Announcements
        </h2>
        <div className="grid gap-6">
          {events.map((event, index) => (
            <div key={event._id} className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 border border-gray-300">
              {event.isEditing ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={(e) => handleEventChange(e, index)}
                    className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    name="description"
                    value={event.description}
                    onChange={(e) => handleEventChange(e, index)}
                    className="w-full p-3 mb-4 rounded-lg border border-gray-300 h-28 focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    name="date"
                    value={event.date}
                    onChange={(e) => handleEventChange(e, index)}
                    className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex space-x-2">
                    <button onClick={() => handleSaveEvent(index)} className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Save
                    </button>
                    <button onClick={() => handleDeleteEvent(index)} className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  <p className="text-sm text-gray-500 mb-4">Date: {event.date}</p>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditEvent(index)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteEvent(index)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add New Event Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8 border border-gray-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Add a New Event</h3>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleNewEventChange}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={newEvent.description}
            onChange={handleNewEventChange}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 h-28 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleNewEventChange}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleAddEvent} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full">
            Add Event
          </button>
        </div>
      </section>

      {/* Chat Section */}
      <section className="mb-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 shadow-lg text-white border border-gray-300">
        <h2 className="text-3xl font-semibold mb-4">Community Chat</h2>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : !username ? (
          <div className="text-center py-4 bg-red-500 rounded-lg">
            Please log in to participate in chat
          </div>
        ) : (
          <>
            <div ref={chatContainerRef} className="border border-gray-300 rounded-lg h-72 overflow-y-auto p-4 bg-white text-gray-800 mb-4">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
              ) : (
                messages.map((message) => (
                  <div key={message._id} className={`p-3 my-2 rounded-lg ${message.username === username ? 'bg-blue-100 ml-auto' : 'bg-gray-100'} border border-gray-300`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p><strong>{message.username}</strong>: {message.text}</p>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      {message.username === username && (
                        <button onClick={() => handleDeleteMessage(message._id)} className="ml-4 text-red-500 hover:text-red-700">
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder={username ? "Type your message..." : "Please log in to chat"}
                className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                disabled={!username || isLoading}
              />
              <button
                onClick={handleSendMessage}
                className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!username || !inputMessage.trim() || isLoading}
              >
                Send
              </button>
            </div>
          </>
        )}
      </section>

      {/* Rewards Section */}
      <section className="mb-8 border border-gray-300 rounded-lg p-6 shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Rewards for Active Members</h2>
        <p className="text-gray-700">
          Earn points for participation and redeem them for discounts. Collect badges for achievements like "Top Contributor" and "Helpful Reviewer."
        </p>
      </section>
    </div>
  );
};

export default Community;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Community = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "" });
  const chatContainerRef = useRef(null);

  // Fetch messages and events from the server on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [messagesRes, eventsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/messages"),
          axios.get("http://localhost:5000/api/events"),
        ]);
        setMessages(messagesRes.data);
        setEvents(eventsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Scroll to bottom of chat whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      try {
        const newMessage = {
          text: inputMessage,
          timestamp: new Date().toLocaleTimeString(),
        };
        const res = await axios.post("http://localhost:5000/api/messages", newMessage);
        setMessages((prev) => [...prev, res.data]);
        setInputMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Function to clear all messages
  const handleClearChat = async () => {
    try {
      await axios.delete("http://localhost:5000/api/messages");
      setMessages([]);
    } catch (error) {
      console.error("Error clearing chat:", error);
    }
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
        date: eventToUpdate.date,
      });
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEventChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEvents = [...events];
    updatedEvents[index][name] = value;
    setEvents(updatedEvents);
  };

  // Handle changes to the new event form
  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new event to the database
  const handleAddEvent = async () => {
    if (!newEvent.title.trim() || !newEvent.description.trim() || !newEvent.date.trim()) {
      alert("Please fill all fields before adding the event.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/events", newEvent);
      setEvents((prev) => [...prev, { ...res.data, isEditing: false }]);
      setNewEvent({ title: "", description: "", date: "" });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Delete an event
  const handleDeleteEvent = async (index) => {
    const eventToDelete = events[index];
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventToDelete._id}`);
      const updatedEvents = [...events];
      updatedEvents.splice(index, 1);
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-5 font-sans">
      {/* Welcome Section */}
      <section className="mb-8 p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl font-extrabold mb-2">Welcome to Our Community!</h1>
        <p className="text-lg">
          Connect, share, and grow with fellow shoppers. Join discussions, get tips, and explore exciting topics related
          to your favorite products.
        </p>
      </section>

      {/* Events and Announcements Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b-2 border-gray-300 pb-2">
          Events and Announcements
        </h2>
        <div className="grid gap-6">
          {events.map((event, index) => (
            <div
              key={event._id}
              className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              {event.isEditing ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={(e) => handleEventChange(e, index)}
                    className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    name="description"
                    value={event.description}
                    onChange={(e) => handleEventChange(e, index)}
                    className="w-full p-3 mb-4 rounded-lg border border-gray-300 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    name="date"
                    value={event.date}
                    onChange={(e) => handleEventChange(e, index)}
                    className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSaveEvent(index)}
                      className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(index)}
                      className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
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
                    <button
                      onClick={() => handleEditEvent(index)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add New Event Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Add a New Event</h3>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleNewEventChange}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={newEvent.description}
            onChange={handleNewEventChange}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleNewEventChange}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddEvent}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
          >
            Add Event
          </button>
        </div>
      </section>

      {/* Chat Section */}
      <section className="mb-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 shadow-lg text-white">
        <h2 className="text-3xl font-semibold mb-4">Community Chat</h2>
        <div
          ref={chatContainerRef}
          className="border border-gray-300 rounded-lg h-72 overflow-y-auto p-4 bg-white text-gray-800 mb-4"
        >
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((message) => (
              <div key={message._id} className="p-3 my-2 rounded-lg bg-gray-100">
                <p>{message.text}</p>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
              </div>
            ))
          )}
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
          >
            Send
          </button>
          <button
            onClick={handleClearChat}
            className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            Clear Chats
          </button>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Rewards for Active Members</h2>
        <p className="text-gray-700">
          Earn points for participation and redeem them for discounts. Collect badges for achievements like "Top Contributor" and
          "Helpful Reviewer."
        </p>
      </section>
    </div>
  );
};

export default Community;
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
      // Remove the event from the state
      const updatedEvents = [...events];
      updatedEvents.splice(index, 1);
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Welcome Section */}
      <section
        style={{
          marginBottom: "30px",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ fontSize: "36px", color: "#333" }}>Welcome to Our Community!</h1>
        <p style={{ fontSize: "18px", color: "#555" }}>
          Connect, share, and grow with fellow shoppers. Join discussions, get tips, and explore exciting topics related
          to your favorite products.
        </p>
      </section>

      {/* Events and Announcements Section */}
      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px", color: "#333" }}>Events and Announcements</h2>
        <div>
          {events.map((event, index) => (
            <div
              key={event._id}
              style={{
                background: "#fff",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              {event.isEditing ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={(e) => handleEventChange(e, index)}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      marginBottom: "10px",
                      width: "100%",
                    }}
                  />
                  <textarea
                    name="description"
                    value={event.description}
                    onChange={(e) => handleEventChange(e, index)}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      marginBottom: "10px",
                      width: "100%",
                      minHeight: "100px",
                    }}
                  />
                  <input
                    type="date"
                    name="date"
                    value={event.date}
                    onChange={(e) => handleEventChange(e, index)}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      marginBottom: "10px",
                      width: "100%",
                    }}
                  />
                  <button
                    onClick={() => handleSaveEvent(index)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(index)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>{event.title}</h3>
                  <p style={{ color: "#555" }}>{event.description}</p>
                  <p style={{ fontSize: "14px", color: "#888", marginBottom: "10px" }}>Date: {event.date}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleEditEvent(index)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#ffc107",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(index)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
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
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            marginTop: "20px",
          }}
        >
          <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>Add a New Event</h3>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleNewEventChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "10px",
              width: "100%",
            }}
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={newEvent.description}
            onChange={handleNewEventChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "10px",
              width: "100%",
              minHeight: "100px",
            }}
          />
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleNewEventChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "10px",
              width: "100%",
            }}
          />
          <button
            onClick={handleAddEvent}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add Event
          </button>
        </div>
      </section>

      {/* Chat Section */}
      <section
        style={{
          marginBottom: "30px",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ fontSize: "24px", marginBottom: "10px", color: "#333" }}>Community Chat</h2>
        <div
          ref={chatContainerRef}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            height: "300px",
            overflowY: "auto",
            padding: "10px",
            backgroundColor: "#fff",
            marginBottom: "10px",
          }}
        >
          {messages.length === 0 ? (
            <p style={{ color: "#888", textAlign: "center" }}>No messages yet. Start the conversation!</p>
          ) : (
            messages.map((message) => (
              <div
                key={message._id}
                style={{
                  padding: "10px",
                  margin: "5px 0",
                  borderRadius: "8px",
                  backgroundColor: "#f1f1f1",
                  wordWrap: "break-word",
                }}
              >
                {message.text}
                <span style={{ fontSize: "10px", color: "#888", marginLeft: "10px" }}>{message.timestamp}</span>
              </div>
            ))
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="text"
            placeholder="Type your message..."
            style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </section>

      {/* Rewards Section */}
      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px", color: "#333" }}>Rewards for Active Members</h2>
        <p>
          Earn points for participation and redeem them for discounts. Collect badges for achievements like "Top Contributor" and
          "Helpful Reviewer."
        </p>
      </section>
    </div>
  );
};

export default Community;

import React, { useState, useEffect } from "react";

const Community = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [events, setEvents] = useState([
    {
      title: "🎉 Community Meetup",
      description: "Join our monthly community meetup to connect with members!",
      date: "2024-12-15",
      isEditing: false,
    },
    {
      title: "🔥 Exclusive Sale Event",
      description: "Don't miss out on our members-only discounts this weekend!",
      date: "2024-12-10",
      isEditing: false,
    },
    {
      title: "📢 New Features Released",
      description: "Explore the latest updates and enhancements on our platform.",
      date: "2024-12-08",
      isEditing: false,
    },
  ]);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "" });

  // Load messages and events from localStorage when the component mounts
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("messages"));
    const savedEvents = JSON.parse(localStorage.getItem("events"));
    if (savedMessages) {
      setMessages(savedMessages);
    }
    if (savedEvents) {
      setEvents(savedEvents);
    }
  }, []);

  // Save messages and events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
    localStorage.setItem("events", JSON.stringify(events));
  }, [messages, events]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  const handleEditEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].isEditing = true;
    setEvents(updatedEvents);
  };

  const handleSaveEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].isEditing = false;
    setEvents(updatedEvents);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEvents = [...events];
    updatedEvents[index][name] = value;
    setEvents(updatedEvents);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Welcome Section */}
      <section style={{ marginBottom: "30px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ fontSize: "36px", color: "#333" }}>Welcome to Our Community!</h1>
        <p style={{ fontSize: "18px", color: "#555" }}>
          Connect, share, and grow with fellow shoppers. Join discussions, get tips, and explore exciting topics related to your favorite products.
        </p>
      </section>

      {/* Events and Announcements Section */}
      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px", color: "#333" }}>Events and Announcements</h2>
        <div>
          {events.map((event, index) => (
            <div key={index} style={{ background: "#fff", padding: "20px", marginBottom: "15px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
              {event.isEditing ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={(e) => handleInputChange(e, index)}
                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "10px", width: "100%" }}
                  />
                  <textarea
                    name="description"
                    value={event.description}
                    onChange={(e) => handleInputChange(e, index)}
                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "10px", width: "100%", minHeight: "100px" }}
                  />
                  <input
                    type="date"
                    name="date"
                    value={event.date}
                    onChange={(e) => handleInputChange(e, index)}
                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "10px", width: "100%" }}
                  />
                  <button
                    onClick={() => handleSaveEvent(index)}
                    style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>{event.title}</h3>
                  <p style={{ color: "#555" }}>{event.description}</p>
                  <p style={{ fontSize: "14px", color: "#888", marginBottom: "10px" }}>Date: {event.date}</p>
                  <button
                    onClick={() => handleEditEvent(index)}
                    style={{ padding: "5px 10px", backgroundColor: "#ffc107", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Chat Section */}
      <section style={{ marginBottom: "30px", backgroundColor: "#f9f9f9", borderRadius: "10px", padding: "20px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px", color: "#333" }}>Community Chat</h2>
        <div style={{ border: "1px solid #ddd", borderRadius: "10px", height: "300px", overflowY: "auto", padding: "10px", backgroundColor: "#fff", marginBottom: "10px" }}>
          {messages.length === 0 ? (
            <p style={{ color: "#888", textAlign: "center" }}>No messages yet. Start the conversation!</p>
          ) : (
            messages.map((message, index) => (
              <div key={index} style={{ padding: "10px", margin: "5px 0", borderRadius: "8px", backgroundColor: "#f1f1f1", wordWrap: "break-word" }}>
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
            style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
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
          Earn points for participation and redeem them for discounts. Collect badges for achievements like "Top Contributor" and "Helpful Reviewer."
        </p>
      </section>
    </div>
  );
};

export default Community;

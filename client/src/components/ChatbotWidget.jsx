import React, { useState } from "react";
import axios from "axios";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  // Toggle chat window visibility
  const toggleChat = () => setIsOpen(!isOpen);

  // Send message to the backend
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      // Send message to the backend with language and message
      const response = await axios.post("http://localhost:4173/chat", {
        message: input,
        language: selectedLanguage, // Include selected language
      });

      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: "bot", text: "Error connecting to the server." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Chatbot Toggle Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
        onClick={toggleChat}
      >
        {isOpen ? "X" : "Chat With Us"}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="w-80 bg-white shadow-lg rounded-lg p-4 mt-2 border relative">
          {/* Navbar below the Close Chat button */}
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">DiasporaConnect</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="border rounded p-1"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Telugu</option>
              <option>French</option>
              <option>German</option>
              <option>Japanese</option>
            </select>
          </div>

          {/* Chat Messages */}
          <div className="overflow-y-auto h-64">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded ${
                  msg.sender === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Field and Send Button */}
          <div className="flex mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow border rounded-l p-2"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-r"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;

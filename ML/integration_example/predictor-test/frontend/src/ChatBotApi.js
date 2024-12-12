import axios from 'axios';

// Create an instance of axios with the base URL
const ChatBotApi = axios.create({
  baseURL: "http://localhost:4173"
});

// Export the Axios instance
export default ChatBotApi;
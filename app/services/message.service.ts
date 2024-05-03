import axios from 'axios';
import { MessageData } from '../types/user-types';
const MESSAGE_API_URL = "http://localhost:3000/auth/message/";

export const sendMessage = (messageData: MessageData) => {
    return axios.post(`${MESSAGE_API_URL}send`, messageData)
        .then(response => response.data)
        .catch(error => {
            console.error('Error sending message:', error);
            return { error }; // Return error to handle it in the UI if needed
        });
};

export const getMessage = (agentId: number) => {
    return axios.get(`${MESSAGE_API_URL}`, {
        params: { agentId }
    }).then(response => response.data)
    .catch(error => {
        console.error('Error fetching messages for agent:', error);
        return { error }; // Return error
    });
};

export const deleteMessage = (messageId: number) => {
    return axios.delete(`${MESSAGE_API_URL}delete/${messageId}`)
        .then(response => response.data)
    .catch(error => {
            console.error('Error deleting message:', error);
            return { error }; // Return error
        });
};

export const fetchAgents = async () => {
    try {
        const response = await axios.get('/auth/agents'); // Adjust this URL to where your agents are fetched
        return response.data;
    } catch (error) {
        console.error("Failed to fetch agents:", error);
        throw error;
    }
};
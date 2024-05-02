import React, { useState, useEffect } from "react";
import axios from 'axios';

const MESSAGE_API_URL = "http://localhost:3000/api/messages/get"; // Adjust this as necessary
// Define an interface for the message structure as expected from the API

interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    createdAt: Date;
}

// Assuming role ID: 1 for users, 2 for agents

// Define props for the Messages component based on roles
interface MessagesProps {
    userRoleId: number;
    agentRoleId: number;
}

// A function to fetch messages from the server using role IDs
const fetchMessages = (userRoleId: number, agentRoleId: number): Promise<Message[]> => {
    return axios.get<Message[]>(MESSAGE_API_URL, {
        params: { userRoleId, agentRoleId }
    }).then(response => response.data)
    .catch(error => {
        console.error('Error fetching messages:', error);
        throw error; // Rethrowing the error to be handled by the caller
    });
};

const Recieve = ({ userRoleId, agentRoleId }: MessagesProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Function to load messages using roles
    const loadMessages = async () => {
        try {
            setLoading(true);
            const data = await fetchMessages(userRoleId, agentRoleId);
            setMessages(data);
            setError("");
        } catch (error) {
            setError("Failed to fetch messages. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMessages();
        const interval = setInterval(loadMessages, 5000); // Polling every 5 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [userRoleId, agentRoleId]); // Dependencies for useEffect

    return (
        <div>
            <h2>Messages</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={loadMessages} disabled={loading}>Refresh Messages</button>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>{msg.senderId === userRoleId ? "Me" : "Agent"}:</strong> {msg.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recieve;


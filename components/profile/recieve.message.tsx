import React, { useState, useEffect } from "react";

interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    createdAt: Date;
}

interface MessagesProps {
    userRoleId: number;
    agentRoleId: number;
}

const mockMessages: Message[] = []; // Start with an empty array to simulate no messages received

const fetchMessages = async (userRoleId: number, agentRoleId: number): Promise<Message[]> => {
    // Simulate fetching messages, initially no messages
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockMessages);
        }, 1000);
    });
};

const Receive = ({ userRoleId, agentRoleId }: MessagesProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
        const interval = setInterval(loadMessages, 5000);
        return () => clearInterval(interval);
    }, [userRoleId, agentRoleId]);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        backgroundColor: 'white',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
        width: '15%',
        margin: '20px auto'
    };

    const headerStyle = {
        width: '120%',
        marginBottom: '10px',
        paddingBottom: '5px',
        borderBottom: '1px solid black',
        textAlign: 'center' as 'center'
    };

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Messages</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={loadMessages} disabled={loading}></button>
            {messages.length > 0 ? (
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>{msg.senderId === userRoleId ? "Me" : "Agent"}:</strong> {msg.content}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No message received</p>
            )}
        </div>
    );
};

export default Receive;

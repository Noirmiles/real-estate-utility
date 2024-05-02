import React, { useState, useEffect} from "react";
import { sendMessage } from "@/app/services/message.service";
import { fetchAgentsByRole } from "@/app/services/auth.service";
import { Button } from "../ui/button";
import { Agent } from "@prisma/client";

type SafeAgent = Omit<Agent, 'password'>; 

function Request() {
    const [message, setMessage] = useState('');
    const [agents, setAgents] = useState<SafeAgent[]>([]);
    const [receiverId, setReceiverId] = useState<number | ''>(''); 
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAgentsByRole(2).then(response => {
            if (response.error) {
                throw new Error(response.error);
            }
            setAgents(response.agents || []);
        }).catch(error => {
            console.error('Failed to fetch agents:', error);
            setError('Failed to load agents. Please reload the page.');
        });
    }, []);

    const handleSend = () => {
        if (!message.trim()) {
            alert('Please enter a message before sending.');
            return;
        }
        if (!receiverId) {
            alert('Please select an agent before sending.');
            return;
        }

        setIsSending(true);
        setError('');

        const messageData = {
            senderId: 1,
            receiverId: parseInt(receiverId.toString(), 10),
            content: message,
            propertyId: 123
        };

        sendMessage(messageData).then(() => {
            alert('Message sent successfully');
            setMessage('');
            setReceiverId('');  // Resetting for type consistency
        }).catch(error => {
            console.error('Error sending message:', error);
            setError('Failed to send message. Please try again later.');
        }).finally(() => {
            setIsSending(false);
        });
    };
    const headingStyle:React.CSSProperties = {
    fontSize: '30px',
    textAlign: 'center',
    margin: '20 px 0',
    marginBottom: '15px',
    color: 'black',
    fontWeight: 'bold',
    border: '2px solid #000',
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: 'fff',
    width: 'fit-content',
    alignSelf: 'center',
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    border: '2px solid #007BFF',
    backgroundColor: '#F8F9FA',
    boxShadow: '0px 0px 8px rgba(0, 123, 255, 0.2)'
};

    const underlineStyle: React.CSSProperties = {
        borderTop: '1px solid #000',
        width: '113%',
        textAlign: 'center',
        padding: '5px 0'
    };

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            maxWidth: '300px',
            margin: '20px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'black',
            fontSize: '16px'
        }}>
            <h2 style ={headingStyle}>Send Message</h2>
            <div style={underlineStyle}></div> {}
           <div style={{borderTop: '1px solid #000', paddingTop:'10px'}}></div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <select
                value={receiverId}
                onChange={e => setReceiverId(parseInt(e.target.value, 10) || '')}
                style= {selectStyle} 
                disabled={agents.length === 0}
            >
                <option value="">Select an agent</option>
                {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                        {agent.firstName} {agent.lastName}
                    </option>
                ))}
            </select>
            <textarea
                style={{
                    width: '100%',
                    height: '150px',
                    margin: '10px 0',
                    padding: '10px',
                    boxSizing: 'border-box',
                    fontSize: '16px',
                    border: '2px solid #007BFF',
                    backgroundColor: '#F8F9FA',
                    boxShadow: 'inset 0px 0px 8px rgba(0,0,0,0.1)'
                }}
                value={message}
                onChange={e => setMessage(e.target.value)}
                disabled={isSending}
            />
            <Button
                style={{
                    padding: '10px 20px',
                    width: '50%',
                    marginTop: '10px'
                }}
                onClick={handleSend}
                disabled={isSending || message.trim() === '' || !receiverId}
            >
                {isSending ? 'Sending...' : 'Send Message'}
            </Button>
        </div>
    );
}

export default Request;
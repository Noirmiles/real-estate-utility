'use client'
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '@/app/services/auth.service';

interface IUserDetails {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: { id: number; name: string };  // Assuming role is an object with id and name
}

const Profile = () => {
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUserDetails(user);
        } else {
          throw new Error("No user found");
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch user details');
      }
    };

    fetchUserDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userDetails) {
    return <div>Loading user details...</div>;
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '10px',
      maxWidth: '500px',
      margin: '20px auto',
      textAlign: 'left',
      color: 'black',
      fontSize: '16px'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '5px' , fontSize: '20px'}}>User Profile</h1>
      <div style={{ borderTop: '1px solid #000', paddingTop: '10px' }}></div>
      <p><strong>Username:</strong> {userDetails.username}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>First Name:</strong> {userDetails.firstName}</p>
      <p><strong>Last Name:</strong> {userDetails.lastName}</p>
      <p><strong>Role:</strong> {userDetails.role.name}</p>  {/* Correctly accessing role name */}
    </div>
  );
};

export default Profile;


'use client'
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '@/app/services/auth.service';

interface IUserDetails {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
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
          throw new Error("No user found"); // Explicitly throw an error if no user is returned
        }
      } catch (err: any) { // Catching errors specifically from the try block
        setError(err.message || 'Failed to fetch user details'); // Set error message from caught error
      }
    };

    fetchUserDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Displaying the error message if any error is set
  }

  if (!userDetails) {
    return <div>Loading user details...</div>; // Handling the loading state
  }

  return (
    <div style={{
      backgroundColor: 'white', // White background for the box
      borderRadius: '8px', // Rounded corners
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow for 3D effect
      padding: '10px', // Padding inside the box
      maxWidth: '500px', // Maximum width for the container
      margin: '20px auto', // Margin for top/bottom and auto for horizontal centering
      textAlign: 'left', // Text aligned to the left
      color: 'black', // Text color black
      fontSize: '16px' // Font size set to 16px
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '5px' , fontSize: '20px'}}>User Profile</h1>
      <div style={{ borderTop: '1px solid #000', paddingTop: '10px' }}></div>
      <p><strong>Username:</strong> {userDetails.username}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>First Name:</strong> {userDetails.firstName}</p>
      <p><strong>Last Name:</strong> {userDetails.lastName}</p>
      <p><strong>Role:</strong> {userDetails.role}</p>
    </div>
  );
};

export default Profile;


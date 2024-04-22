'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import SearchBar from '@/components/searchBar'; 
import Background from '@/components/background';
import Profile from '@/components/profile/client';
import Image from 'next/image';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <>{children}</>
      )}
    </div>
  );
}

export default function Portal() {
  const [activeTab, setActiveTab] = useState('searches');
  const [showImage, setShowImage] = useState(true); // State to control image visibility

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setShowImage(false);  // Hide image whenever a tab is clicked
  };

  return (
    <div>
      <Background />
      <div className="client-portal">
        <div className="tab-navigation">
          <Button onClick={() => handleTabClick('profile')}>
            Profile
          </Button>
          <Button onClick={() => handleTabClick('scheduling')}>
            Scheduling
          </Button>
          <Button onClick={() => handleTabClick('searches')}>
            Saved Searches
          </Button>
          <Button onClick={() => handleTabClick('homes')}>
            Saved Homes
          </Button>
          <Button onClick={() => handleTabClick('message')}>
            Messages
          </Button>
          <Button onClick={() => handleTabClick('setting')}>
            Account Settings
          </Button>
          <Button onClick={() => handleTabClick('passcodes')}>
            Passcodes
          </Button>
          <Button onClick={() => handleTabClick('showings')}>
            Showings
          </Button>
        </div>

        <TabPanel value={activeTab} index="profile">
          <Profile />  {/* Render Profile Component */}
        </TabPanel>

        <TabPanel value={activeTab} index="scheduling">
          <div className="tab-content">
            <h2>Schedule</h2>
            {/* Content for scheduling */}
          </div>
        </TabPanel>

        <TabPanel value={activeTab} index="searches">
          <div className="tab-content">
            <h2>Saved Searches</h2>
            {/* Content for saved searches */}
          </div>
        </TabPanel>

        <TabPanel value={activeTab} index="homes">
          <div className="tab-content">
            <h2 style={{fontSize: '24px', color: 'white', fontWeight: 'bold'}}>Saved Homes</h2>
            {/* Content for saved homes */}
          </div>
        </TabPanel>

        <TabPanel value={activeTab} index="message">
          <div className="tab-content">
            <h2>Messages</h2>
            {/* Content for messages */}
          </div>
        </TabPanel>
      
        <TabPanel value={activeTab} index="setting">
          <div className="tab-content">
            <h2>Account Settings</h2>
            {/* Content for account settings */}
          </div>
        </TabPanel>
        
        <TabPanel value={activeTab} index="passcodes">
          <div className="tab-content">
            <h2>Passcodes</h2>
            {/* Content for account settings */}
          </div>
        </TabPanel>
        <TabPanel value={activeTab} index="showings">
          <div className="tab-content">
            <h2>Showings</h2>
            {/* Content for account settings */}
          </div>
        </TabPanel>
      
        {showImage && (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0', marginTop: '150px'}}>
            <Image
              src="/houseIllustration.png"
              alt="House Illustration"
              width={500} 
              height={300} 
              layout="intrinsic" 
            />
          </div>
        )}

        <div style={{width: '30%', margin: 'auto', marginTop: '50px'}}>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}





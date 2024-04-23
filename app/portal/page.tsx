'use client';
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import SearchBar from '@/components/searchBar';
import Background from '@/components/background';
import Profile from '@/components/profile/client';
import Image from 'next/image';
import { getCurrentUser } from '@/app/services/auth.service';  // Import the getCurrentUser function
import { IUser } from '../types/user-types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
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
      {value === index && <>{children}</>}
    </div>
  );
}

export default function Portal() {
  const [activeTab, setActiveTab] = useState('searches');
  const [showImage, setShowImage] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setShowImage(false);  // Hide image whenever a tab is clicked
  };

  const isUser = user && user.role.name === 'user';
  const isAgent = user && user.role.name === 'agent';
  const isManager = user && user.role.name == 'manager';

  return (
    <div>
      <Background />
      <div className="client-portal">
        <div className="tab-navigation">
          {(isUser || isAgent || isManager) && (
            <>
              <Button onClick={() => handleTabClick('profile')}>Profile</Button>
              <Button onClick={() => handleTabClick('message')}>Messages</Button>
            </>
          )}
        {isAgent &&<Button onClick={() => handleTabClick('scheduling')}>Scheduling</Button>}
        {isAgent && <Button onClick={() => handleTabClick('passcodes')}>Passcodes</Button>}
        {isAgent &&<Button onClick={() => handleTabClick('showings')}>Showings</Button>}
        {isAgent && <Button onClick={() => handleTabClick('listing')}>Listing</Button>}
        {isManager && <Button onClick={() => handleTabClick('reports')}>Reports</Button>}
        </div>

        {(isUser || isAgent || isManager) && (
          <>
            <TabPanel value={activeTab} index="profile">
              <Profile />
            </TabPanel>
            <TabPanel value={activeTab} index="message">
              <div className="tab-content">
                <h2>Messages</h2>
              </div>
            </TabPanel>
          </>
        )}
        {isAgent && (
        <TabPanel value={activeTab} index="scheduling">
          <div className="tab-content">
            <h2>Schedule</h2>
          </div>
        </TabPanel>
         )}
        {isAgent && (
        <TabPanel value={activeTab} index="passcodes">
          <div className="tab-content">
            <h2>Passcodes</h2>
          </div>
        </TabPanel>
        )}
        {isAgent && (
        <TabPanel value={activeTab} index="showings">
          <div className="tab-content">
            <h2>Showings</h2>
          </div>
        </TabPanel>
        )}
        {isAgent && (
        <TabPanel value={activeTab} index="listing">
          <div className="tab-content">
            <h2>Listing</h2>
          </div>
        </TabPanel>
        )}

        {isManager && (
          <TabPanel value={activeTab} index="reports">
            <div className="tab-content">
              <h2>Reports</h2>
            </div>
          </TabPanel>
        )}

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
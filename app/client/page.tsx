'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import SearchBar from '@/components/searchBar'; 
import Background from '@/components/background';

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

//
export default function Client() {
  const [activeTab, setActiveTab] = useState('searches');

  return (
    <div>
      <Background />
      <div className="client-portal">
        <div className="tab-navigation">
          <Button onClick={() => setActiveTab('scheduling')}>
            Scheduling
          </Button>
          <Button onClick={() => setActiveTab('searches')}>
            Saved Searches
          </Button>
          <Button onClick={() => setActiveTab('homes')}>
            Saved Homes
          </Button>
          <Button onClick={() =>setActiveTab('viewed')}>
            Recently viewed
          </Button>
          <Button onClick={() => setActiveTab( 'message')}>
            Messages
          </Button>
          <Button onClick={() => setActiveTab('setting')}>
            Account Settings
          </Button>
        </div>

    
        <TabPanel value={activeTab} index="/searches">
          <div className="tab-content">
            <h2>Saved Searches</h2>
            {/* Content for saved searches */}
          </div>
        </TabPanel>

        <TabPanel value={activeTab} index="/homes">
          <div className="tab-content">
            <h2 style={{fontSize: '24px', color: 'white', fontWeight: 'bold'}}>Saved Homes</h2>
            {/* Content for saved homes */}
          </div>
        </TabPanel>

        <TabPanel value={activeTab} index="/scheduling">
          <div className="tab-content">
            <h2>Schedule</h2>
            {/* Content for saved homes */}
          </div>
        </TabPanel>

          <TabPanel value={activeTab} index="/viewed">
          <div className="tab-content">
            <h2>Recently Viewed</h2>
            {/* Content for saved homes */}
          </div>
        </TabPanel>

          <TabPanel value={activeTab} index="/message">
          <div className="tab-content">
            <h2>Messages</h2>
            {/* Content for saved homes */}
          </div>
        </TabPanel>

        <TabPanel value={activeTab} index="/setting">
          <div className="tab-content">
            <h2>Account Settings</h2>
            {/* Content for saved homes */}
          </div>
        </TabPanel>
 
      
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0,', marginTop: '150px'}}>
        <img src="/houseIllustration.png" alt="House Illustration" style={{ maxWidth: '100%', height: '200%' }} />
      </div>


        <div style={{width: '30%', margin: 'auto', marginTop: '50px'}}>
        <SearchBar />
        </div>
       
      </div>
    </div>
  );
}

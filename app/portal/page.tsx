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

interface Property {
  id: number;
  address: string;
  agentName: string;
  agencyName: string;
}

interface Showing {
  id: number;
  scheduledAt: string;
  property: Property;
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
  const [showings, setShowings] = useState<Showing[]>([]);

  const fetchShowings = async () => {
    try {
      const response = await fetch('/api/showings');
      const data = await response.json();
      setShowings(data);
    } catch (error) {
      console.error('Error fetching showings:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'showings') {
      fetchShowings();
    }
  }, [activeTab]);

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
        {isAgent && <Button onClick={() => handleTabClick('Statements/Contracts')}>Contracts</Button>}
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
          <h2 className="text-2xl font-bold mb-4">Showings</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Address</th>
                  <th className="py-3 px-6 text-left">Start Time</th>
                  <th className="py-3 px-6 text-left">End Time</th>
                  <th className="py-3 px-6 text-left">Agent Name</th>
                  <th className="py-3 px-6 text-left">Agency Name</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {showings.map((showing) => (
                  <tr key={showing.id} className="bg-white border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-4 px-6">{showing.property.id}</td>
                    <td className="py-4 px-6">{showing.property.address}</td>
                    <td className="py-4 px-6">{new Date(showing.scheduledAt).toLocaleString()}</td>
                    <td className="py-4 px-6">
                      {new Date(new Date(showing.scheduledAt).getTime() + 60 * 60 * 1000).toLocaleString()}
                    </td>
                    <td className="py-4 px-6">{showing.property.agentName}</td>
                    <td className="py-4 px-6">{showing.property.agencyName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
        {isAgent && (
        <TabPanel value={activeTab} index="Statements/Contracts">
        <div className="tab-content">
          <h2 className="text-2xl font-bold mb-4 text-white">Statements/Contracts</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <ul className="space-y-4">
              <li>
                <a
                  href="/Request for Repair Statement.pdf"
                  download
                  className="flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Request for Repair Statement
                </a>
              </li>
              <li>
                <a
                  href="/Sales Contract.pdf"
                  download
                  className="flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sales Contract
                </a>
              </li>
              <li>
                <a
                  href="/Closing Costs.pdf"
                  download
                  className="flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Closing Costs
                </a>
              </li>
            </ul>
          </div>
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
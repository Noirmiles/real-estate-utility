import React, { useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface PropertyData {
  id: number;
  listPrice: number;
  state: string;
  city: string;
  address: string;
  squareFootage: number;
  numberOfRooms: number;
  numberOfBathrooms: number;
  propertyType: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface PropertyDetailsModalProps {
  property: PropertyData;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  const [showingRequestOpen, setShowingRequestOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleRequestShowing = () => {
    setShowingRequestOpen(true);
  };

  const handleCloseShowingRequest = () => {
    setShowingRequestOpen(false);
    setSelectedDate(null);
    setSelectedTime('');
  };

  const handleDateChange = (value: Date | null) => {
    if (value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (value >= tomorrow) {
        setSelectedDate(value);
      } else {
        alert('Showings can only be scheduled at least 24 hours in advance.');
        setSelectedDate(null);
      }
    } else {
      setSelectedDate(null);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmitRequest = () => {
    // Handle the submission of the showing request here
    // You can send the selected date and time to the server or update the user's dashboard
    console.log('Showing Request:', selectedDate, selectedTime);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      handleCloseShowingRequest();
      onClose();
    }, 2000);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Property Details"
        className="fixed inset-0 z-50 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-4 relative">
                {Array.isArray(property.images) && property.images.length > 0 && (
                  <>
                    <Image
                      key={property.images[currentImageIndex]}
                      src={`/images/${property.images[currentImageIndex]}`}
                      alt={`Property Image ${currentImageIndex + 1}`}
                      width={500}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4">
                      <button
                        className="bg-gray-300 text-gray-800 rounded-full p-2 hover:bg-gray-400"
                        onClick={handlePrevImage}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        className="bg-gray-300 text-gray-800 rounded-full p-2 hover:bg-gray-400"
                        onClick={handleNextImage}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">{property.address}</h2>
              <p className="text-gray-600 mb-4">
                {property.city}, {property.state}
              </p>
              <p className="text-gray-800 font-semibold mb-2">${property.listPrice}</p>
              <p className="mb-2">
                <span className="font-semibold">Bedrooms:</span> {property.numberOfRooms}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Bathrooms:</span> {property.numberOfBathrooms}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Square Footage:</span> {property.squareFootage}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Dwelling Type:</span> {property.propertyType}
              </p>
              {/* Add any additional property details here */}
            </div>
          </div>
          <div className="flex justify-end mt-6">         
          <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
            >
              Delete
            </button>          
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-4"
              onClick={handleRequestShowing}
            >
              Schedule a Showing
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {showingRequestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
            {showConfirmation && (
              <div className="mb-4">
                <p className="text-lg font-semibold">Your showing request has been sent to the listing agent.</p>
              </div>
            )}
            <h2 className="text-2xl font-bold mb-4">Schedule a Showing</h2>
            <div>
              <Calendar
                onChange={(value) => handleDateChange(value instanceof Date ? value : null)}
                value={selectedDate || null}
                minDate={new Date()}
                calendarType="US"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="showingTime" className="block font-medium mb-1">
                Showing Time
              </label>
              <input
                type="time"
                id="showingTime"
                value={selectedTime}
                onChange={handleTimeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
                onClick={handleCloseShowingRequest}
              >
                Close
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleSubmitRequest}
                disabled={!selectedDate || !selectedTime}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDetailsModal;
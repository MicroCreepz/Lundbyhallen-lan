"use client"

import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  guardianPhone: string;
  age: number;
}

const Home: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    guardianPhone: '',
    age: 6, // Default age to 6
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black relative overflow-hidden">
      <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-gradient-to-br from-pink-500 to-gray-900 opacity-75"></div>
      <div className="max-w-md mx-auto p-6 border rounded-lg border-pink-600 bg-pink-900 relative z-20 shadow-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-white text-shadow-md">
          Välkommen till registreringen för Lundbyhallens LAN av LBS Borås och Borås stad
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-white">First Name</label>
            <input
              type="text"
              name="firstName"
              className="w-full border rounded px-3 py-2 bg-pink-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-white">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="w-full border rounded px-3 py-2 bg-pink-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-white">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border rounded px-3 py-2 bg-pink-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-white">Guardian Phone</label>
            <input
              type="tel"
              name="guardianPhone"
              className="w-full border rounded px-3 py-2 bg-pink-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-white">Age (Not under 6)</label>
            <input
              type="number"
              name="age"
              className="w-full border rounded px-3 py-2 bg-pink-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              min={6}
              value={formData.age}
              onChange={(e) => {
                const newAge = parseInt(e.target.value);
                if (newAge >= 6) {
                  setFormData({ ...formData, age: newAge });
                }
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="absolute left-20 md:w-64 bg-pink-800 text-white p-6 mt-8 md:mt-0 md:ml-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Important Information</h2>
          <ul>
            <li className="mb-2">Info 1: Lorem ipsum dolor sit amet.</li>
            <li className="mb-2">Info 2: Consectetur adipiscing elit.</li>
            <li className="mb-2">Info 3: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
            {/* Add more items as needed */}
          </ul>
        </div>
    </div>
  );
};

export default Home;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReportTypes() {
  const navigate = useNavigate();

  const handleReportSelection = (reportType) => {
    navigate(`/${reportType}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-6">Generate Reports</h2>
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => handleReportSelection('BooksBorrowed')}
          className="bg-[#000000] text-white py-3 px-6 rounded"
        >
          Books Borrowed by Members
        </button>
        <button
          onClick={() => handleReportSelection('MemberActivity')}
          className="bg-[#000000] text-white py-3 px-6 rounded"
        >
          Member Activity
        </button>
        <button
          onClick={() => handleReportSelection('BookAvailability')}
          className="bg-[#000000] text-white py-3 px-6 rounded"
        >
          Book Availability
        </button>
      </div>
    </div>
  );
}

export default ReportTypes;

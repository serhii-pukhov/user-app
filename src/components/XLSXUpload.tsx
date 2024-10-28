'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { User } from '@prisma/client';

interface XLSXUploadProps {
  onImport: () => void
}

export default function XLSXUpload({ onImport }: XLSXUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<User[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File uploaded:", file.name);
      setIsModalOpen(false); // Close the modal after file selection
      const formData = new FormData();
      formData.append('file', file);

      // Send the file to the server using fetch
      const res = await fetch('/api/upload-xlsx', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        setParsedData(result.data);
        onImport();
      } else {
        console.error('Error uploading the file');
      }
    }
  };

  return (
    <div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Import
      </button>
      {/* File Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Import Users</h2>
            <p className="text-gray-600 mb-4">Select a file to upload:</p>
            <label
              htmlFor="file-upload-modal"
              className="block w-full py-8 border-2 border-dashed border-gray-300 text-center rounded-lg cursor-pointer hover:border-blue-500 transition"
            >
              <span className="text-gray-500">Click to select a file</span>
              <input
                id="file-upload-modal"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

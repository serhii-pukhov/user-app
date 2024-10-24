'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { redirect } from 'next/navigation';
import { User } from '@prisma/client';

export default function XLSXUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<User[] | null>(null);

  // Handle file input change
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  // Handle form submission
  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    // Send the file to the server using fetch
    const res = await fetch('/api/upload-xlsx', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const result = await res.json();
      setParsedData(result.data);
    } else {
      console.error('Error uploading the file');
    }

    redirect("/");

  };

  return (
    <div>
      <h3>Upload an XLSX File</h3>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
        />
        <button type="submit">Upload XLSX</button>
      </form>
    </div>
  );
}

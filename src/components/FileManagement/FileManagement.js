import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileManagement.scss';

const FileManagement = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [objects, setObjects] = useState([]);
    const [error, setError] = useState('');

    // Get the API URL and Bucket name from environment variables
    const apiUrl = process.env.REACT_APP_API_URL;
    const bucketName = process.env.REACT_APP_BUCKET_NAME || 'two-point-five-lambda';  // Defaulting to 'two-point-five-lambda'

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Upload file to the backend
    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`${apiUrl}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message || 'File uploaded successfully!');
            setFile(null); // Clear the file input
            fetchObjects(); // Refresh the file list
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Error uploading file. Please try again.');
        }
    };

    // Fetch the list of objects from the backend
    const fetchObjects = async () => {
        try {
            const response = await axios.get(`${apiUrl}/list-objects`);
            setObjects(response.data.Contents || []); // Assume `Contents` holds the list of objects
        } catch (err) {
            console.error('Error fetching objects:', err);
            setError('Error fetching objects. Please try again.');
        }
    };

    // Fetch objects on component mount
    useEffect(() => {
        fetchObjects();
    }, []);

    return (
        <div>
            <h1>File Management</h1>

            {/* File Upload Section */}
            <div>
                <h2>Upload File</h2>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
                {message && <p>{message}</p>}
            </div>

            {/* List Files Section */}
            <div>
                <h2>Uploaded Files</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {objects.length > 0 ? (
                    <ul>
                        {objects.map((obj, index) => {
                            // Assuming 'original-images/' for original and 'resized-images/' for resized images
                            const originalImageUrl = `https://${bucketName}.s3.amazonaws.com/original-images/${obj.Key}`;
                            const thumbnailImageUrl = `https://${bucketName}.s3.amazonaws.com/resized-images/${obj.Key.replace('original-images/', '').replace('.jpg', '-thumbnail.jpg')}`;
                            
                            return (
                                <li key={index}>
                                    <div>
                                        <h3>{obj.Key.replace('original-images/', '')}</h3>
                                        <div>
                                            <p>Original:</p>
                                            <img
                                                src={originalImageUrl}
                                                alt={obj.Key}
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div>
                                            <p>Thumbnail:</p>
                                            <img
                                                src={thumbnailImageUrl}
                                                alt={obj.Key}
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p>No files found.</p>
                )}
            </div>
        </div>
    );
};

export default FileManagement;

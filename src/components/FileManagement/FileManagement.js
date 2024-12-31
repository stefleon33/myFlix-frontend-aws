import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import './FileManagement.scss';

const FileManagement = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [objects, setObjects] = useState([]);
    const [error, setError] = useState('');

    // Get the API URL and Bucket name from environment variables
    const apiUrl = process.env.REACT_APP_API_URL;
    const bucketName = process.env.REACT_APP_BUCKET_NAME || 'two-point-five-lambda';

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
        <div className="file-management-container">
            {/* Upload Section */}
            <Card className="upload-card">
                <Card.Body>
                    <Card.Title>Upload File</Card.Title>
                    <input type="file" onChange={handleFileChange} />
                    <Button variant="primary" className="mt-3" onClick={handleUpload}>
                        Upload
                    </Button>
                    {message && <p className="upload-message mt-3">{message}</p>}
                </Card.Body>
            </Card>

            {/* Uploaded Files Section */}
<Card className="images-card mt-4">
    <Card.Body>
        <Card.Title>Uploaded Files</Card.Title>
        {error && <p className="error-message">{error}</p>}
        {objects.length > 0 ? (
            <div className="images-grid mt-3">
                {objects.map((obj, index) => {
                    const originalImageUrl = `https://${bucketName}.s3.amazonaws.com/${obj.Key}`;
                    const thumbnailImageUrl = `https://${bucketName}.s3.amazonaws.com/resized-images/${obj.Key.split('/').pop()}`;

                    return (
                        <Card className="image-card" key={index}>
                            <Card.Body>
                                <div className="images-row">
                                    {/* Original Image */}
                                    <div className="image-column">
                                        <Card.Img
                                            src={originalImageUrl}
                                            alt="Original"
                                            className="image"
                                        />
                                        <Card.Text className="text-center">Original</Card.Text>
                                        <a href={originalImageUrl} target="_blank" rel="noopener noreferrer">
                                            View Original
                                        </a>
                                    </div>

                                    {/* Resized Image */}
                                    <div className="image-column">
                                        <Card.Img
                                            src={thumbnailImageUrl}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/100';
                                            }}
                                            alt="Resized"
                                            className="image"
                                        />
                                        <Card.Text className="text-center">Resized</Card.Text>
                                        <a href={thumbnailImageUrl} target="_blank" rel="noopener noreferrer">
                                            View Resized
                                        </a>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
        ) : (
            <p className="mt-3">No files found.</p>
        )}
    </Card.Body>
</Card>
        </div>
    );
};

export default FileManagement;

import React, { useState } from 'react';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

const s3 = new S3Client({
    region: import.meta.env.VITE_REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY
    }
  });
  

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFileToS3 = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const fileName = `${Date.now()}_${file.name}`;
    const target = {
      Bucket: "drop-s3",
      Key: fileName,
      Body: file
    };

    setUploading(true);
    setError('');
    try {
      const upload = new Upload({
        client: s3,
        params: target,
      });

      upload.on("httpUploadProgress", (progress) => {
        console.log("Progress:", progress);
      });

      await upload.done();
      setUploadedFileUrl(`https://drop-s3.s3.eu-north-1.amazonaws.com/${fileName}`);
      alert("Upload Successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Upload File to Aws-S3</h2>

      <input 
        type="file" 
        onChange={handleFileChange} 
        style={styles.input} 
      />

      <button 
        onClick={uploadFileToS3} 
        disabled={uploading}
        style={uploading ? styles.uploadingButton : styles.uploadButton}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {uploadedFileUrl && (
        <div style={styles.uploadedFile}>
          <p>Uploaded File:</p>
          <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">
            {uploadedFileUrl}
          </a>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '400px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  input: {
    padding: '10px',
    marginBottom: '20px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s ease',
  },
  uploadingButton: {
    backgroundColor: '#ccc',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'not-allowed',
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  uploadedFile: {
    marginTop: '20px',
    wordBreak: 'break-all',
  }
};

export default FileUpload;

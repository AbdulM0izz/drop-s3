// src/aws-config.jsx

import AWS from 'aws-sdk';

// Load values from environment variables
const s3 = new AWS.S3({
  accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
  region: import.meta.env.VITE_REGION,
});

export default s3;

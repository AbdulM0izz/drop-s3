# React S3 File Uploader  
A simple React application that allows users to upload files directly to an AWS S3 bucket. Built using Vite for fast performance and modern development tooling.

## Live Demo  
[View the Live App](drop-s3.vercel.app)

## Features  
- Select and upload files from your local device  
- Progress feedback during upload  
- Displays a public link to the uploaded file  
- Uses AWS SDK v3 for secure client-side uploads  

## Installation  
```bash
# Clone the repository  
git clone https://github.com/your-username/react-s3-file-uploader.git  

# Navigate to the project directory  
cd react-s3-file-uploader  

# Install dependencies  
npm install  
```

## Configuration  
Create a `.env` file in the root directory  
Add your AWS credentials:  
```
VITE_AWS_REGION=your-region  
VITE_AWS_BUCKET=your-bucket-name  
VITE_AWS_ACCESS_KEY=your-access-key  
VITE_AWS_SECRET_KEY=your-secret-key  
```

## Development  
```bash
# Start the development server  
npm run dev  
```

## Building for Production  
```bash
# Build the application  
npm run build  

# Preview the production build  
npm run preview  
```

## Security Considerations  
- Consider implementing server-side authentication before generating pre-signed URLs  
- Use IAM roles with minimal required permissions  
- Set appropriate CORS configurations on your S3 bucket    

## Contributing  
Contributions are welcome. Please feel free to submit a Pull Request.

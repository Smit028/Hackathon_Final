import React, { useState, useRef } from 'react';

function Photo3() {
  const [imageData, setImageData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null); // Reference to the file input element
  const [hack, setHack] = useState({
    aadhar: '',
    age: '',
    symptoms: '',
    disease: '',
    prescription: '',
    name: '',
    extra_info: '',
  });

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/jpeg');
    setImageData(dataURL);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      setImageData(selectedImage); // Display the selected image
      fileInputRef.current.files = [dataURLtoFile(selectedImage, 'captured_image.jpg')];
    }
  };

  // Helper function to convert data URL to Blob
  const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime, name: filename });
  };

  async function mindeeSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    if (selectedImage) {
      formData.append('uploadedImage', fileInputRef.current.files[0]);
    }

    // Append other form data...

    // Send formData to API...

    // Handle API response...

    // Update hack state...
  }

  return (
    <div>
      <button onClick={startCapture}>Start Webcam</button>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <video ref={videoRef} style={{ width: '100%', maxWidth: '300px' }} />
        </div>
        <div style={{ flex: 1 }}>
          <canvas
            ref={canvasRef}
            style={{ display: 'none', width: '100%', maxWidth: '300px' }}
            width={300}
            height={225}
          />
          {imageData && <img src={imageData} alt="Captured" style={{ width: '100%', maxWidth: '300px' }} />}
        </div>
      </div>
      <button onClick={captureImage}>Capture Image</button>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Captured Image</button>
      <button id="submit-button" onClick={mindeeSubmit}>
        Submit
      </button>
      {/* Display Mindee data */}
    </div>
  );
}

export default Photo3;

import React, { useState, useRef } from 'react';

function Photo2() {
  const [imageData, setImageData] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play(); // Ensure the video plays on mobile devices
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

  const [hack, setHack] = useState({});

  async function mindeeSubmit(event) {
    event.preventDefault();

    const myFileInput = document.getElementById('my-file-input');
    const myFile = myFileInput.files[0];

    if (!myFile) {
      return;
    }

    const formData = new FormData();
    formData.append('document', myFile, myFile.name);

    const url = 'https://api.mindee.net/v1/products/skipper-1007/medical_presciption/v1/predict';
    const token = 'b6e0179764e4621de5e7b5d24dd8eb07';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const data = jsonResponse;
        const newHack = {};
        newHack['aadhar'] = data.document.inference.pages[0].prediction.aadhar.values[0].content;
        newHack['age'] = data.document.inference.pages[0].prediction.age.values[0].content;
        newHack['symptoms'] = data.document.inference.pages[0].prediction.symptoms.values[0].content;
        newHack['disease'] = data.document.inference.pages[0].prediction.disease.values[0].content;
        newHack['prescription'] = data.document.inference.pages[0].prediction.prescription.values[0].content;

        let name1 = '';
        for (const nameObj of data.document.inference.pages[0].prediction.name.values) {
          name1 += nameObj.content + ' ';
        }
        newHack['name'] = name1;

        let extra_info1 = '';
        for (const infoObj of data.document.inference.pages[0].prediction.extra_info.values) {
          extra_info1 += infoObj.content + ' ';
        }
        newHack['extra_info'] = extra_info1;

        setHack(newHack);
      } else {
        console.error('Request failed:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
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
      <button id="submit-button" onClick={mindeeSubmit}>Submit</button>
    </div>
  );
}

export default Photo2;

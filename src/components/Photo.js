import React, { useState } from 'react';

function Photo() {
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
      <form>

      <div class="wrapper">
  <div class="container1">
    <h1>Upload a file</h1>
    <div class="upload-container">
      <div class="border-container">
        <div class="icons fa-4x">
          <i class="fas fa-file-image" data-fa-transform="shrink-3 down-2 left-6 rotate--45"></i>
          <i class="fas fa-file-alt" data-fa-transform="shrink-2 up-4"></i>
          <i class="fas fa-file-pdf" data-fa-transform="shrink-3 down-2 right-6 rotate-45"></i>
        </div>
        <input type="file" id="my-file-input" name="file" />
        <p>Drag and drop files here, or 
          <a href="#" id="file-browser">browse</a> your computer.</p>
      </div>
      <button id="submit-button" onClick={mindeeSubmit}>Submit</button>
    </div>
  </div>
</div>
{console.log(hack)}


        
       
      </form>
      <div className="scroll-table" >
    <table className="table table-alt tcenter" rules='all' border={1}>
      <thead>
        <tr>
            <th className="sort asc active">Make</th>
            <th className="sort">Model</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>{hack['name']}</td>
        </tr>

        <tr>
          <td>Aadhar</td>
          <td>{hack['aadhar']}</td>
        </tr>

        <tr>
          <td>Disease</td>
          <td>{hack['disease']}</td>
        </tr>

        <tr>
          <td>Symtomps</td>
          <td>{hack['symptoms']}</td>
        </tr>

        <tr>
          <td>prescription</td>
          <td>{hack['prescription']}</td>
        </tr>

        <tr>
          <td>Extra Info</td>
          <td>{hack['extra_info']}</td>
        </tr>

      </tbody>
    </table>
</div>
    </div>
  );
}

export default Photo;

import React, { useState } from 'react';

const DragAndDrop = () => {
  const [data, setData] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    let file = event.dataTransfer.files[0];
    if (file.type !== 'text/csv') {
      alert('Please drop a CSV file');
      return;
    }

    let reader = new FileReader();
    reader.onload = (event) => {
      let csvData = event.target.result;
      let lines = csvData.split("\n");
      let result = [];
      let headers = lines[0].split(",");

      for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(",");
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }
      setData(result);
    };
    reader.readAsText(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: '100%',
        height: '100px',
        border: '1px solid black',
        textAlign: 'center',
        lineHeight: '100px'
      }}
    >
      Drop a CSV file here
    </div>
  );
};

export default DragAndDrop;

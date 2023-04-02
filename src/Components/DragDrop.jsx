import "./DragDrop.css";

import { fileToSentences } from "../Libraries/fileToSentences";

const DragDrop = ({ onFileProcessed }) => {
  // Attach event listeners for the "dragover" and "drop" events
  const handleDragOver = (event) => {
    event.preventDefault();

    event.target.classList.add("drop-box-drag-hover");
  };

  const handleDragLeave = (event) => {
    event.preventDefault();

    event.target.classList.remove("drop-box-drag-hover");
  };

  // Attach an event listener for the "drop" event
  const handleDrop = (event) => {
    // Prevent the default behavior of the "drop" event
    event.preventDefault();

    event.target.classList.remove("drop-box-drag-hover");

    // Get the files that were dropped into the drag and drop box
    const file = event.dataTransfer.files[0];

    handleFileProcessing(file);
  };

  const handleClick = (event) => {
    document.getElementById("file-upload-input").click();
  };

  const handleFileProcessing = (file) => {
    fileToSentences(file)
      .then((sentences) => {
        onFileProcessed(sentences);
      })
      .catch((error) => {
        console.error("Error processing file:", error);
      });
  };

  return (
    <div
      className='drop-box'
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type='file'
        id='file-upload-input'
        style={{ display: "none" }}
        onChange={(event) => {
          handleFileProcessing(event.target.files[0]);
          event.target.value = "";
        }}
      />
      <p>
        <b>Choose a file</b>{" "}
        <em>or drag it here to read it at blazing fast speeds.</em>
      </p>
    </div>
  );
};

export default DragDrop;

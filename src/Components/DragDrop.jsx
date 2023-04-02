import { fileToSentences } from "../Libraries/pdfToSentences";

const DragDrop = () => {
    // Get a reference to the drag and drop box element
    let hovering = false;

    // Attach event listeners for the "dragover" and "drop" events
    function handleDragOver(event) {
      event.preventDefault();
      hovering = true;
    };

    function handleDragLeave(event) {
      event.preventDefault();
      hovering = false;
    };

    // Attach an event listener for the "drop" event
    function handleDrop(event) {
        // Prevent the default behavior of the "drop" event
        event.preventDefault();

        // Get the files that were dropped into the drag and drop box
        const files = event.dataTransfer.files;

        fileToSentences(files[0]).then((sentences) => {
            return sentences;
        }).catch((error) => {
            console.error('Error processing file:', error);
        });
    };

    const dropBox = {
        width: '300px',
        height: '200px',
        border: '2px dashed black',
        padding: '10px',
        textAlign: 'center',
        fontSize: '24px',
        backgroundColor: hovering ? "lightgray" : ""
    }

    return (<>
        <div style={dropBox}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        Drop Files here
        </div>
        </>)
}

export default DragDrop

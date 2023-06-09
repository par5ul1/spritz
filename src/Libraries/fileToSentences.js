import * as pdfjsLib from "pdfjs-dist/build/pdf";
const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Function to turn the contents of a file into an array of sentences
function fileToSentences(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Set up a callback function to handle the file data
    reader.onload = async (event) => {
      let fileData = event.target.result;

      if (file.type == "application/pdf") {
        fileData = await decodePdfString(file);

        const sentences = toSentences(fileData);
        resolve(sentences);
      } else {
        // Use the file data for further processing
        const sentences = toSentences(fileData);
        resolve(sentences);
      }
    };

    // Read the file data
    reader.readAsText(file);
  });
}

// Function to decode a pdf into a string
function decodePdfString(file) {
  // Create a new FileReader object to read the file
  const reader = new FileReader();

  let text = "";

  return new Promise((resolve, reject) => {
    // When the reader has finished loading the file
    reader.onload = () => {
      // Get the ArrayBuffer from the reader result
      const arrayBuffer = reader.result;

      // Load the PDF document using the ArrayBuffer
      pdfjsLib
        .getDocument({ data: arrayBuffer })
        .promise.then((pdf) => {
          // Get the text content of the page
          pdf.getPage(1).then((page) => {
            page.getTextContent().then((textContent) => {
              // Extract the text content from the text items
              let chunks = textContent.items
                .map((x) => x.str)
                .filter((x) => x.length != 0)
                .join(" ");
              resolve(chunks);
            });
          });
        })
        .catch((error) => {
          console.error("Error loading PDF document:", error);
          reject(error);
        });
    };

    // Read the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);
  });
}

// Cleans the string, splits it, and trims the sentences
function toSentences(text) {
  return text
    .split(/((?:[A-Z][a-z]\.|\w\.\w.|.)*?(?:[.!?]|$))(?:\s+|$)/g)
    .filter((x) => x.length > 0);
  // .pop();
}

export { fileToSentences as fileToSentences };

import { useEffect, useState } from "react";

import DragDrop from "./Components/DragDrop";
import Reader from "./Components/Reader";

function App() {
  const [readerOpen, setReaderOpen] = useState(false);
  const [textArray, setTextArray] = useState([]);

  const dismissReader = () => {
    setReaderOpen(false);
  };

  return (
    <>
      <h1 id='logo'>
        <span>Sp</span>
        <span>rit</span>
        <span>🍹</span>
      </h1>
      <DragDrop
        onFileProcessed={(sentences) => {
          setTextArray(sentences);
          console.log(sentences);
          setReaderOpen(true);
        }}
      />
      <a
        style={{ position: "absolute", bottom: "40px", color: "white" }}
        href='https://github.com/par5ul1/spritz'
      >
        Source Code
      </a>
      {readerOpen && <Reader textArray={textArray} onDismiss={dismissReader} />}
    </>
  );
}

export default App;

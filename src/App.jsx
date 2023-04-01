import Reader from "./Components/Reader";
import { useState } from "react";

function App() {
  const [readerOpen, setReader] = useState(true);

  const dismissReader = () => {
    setReader(false);
  };
  // TODO: Needs refactoring
  const contents = "The quick brown fox jumped over the lazy dog.".split(" ");

  const text = contents.map((word) => {
    return {
      content: word,
      duration: word.length * 50
    };
  });

  return <>{readerOpen && <Reader text={text} onDismiss={dismissReader} />}</>;
}

export default App;

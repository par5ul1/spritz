import Reader from "./Components/Reader";
import { useState } from "react";

function App() {
  const [readerOpen, setReader] = useState(true);

  const dismissReader = () => {
    setReader(false);
  };
  // TODO: Needs refactoring
  const text =
    "Snowman wakes before dawn. He lies unmoving, listening to the tide coming in, wave after wave sloshing over the various barricades, wish-wash, wish-wash, the rhythm of heartbeats. He would so like to believe he is still asleep.";

  return <>{readerOpen && <Reader text={text} onDismiss={dismissReader} />}</>;
}

export default App;

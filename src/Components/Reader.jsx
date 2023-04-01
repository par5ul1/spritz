import "./Reader.css";

import { useEffect, useState } from "react";

import BionicWord from "./BionicWord";
import ProgressBar from "./ProgressBar";

const Reader = ({ text, onDismiss }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [canDisplayNext, setCanDisplayNext] = useState(false);

  const flashText = () => {
    if (textIndex < text.length - 1) {
      setTextIndex((index) => ++index);
      setCanDisplayNext(false);
      setTimeout(() => setCanDisplayNext(true), text[textIndex].duration);
    }
  };

  const handleSpace = (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      setIsRunning((running) => !running);
      setCanDisplayNext(!isRunning);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSpace);
    return () => {
      window.removeEventListener("keydown", handleSpace);
    };
  }, [isRunning]);

  const goTo = (index) => {
    setTextIndex(index);
    setIsRunning(false);
  };

  return (
    <>
      {isRunning && canDisplayNext && flashText()}
      <div id='reader-container'>
        <button className='dismiss-btn' onClick={onDismiss}>
          <i className='fa-solid fa-xmark'></i>
        </button>
        <BionicWord>{text[textIndex].content}</BionicWord>
        <ProgressBar
          current={textIndex}
          total={text.length - 1}
          onDrag={(position) => goTo(position)}
        ></ProgressBar>
      </div>
    </>
  );
};

export default Reader;

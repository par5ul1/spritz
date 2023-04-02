import "./Reader.css";

import { useEffect, useState } from "react";

import BionicWord from "./BionicWord";

// import ProgressBar from "./ProgressBar";

const Reader = ({ text, onDismiss }) => {
  // FIXME: Not sure this is the best way
  const [isRunning, setIsRunning] = useState(false);
  const [currentWord, setCurrentWord] = useState(text.split(" ")[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState(1);

  // FIXME: Cases like "great civil war" will result in duplicates
  let utterance = new SpeechSynthesisUtterance(text);
  utterance.addEventListener(
    "boundary",
    (e) => e.name == "word" && updateCurrentWord(e, text)
  );

  utterance.addEventListener("end", () => window.speechSynthesis.cancel());

  function updateCurrentWord(event, text) {
    const word = text.substring(
      event.charIndex,
      event.charIndex + event.charLength
    );

    setCurrentIndex(event.charIndex);
    setCurrentWord(word);
  }

  const handleSpace = (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      setIsRunning((running) => {
        running = !running;
        if (running) {
          utterance.rate = speed;
          window.speechSynthesis.paused
            ? window.speechSynthesis.resume()
            : window.speechSynthesis.speak(utterance);
        } else {
          window.speechSynthesis.pause();
        }
        return running;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSpace);
    return () => {
      window.removeEventListener("keydown", handleSpace);
    };
  }, [speed]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // XXX: Potential feature to explore
  // const goTo = (charIndex) => {
  //   window.speechSynthesis.cancel();
  //   const index = findClosestNonWhitespaceIndex(text, charIndex);
  //   utterance = new SpeechSynthesisUtterance(text.slice(index, text.length));
  //   setIsRunning(false);
  //   setCurrentIndex(index);
  // };

  // const findClosestNonWhitespaceIndex = (str, index) => {
  //   let startIndex = index;
  //   let endIndex = index;

  //   while (startIndex >= 0 && str[startIndex] === " ") {
  //     startIndex--;
  //   }

  //   while (endIndex < str.length && str[endIndex] === " ") {
  //     endIndex++;
  //   }

  //   if (startIndex < 0) {
  //     return endIndex;
  //   } else if (endIndex >= str.length) {
  //     return startIndex;
  //   } else if (index - startIndex <= endIndex - index) {
  //     return startIndex;
  //   } else {
  //     return endIndex;
  //   }
  // };

  return (
    <>
      <div id='reader-container'>
        <div className='options'>
          <label>
            {"Speed: " + speed}
            <br />
            <input
              min={0.5}
              max={2}
              value={speed}
              step={0.1}
              type='range'
              className='speed-input'
              onChange={(e) => {
                setSpeed(() => {
                  const newSpeed = e.target.value;
                  utterance.rate = newSpeed;
                  window.speechSynthesis.cancel();
                  window.speechSynthesis.speak(utterance);
                  return newSpeed;
                });
              }}
            ></input>
          </label>
          <label>
            Dyslexic-friendly font:
            <input
              id='dyslexia-checkbox'
              type='checkbox'
              onChange={(e) =>
                e.target.checked
                  ? Array.from(
                      document.getElementsByClassName("bionic")
                    ).forEach((element) => {
                      element.classList.add("bionic-dyslexic");
                    })
                  : Array.from(
                      document.getElementsByClassName("bionic")
                    ).forEach((element) => {
                      element.classList.remove("bionic-dyslexic");
                    })
              }
            />
          </label>
        </div>
        <button className='dismiss-btn' onClick={onDismiss}>
          <i className='fa-solid fa-xmark'></i>
        </button>
        <div id='reader-words'>
          {currentWord.split(" ").map((word, i) => {
            return <BionicWord key={i}>{word + " "}</BionicWord>;
          })}
        </div>
        {/* XXX: Potential feature to explore */}
        {/* <ProgressBar
          current={currentIndex}
          total={text.length - 1}
          onDrag={(position) => goTo(position)}
        ></ProgressBar> */}
      </div>
    </>
  );
};

export default Reader;

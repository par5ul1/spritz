import "./Reader.css";

import { useEffect, useState } from "react";

import BionicWord from "./BionicWord";
import ProgressBar from "./ProgressBar";

const Reader = ({ textArray, onDismiss }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [utterance, setUtterance] = useState(null);

  const totalWords = textArray
    .map((x) => {
      return x.split(" ");
    })
    .flat().length;

  // FIXME: Cases like "great civil war" will result in duplicates
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
      setIsRunning((running) => !running);
    }
  };

  useEffect(() => {
    if (isRunning) {
      window.speechSynthesis.paused && window.speechSynthesis.speaking
        ? window.speechSynthesis.resume()
        : window.speechSynthesis.speak(utterance);
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  }, [utterance, isRunning]);

  useEffect(() => {
    setUtterance((u) => {
      u = new SpeechSynthesisUtterance(textArray[textIndex]);
      u.rate = speed;
      u.addEventListener(
        "boundary",
        (e) => e.name == "word" && updateCurrentWord(e, textArray[textIndex])
      );

      u.addEventListener("end", () => {
        setTextIndex((index) => {
          if (index < textArray.length - 1) {
            setCurrentIndex(0);
            return ++index;
          } else {
            return index;
          }
        });
      });
      return u;
    });
  }, [textIndex, speed]);

  useEffect(() => {
    window.addEventListener("keydown", handleSpace);

    return () => {
      window.removeEventListener("keydown", handleSpace);
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    setCurrentWord(textArray[textIndex].split(" ")[0]);
    setCurrentIndex(0);
  }, [textIndex, speed]);

  useEffect(() => {
    (isRunning || window.speechSynthesis.paused) && speechSynthesis.cancel();
    setIsRunning(false);
  }, [speed]);

  return (
    <>
      <div id='reader-container'>
        <div id='reader-header'>
          <div>
            <div className='options'>
              <label>
                {"Speed: " +
                  speed +
                  "x " +
                  (speed < 1 ? "🐌" : speed > 1.5 ? "⚡️" : "🗣️")}
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
                      return e.target.value;
                    });
                  }}
                ></input>
              </label>
              <label id='dyslexia-checkbox-label'>
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
          </div>
          <p id='reading-time'>
            {Math.round(totalWords / (speed * 170)) + "-minute read"}
          </p>
        </div>
        <div id='reader-words'>
          {currentWord.split(" ").map((word, i) => {
            return <BionicWord key={i}>{word + " "}</BionicWord>;
          })}
        </div>
        <div id='reader-controls'>
          <ProgressBar
            currentSentence={textIndex}
            totalSentences={textArray.length}
            currentChar={currentIndex}
            totalChars={textArray[textIndex].length}
            onDrag={(index) => {
              (isRunning || window.speechSynthesis.paused) &&
                speechSynthesis.cancel();
              setIsRunning(false);
              setTextIndex(index);
            }}
          />
          <button
            className='playPause-btn'
            onClick={() => setIsRunning((running) => !running)}
          >
            <i
              className={"fa-solid " + (isRunning ? "fa-pause" : "fa-play")}
            ></i>
          </button>
          <p>You can Play/Pause at any time by pressing Space as well.</p>
        </div>
      </div>
    </>
  );
};

export default Reader;

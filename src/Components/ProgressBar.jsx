import "./ProgressBar.css";

const ProgressBar = ({
  currentSentence,
  totalSentences,
  currentChar,
  totalChars,
  onDrag
}) => {
  let progress = totalSentences
    ? (currentSentence ? currentSentence : 0) / totalSentences
    : 1;

  progress +=
    (totalChars ? (currentChar ? currentChar : 0) / totalChars : 1) /
    totalSentences;

  return (
    <input
      type='range'
      min='0'
      max='100'
      value={progress * 100}
      onChange={(e) => {
        let index = Math.round((e.target.value * totalSentences) / 100);
        index == totalSentences ? --index : index;
        onDrag(index);
      }}
      className='progress-bar'
    ></input>
  );
};

export default ProgressBar;

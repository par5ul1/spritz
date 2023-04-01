import "./ProgressBar.css";

const ProgressBar = ({ current, total, onDrag }) => {
  const progress = total ? (current / total) * 100 : 100;

  return (
    <input
      type='range'
      min='0'
      max='100'
      value={progress}
      onChange={(e) => onDrag(Math.round((e.target.value * total) / 100))}
      className='progress-bar'
    ></input>
  );
};

export default ProgressBar;

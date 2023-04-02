import { getBionicLowFixationIndex } from "../Libraries/bionicLowFixation";

const BionicWord = ({ children }) => {
  const [startIndex, endIndex] = getBionicLowFixationIndex(children);

  return (
    <>
      <span className='bionic'>
        {children.slice(0, startIndex)}
        <b>{children.slice(startIndex, endIndex)}</b>
        {children.slice(endIndex, children.length)}
      </span>
    </>
  );
};

export default BionicWord;

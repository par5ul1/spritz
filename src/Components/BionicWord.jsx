import { getBionicLowFixationIndex } from "../Libraries/bionicLowFixation";

const BionicWord = ({ children }) => {
  const index = getBionicLowFixationIndex(children);

  return (
    <>
      <span>
        <b>{children.slice(0, index)}</b>
        {children.slice(index, children.length)}
      </span>
    </>
  );
};

export default BionicWord;

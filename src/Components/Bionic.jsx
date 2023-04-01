import BionicWord from "./BionicWord";

const Bionic = ({ children }) => {
  return (
    // TODO: Make more rigorous
    children.split(" ").map((word, index) => {
      return (
        <>
          <BionicWord key={"word" + index}>{word}</BionicWord> <span> </span>
        </>
      );
    })
  );
};

export default Bionic;

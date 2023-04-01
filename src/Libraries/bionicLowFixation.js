// Method to get the end index of words (non-inclusive) to boldify in a string
const getBionicLowFixationIndex = (word) => {
    // Create variable for length of word
    const len = word.length;
    // If the length is greater than 5
    if (len > 5) {
        // Use the third of the length
        return Math.floor(len / 3)+1;
    } else if (len > 1) { // If the length is greater than 1
        // Return index of first two letters
        return 2;
    } else { // If there is one letter
        // Return the letter bolded
        return 1;
    }
};

export { getBionicLowFixationIndex as getBionicLowFixationIndex };
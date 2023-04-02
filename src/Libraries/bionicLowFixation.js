// Method to get the end index of words (non-inclusive) to boldify in a string
const getBionicLowFixationIndex = (word) => {
    // Regex replace all punctuation in word
    const regex = /[A-Za-z0-9]+/g;

    // Get all of the matching non-punctuation characters
    const matches = word.match(regex);

    // If empty, just ignore
    if (!matches) {
      return [0, 0];
    }
    
    // If there is only one match and it is only one character
    if (matches.length == 1 && matches[0].length == 1) {
        // Get the index of the match
        const idx = word.indexOf(matches[0]);
        // Return the correct pairing of indexes
        return [idx, idx + 1];
    }

    // Calculate the starting index
    const startIndex = word.search(regex);

    // Update the length to have the punctuation at end of line subtracted
    const len = word.length - word.split("").reverse().join("").search(regex);

    // If the length is greater than 5
    if (len > 5) {
        // Use the third of the length
        return [startIndex, Math.floor(len / 3) + 1 + startIndex];
    } else if (len > 1) { // If the length is greater than 1
        // Return index of first two letters
        return [startIndex, startIndex + 2];
    } else { // If there is one letter
        // Return the letter bolded
        return [startIndex, startIndex + 1];
    }
};
    
export { getBionicLowFixationIndex as getBionicLowFixationIndex };

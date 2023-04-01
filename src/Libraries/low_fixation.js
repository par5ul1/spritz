// Method to get the start and end index of words to boldify in a string
const indexWord = (word) => {
    // Create variable for length of word
    const len = word.length;
    // If the length is greater than 5
    if (len > 5) {
        // Use the third of the length
        return Math.floor(len / 3);
    } else if (len > 1) { // If the length is greater than 1
        // Return index of first two letters
        return 1;
    } else { // If there is one letter
        // Return the letter bolded
        return 0;
    }
};


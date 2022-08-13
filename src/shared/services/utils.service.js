const generateId = (type) => { // Function to generate ids for different models i.e. board, column and card
    return `${type}-${Date.now()}`
}

export { generateId };

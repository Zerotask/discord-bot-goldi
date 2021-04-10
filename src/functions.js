const getRandomNumber = (minimum, maximum) => Math.floor(Math.random() * (maximum - minimum)) + minimum;

module.exports = { getRandomNumber }
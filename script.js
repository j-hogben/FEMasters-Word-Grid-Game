const WORD_URL = 'https://words.dev-apis.com/word-of-the-day';
const RANDOM_WORD_URL = 'https://words.dev-apis.com/word-of-the-day?random=1';
const VERIFY_WORD_URL = 'https://words.dev-apis.com/validate-word';
const wordMastersGrid = document.getElementById('wordMastersGrid');
const gridTiles = document.querySelectorAll('.tile');
const keyboardButtons = document.querySelectorAll('.keyboard-button');

const WORD_LENGTH = 5;
const GUESSES = 6;

const init = async () => {
  let gridPosition = 0;
  let guessWord = [];
  let loading = true;
  let gameEnded = false;

  const promise = await fetch(WORD_URL);
  const processedResponse = await promise.json();
  const answerWord = processedResponse.word.split('');
  loading = false;

  console.log(answerWord);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ HANDLE INPUTS AND ADD TO GRID ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const handleEnter = () => {
    guessWord = [];
    gridPosition += WORD_LENGTH;
  };

  const handleBackspace = () => {
    guessWord = guessWord.slice(0, -1);
    updateGrid();
  };

  const updateGrid = (key) => {
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessWord[i]) {
        gridTiles[i + gridPosition].innerHTML = `<span>${guessWord[i]}</span>`;
        gridTiles[i + gridPosition].classList.add('tile-active');
        if (isLetter(key)) {
          const lastLetter = guessWord.length - 1;
          gridTiles[lastLetter + gridPosition].classList.add('pulse');
          setTimeout(() => {
            gridTiles[lastLetter + gridPosition].classList.remove('pulse');
          }, 100);
        }
      } else {
        gridTiles[i + gridPosition].innerHTML = '';
        gridTiles[i + gridPosition].classList.remove('tile-active');
      }
    }
  };

  const handleLetter = (key) => {
    if (guessWord.length < WORD_LENGTH) {
      guessWord.push(key.toLowerCase());
      updateGrid(key);
    }
  };

  const isLetter = (key) => {
    return /^[a-zA-Z]$/.test(key);
  };

  const handleInput = (key) => {
    if (loading || gameEnded) {
      // do nothing
    } else {
      if (isLetter(key)) {
        handleLetter(key);
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Enter' && guessWord.length === WORD_LENGTH) {
        handleEnter();
      }
    }
  };

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ INPUT EVENT LISTENERS ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  keyboardButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const button = e.target.closest('.keyboard-button');
      handleInput(button.value);
      console.log(guessWord);
    });
  });

  document.addEventListener('keydown', (e) => {
    handleInput(e.key);
    console.log(guessWord);
  });
};

init();

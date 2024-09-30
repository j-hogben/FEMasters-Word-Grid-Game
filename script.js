const WORD_URL = 'https://words.dev-apis.com/word-of-the-day';
const RANDOM_WORD_URL = 'https://words.dev-apis.com/word-of-the-day?random=1';
const VERIFY_WORD_URL = 'https://words.dev-apis.com/validate-word';
const wordMastersGrid = document.getElementById('wordMastersGrid');

const WORD_LENGTH = 5;
const GUESSES = 6;

const init = async () => {
  let currentRow = 0;
  let guessWord = [];
  let loading = true;
  let gameEnded = false;

  const promise = await fetch(WORD_URL);
  const processedResponse = await promise.json();
  const answerWord = processedResponse.word.split('');
  loading = false;

  console.log(answerWord);

  const addLetterToGrid = () => {};

  const handleEnter = () => {};

  const handleBackspace = () => {
    guessWord = guessWord.slice(0, -1);
  };

  const handleLetter = (key) => {
    if (guessWord.length < WORD_LENGTH) {
      guessWord.push(key);
    }
  };

  const isLetter = (key) => {
    /^[a-zA-Z]$/.test(key);
  };

  document.addEventListener('keydown', (e) => {
    if (loading || gameEnded) {
      // DO NOTHING
    } else {
      const key = e.key;
      if (isLetter(key)) {
        handleLetter(key);
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Enter' && guessWord.length === WORD_LENGTH) {
      }
      console.log(guessWord);
    }
  });
};

init();

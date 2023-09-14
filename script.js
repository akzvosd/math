// Главные переменные
const problemElement = document.getElementById('problem');
const scoreElement = document.getElementById('score');
const options = document.querySelectorAll('.option');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');

let score = 0;
let currentProblem;

// Функция для генерации случайных чисел от min до max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для генерации нового математического примера
function generateProblem() {
  const num1 = getRandomInt(10, 100); // Увеличили диапазон чисел
  const num2 = getRandomInt(2, 20);  // Увеличили диапазон чисел
  const operators = ['+', '-', '*', '/'];
  const operator = operators[getRandomInt(0, 3)];

  let result;
  let isFraction = false; // Флаг, указывающий на то, что правильный ответ - дробное число

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 === 0) {
        num2 = 1;
      }
      result = num1 / num2;
      isFraction = true; // Правильный ответ - дробное число
      break;
  }

  currentProblem = {
    num1,
    num2,
    operator,
    result,
  };

  problemElement.textContent = `${num1} ${operator} ${num2} = ?`;

  // Генерируем случайные неправильные ответы
  const optionsArray = [result]; // Первый вариант ответа - правильный
  while (optionsArray.length < 4) {
    const option = generateRandomOption(result, isFraction);
    if (!optionsArray.includes(option)) {
      optionsArray.push(option);
    }
  }

  // Перемешиваем варианты ответов
  for (let i = optionsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
  }

  // Заполняем варианты ответов
  optionsArray.forEach((option, index) => {
    options[index].textContent = option;
  });
}

function generateRandomOption(correctAnswer, isFraction) {
  if (isFraction) {
    // Генерация случайного дробного числа
    const numerator = getRandomInt(1, 10);
    const denominator = getRandomInt(2, 10);
    return (numerator / denominator).toFixed(2);
  } else {
    // Генерация случайного целого числа, отличного от правильного ответа
    let option;
    do {
      option = getRandomInt(1, 200); // Увеличили диапазон целых чисел
    } while (option === correctAnswer);
    return option;
  }
}

// Функция для проверки ответа
function checkAnswer(selectedOption) {
  if (selectedOption === currentProblem.result) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
  } else {
    score--;
    scoreElement.textContent = `Score: ${score}`;
  }

  generateProblem();
}

// Обработчики событий для кнопок "Старт" и "Начать заново"
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  restartButton.disabled = false;
  options.forEach((option) => (option.disabled = false));
  score = 0;
  scoreElement.textContent = `Score: ${score}`;
  generateProblem();
});

restartButton.addEventListener('click', () => {
  startButton.disabled = false;
  restartButton.disabled = true;
  options.forEach((option) => (option.disabled = true));
  problemElement.textContent = '';
  scoreElement.textContent = 'Score: 0';
});

// Обработчики событий для вариантов ответов
options.forEach((option) => {
  option.addEventListener('click', () => {
    checkAnswer(parseFloat(option.textContent));
  });
});

// Начинаем с игру отключенными кнопками "Начать заново"
restartButton.disabled = true;
options.forEach((option) => (option.disabled = true));

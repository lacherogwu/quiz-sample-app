const inputEls = document.querySelectorAll('input');
const labelEls = document.querySelectorAll('label');
const titleEl = document.querySelector('.title h3');
const positionDisplayEl = document.querySelector('.title span');
const btnEl = document.querySelector('.btn');

const quizData = [
	{
		question: 'What is my age?',
		a: 11,
		b: 21,
		c: 25,
		d: 31,
		answer: 'c',
	},
	{
		question: 'What is my favorite color?',
		a: 'blue',
		b: 'gray',
		c: 'green',
		d: 'black',
		answer: 'a',
	},
	{
		question: 'What is my level?',
		a: 'Amazing',
		b: 'Crazy good',
		c: 'Lame',
		d: 'None of these above',
		answer: 'a',
	},
];

let currentQuestion = 0;
let answers = [];

const setQuizData = () => {
	const { question, a, b, c, d } = quizData[currentQuestion];
	const answers = [a, b, c, d];

	titleEl.textContent = question;
	labelEls.forEach((label, i) => {
		label.textContent = answers[i];
	});
};

const getCheckedAnswer = () => {
	let answer;
	const answers = ['a', 'b', 'c', 'd'];

	inputEls.forEach(({ checked }, i) => {
		if (checked) {
			answer = answers[i];
		}
	});

	return answer;
};

const clearInputs = () => {
	inputEls.forEach(input => {
		input.checked = false;
	});
};

const isInputSelected = () => [...inputEls].some(input => input.checked);

const calculateScore = () => {
	const { correct, wrong } = quizData.reduce(
		(acc, curr, i) => {
			const currentAnswer = answers[i];

			if (currentAnswer === curr.answer) {
				acc.correct++;
			} else {
				acc.wrong++;
			}

			return acc;
		},
		{ correct: 0, wrong: 0 }
	);

	const score = Math.trunc((correct / quizData.length) * 100);

	return { correct, wrong, score };
};

const setPositionDisplay = () => {
	positionDisplayEl.textContent = `${currentQuestion + 1}/${quizData.length}`;
};

const handleSubmit = () => {
	const selectedAnswer = getCheckedAnswer();

	if (!isInputSelected()) return alert('Please select at least one answer');

	answers.push(selectedAnswer);
	if (currentQuestion < quizData.length - 1) {
		currentQuestion++;
	} else {
		const { correct, wrong, score } = calculateScore();
		alert(`Completed! Your score is: ${score}\nCorrect: ${correct}\nWrong: ${wrong}`);
		resetState();
	}
	setState();
};

btnEl.addEventListener('click', handleSubmit);

const resetState = () => {
	currentQuestion = 0;
	answers = [];
};

const setState = () => {
	clearInputs();
	setQuizData();
	setPositionDisplay();
};

// init
setState();

document.addEventListener('DOMContentLoaded', () => {
    const questionList = document.getElementById('questionList');
    const submitBtn = document.getElementById('submitBtn');
    let currentQuestionIndex = 1;
    const number = 4;

    function generateExample(num) {
        return { N: number, num, result: number * num };
    }

    function createQuestionElement(example) {
        const li = document.createElement('li');
        li.classList.add('input-container');
        li.innerHTML = `${example.N} &times; ${example.num} = <input class="answerInput" data-result="${example.result}" type="text">`;
        
        const squareRow = document.createElement('div');
        squareRow.classList.add('square-row');
        li.appendChild(squareRow);

        return li;
    }

    function addSquares(squareRow) {
        for (let i = 0; i < 4; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            setTimeout(() => {
                square.classList.add('animate');
            }, i * 0); 
            squareRow.appendChild(square);
        }
    }

    function updateQuestionList() {
        if (currentQuestionIndex <= 9) {
            const example = generateExample(currentQuestionIndex);
            const questionElement = createQuestionElement(example);
            questionList.appendChild(questionElement);
            questionList.appendChild(document.createElement('br'));
        }
    }

    function checkAnswers() {
        const inputs = document.querySelectorAll('.answerInput');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if ([...inputs].some(input => input.value.trim() !== '')) {
                    submitBtn.classList.remove('disabled');
                } else {
                    submitBtn.classList.add('disabled');
                }
            });
        });
    }

    function showButtonState(state) {
        submitBtn.classList.remove('right', 'wrong', 'disabled');
        submitBtn.classList.add(state);
        setTimeout(() => {
            submitBtn.classList.remove(state);
        }, 1000);
    }

    function handleIncorrectAnswer(input) {
        input.classList.add('input-error');
        setTimeout(() => {
            input.classList.remove('input-error');
        }, 1000); 
    }

    submitBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('.answerInput');
        let allCorrect = true;

        inputs.forEach(input => {
            const value = parseInt(input.value, 10);
            const result = parseInt(input.dataset.result, 10);
            const squareRow = input.parentElement.querySelector('.square-row');

            if (value === result) {
                input.classList.remove('input-error');
                input.replaceWith(`${result}`);
                if (!squareRow.hasChildNodes()) {
                    addSquares(squareRow);
                }
                showButtonState('right'); 
            } else {
                handleIncorrectAnswer(input);
                showButtonState('wrong'); 
                allCorrect = false;
            }
        });

        if (allCorrect && currentQuestionIndex <= 9) {
            currentQuestionIndex++;
            updateQuestionList(); 
        }

        if (currentQuestionIndex > 9) {
            submitBtn.textContent = 'Completed'; 
            submitBtn.classList.add('completed');
        }
    });

    updateQuestionList();
    checkAnswers();
});

const main = document.querySelector('.main');
const header_pane = main.querySelector('.header_pane');
const count_select = header_pane.querySelector('select');
const start = header_pane.querySelector('button');
const end = main.querySelector('.end');

const question_placeholder = document.querySelector('#placeholder.question');
const answer_placeholder = document.querySelector('#placeholder.answer');

let letters = 'ABCDEFG';
let used = [];

function getRandomQuestion() {
    let random_index = Math.floor(Math.random() * a.length);
    let already = used.includes[random_index];
    if (!already) {
        used.push(random_index);
    }
    return already ? getRandomQuestion() : a[random_index];
}

function startExam(event) {
    for (var i = 0; i < parseInt(count_select.value); i++) {
        let question_data = getRandomQuestion();

        let clone = question_placeholder.cloneNode(true);
        let question_text = clone.querySelector('.question_text');
        let answer_holder = clone.querySelector('.answer_holder');
        let explain_text = clone.querySelector('.explain_text');
        question_text.textContent = question_data.Question;
        explain_text.textContent = 'Explanation: ' + question_data.Explanation;
        clone.addEventListener('mouseup', checkAnswer);

        for (var j = 0; j < letters.length; j++) {
            let found_letter = letters[j];
            if (!question_data[found_letter]) { continue; }
            let answer_clone = answer_placeholder.cloneNode(true);
            let circle = answer_clone.querySelector('.circle');
            let answer_text = answer_clone.querySelector('.answer_text');
            circle.textContent = found_letter;
            answer_text.textContent = question_data[found_letter];
            answer_clone.removeAttribute('id');
            answer_clone.setAttribute('letter', found_letter);
            answer_holder.appendChild(answer_clone);
        }

        clone.setAttribute('correct', question_data.Correct);
        clone.removeAttribute('id');
        main.appendChild(clone);
    }
    main.classList.add('active');
}

function checkAnswer(event) {
    if (!event.target.classList.contains('answer')) { return; }
    let target_question = event.target.parentElement.parentElement;
    if (target_question.classList.contains('done')) { return; }
    let found_correct = target_question.getAttribute('correct');
    let found_answer = event.target.getAttribute('letter');
    let correct_count = found_correct.replaceAll(',', '').replaceAll(' ', '').length;

    event.target.classList.add('checked');
    if (found_correct.includes(found_answer)) {
        event.target.classList.add('correct');
    } else {
        event.target.classList.add('incorrect');
    }

    let found_checked = target_question.querySelectorAll('.checked');
    if (found_checked.length == correct_count) {
        target_question.classList.add('done');
    }
}

function endExam() {
    let correct_count = main.querySelectorAll('.question:has( .answer.correct):not( .answer.incorrect)').length;
    let incorrect_count = main.querySelectorAll('.question:has( .answer.incorrect)').length;
    let unanswered = main.querySelectorAll('.question:not(.done)').length;

    alert(`
        Correct: ${correct_count}
        Incorrect: ${incorrect_count}
        Unanswered: ${unanswered}
    `);
    window.location.reload();
}

start.addEventListener('mouseup', startExam);
end.addEventListener('mouseup', endExam);
gsap.from(".homepage-heading",{
    stagger: 0.7,
    x: -1200
});

// Array of Questions
const questions = [
    {
        'question': 'What is the core concept of sustainability?',
        'options': {
            'a': 'Exploiting natural resources for economic growth',
            'b': 'Conserving ecological balance and reducing environmental impact',
            'c': 'Ignoring the impact of technology on the environment'
        },
        'answer': 'b',
        'tip': "Use energy-efficient appliances and switch off devices when not in use to reduce energy consumption."
    },
    {
        'question': 'How can technology contribute to sustainability efforts?',
        'options': {
            'a': 'By increasing waste production',
            'b': 'By optimizing resource utilization and reducing energy consumption',
            'c': 'By promoting unsustainable practices'
        },
        'answer': 'b',
        'tip': "Embrace renewable energy sources like solar or wind power to power your home or business sustainably."
    },
    {
        'question': 'Which of the following is NOT a key aspect of sustainable tech?',
        'options': {
            'a': 'Improving environmental impact',
            'b': 'Focusing on economic growth only',
            'c': 'Conserving natural resources'
        },
        'answer': 'b',
        'tip': "Minimize waste by practicing recycling, composting, and opting for products with minimal packaging."
    },
    {
        'question': 'What is the goal of your hackathon project related to sustainability and technology?',
        'options': {
            'a': 'To create an app for increased consumerism',
            'b': 'To reduce waste and promote green practices using innovative tech',
            'c': 'To build a platform for excessive resource consumption'
        },
        'answer': 'b',
        'tip': "Choose sustainable transportation options like public transit, cycling, or carpooling to reduce emissions."
    },
    {
        'question': 'Which of the following examples demonstrates a sustainable use of technology?',
        'options': {
            'a': 'Designing a system for efficient water usage',
            'b': 'Developing a process that generates more electronic waste',
            'c': 'Building a product with planned obsolescence'
        },
        'answer': 'a',
        'tip': "Support local and organic produce to lower your carbon footprint and promote sustainable farming practices."
    },
    {
        'question': 'Why is it essential to address sustainability through technology in our projects?',
        'options': {
            'a': 'Sustainability is just a trendy buzzword, not an actual concern',
            'b': 'Technology has no impact on environmental issues',
            'c': 'Technology can be a powerful tool to address environmental challenges'
        },
        'answer': 'c',
        'tip': "Conserve water by fixing leaks, using water-saving fixtures, and capturing rainwater for non-potable use."
    },
    {
        'question': 'What role does innovation play in creating a sustainable future?',
        'options': {
            'a': 'Innovation is not relevant to sustainability efforts',
            'b': 'Innovation can lead to creative solutions that benefit the environment',
            'c': 'Innovation is solely for increasing resource consumption'
        },
        'answer': 'b',
        'tip': "Reduce single-use plastic consumption by carrying reusable bags, bottles, and containers."
    },
    {
        'question': 'How can your hackathon project make a genuine human impact on sustainability?',
        'options': {
            'a': 'By ignoring social and community factors',
            'b': 'By contributing to a cleaner environment and improving lives',
            'c': 'By disregarding the effects of your project on future generations'
        },
        'answer': 'b',
        'tip': "Opt for energy-efficient LED lighting and utilize natural light to save energy and reduce emissions."
    },
    {
        'question': 'Why is it important to conserve natural resources?',
        'options': {
            'a': 'Natural resources are unlimited, so conservation is unnecessary',
            'b': 'Conserving resources helps to maintain a balanced ecosystem',
            'c': 'Natural resources have no impact on sustainability'
        },
        'answer': 'b',
        'tip': "Plant trees or participate in reforestation initiatives to offset carbon emissions and support biodiversity."
    },
    {
        'question': 'How can businesses practice sustainability in their supply chain?',
        'options': {
            'a': 'Disregard supplier practices',
            'b': 'Prioritize lower cost over all other factors',
            'c': 'Source from environmentally responsible suppliers'
        },
        'answer': 'c',
        'tip': "Educate and inspire others about sustainability to create a collective impact for a greener future."
    }
];

// Array containing indices of asked questions
const askedQuestions = [];
let score = 0;
const nextBtn = document.querySelector('#next-btn');

const startBtn = document.querySelector('.start-btn');
startBtn.addEventListener('click', () => {
    resetValues();
    showQuizSection();
})

// Make Quiz Section Visible
function showQuizSection(){
    document.querySelector('#quiz').style.display = 'flex';

    askQuestion();
}

// Ask Question: Add question and option text content to DOM
function askQuestion(){
    const question = document.querySelector('#question');
    const options = document.querySelectorAll('.options');
    const optionA = document.querySelector('button[data-opt="a"]');
    const optionB = document.querySelector('button[data-opt="b"]');
    const optionC = document.querySelector('button[data-opt="c"]');
    const nextBtnDiv = document.querySelector('.question-navigation');
    const tip = document.querySelector('#tip');

    // Reset Option Colors
    options.forEach(option => {
        option.style.background = 'white';
        option.style.color = 'black';
    });
    let id;
    do {
        id = randomIndex(0, questions.length - 1);
    }
    while (askedQuestions.indexOf(id) > 0);

    askedQuestions.push(id);

    if (askedQuestions.length == 5) {
        nextBtnDiv.style.display = 'none';
    } else {
        nextBtnDiv.style.display = 'flex';
    }

    let ques = questions[id];
    question.dataset['quesId'] = id;
    question.textContent = `Q:  ${ques['question']}`;
    optionA.textContent = `a) ${ques['options']['a']}`;
    optionB.textContent = `b) ${ques['options']['b']}`;
    optionC.textContent = `c) ${ques['options']['c']}`;

    tip.innerHTML = ques['tip'];
    options.forEach(option => option.addEventListener('click', checkAnswer, { once: true }));
    
}

nextBtn.addEventListener('click', () => {
    askQuestion();
});

// Check Answer
function checkAnswer(e){
    const question = document.querySelector('#question');
    const selectedOption = e.target;
    const answer = selectedOption.dataset['opt'];
    const options = document.querySelectorAll('.options');
    const questionId = question.dataset['quesId'];
    const correctAnswer = questions[questionId]['answer'];
    if (answer === correctAnswer) {
        score++;
    }

    options.forEach((option) => {
        if (answer === option.dataset['opt']) {
            option.textContent += `   (Your Answer)`;
        }
        if (option.dataset['opt'] === correctAnswer) {
            option.style.background = '#426C37';
            option.style.color = '#fff';
        } else
        {
            option.style.background = '#c2191f';
            option.style.color = '#fff';
        }
        option.removeEventListener('click', checkAnswer);

    });

    if (askedQuestions.length == 5) {
        let scoreText = document.querySelector('#score');
        scoreText.style.display = 'block';
        scoreText.innerHTML = `Your score is ${score}<br>`;
        if (score < 3) {
            scoreText.innerHTML += 'Keep learning and aiming for a greener future.'
        } else {
            scoreText.innerHTML += 'Great job, sustainability champion.';
        }
        scoreText.innerHTML += '<br>Redirecting to HOME in <span id="time"></span> SECS';
        let seconds = 9;
        let interval = setInterval(() => {
            document.querySelector('#time').innerHTML = seconds--;
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            document.querySelector('#quiz').style.display = 'none';
        }, 10000)
    }
}

function randomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function resetValues(){
    // Clear all values of in asked questions array
    askedQuestions.length = 0;

    // Set Score to 0
    score = 0;
    document.querySelector('#score').style.display = 'none';
}
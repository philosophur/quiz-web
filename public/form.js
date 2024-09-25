const questions = [
    // Add 30 random essay questions here
"1.  What is your favorite interior design style? (e.g., modern, traditional)", 
"2.  How do you prioritize functionality versus aesthetics in a space?",
"3.  What are the key elements of a well-designed living room?",
"4.  How do you incorporate color theory into your designs?",
"5.  What are some common mistakes people make in interior design?",
"6.  How do you approach designing a small space to make it feel larger?",
"7.  What role does lighting play in interior design?",
"8.  How do you choose the right furniture for a room?",
"9.  What are some tips for creating a cohesive design throughout a home?",
"10. How do you balance different textures and materials in a space?",
"11. What are the latest trends in interior design?",
"12. How do you incorporate sustainable and eco-friendly materials into your designs?",
"13. What are some budget-friendly interior design tips?",
"14. How do you personalize a space to reflect the homeowner's personality?",
"15. What are the best ways to use mirrors in interior design?",
"16. How do you create a focal point in a room?",
"17. What are some tips for designing a functional and stylish kitchen?",
"18. How do you approach designing a child's room?",
"19. What are the best practices for designing a home office?",
"20. How do you incorporate art and decor into your designs?",
"21. What are some tips for designing an outdoor living space?",
"22. How do you choose the right window treatments for a room?",
"23. What are some ways to incorporate technology into interior design?",
"24. How do you design a space that is both pet-friendly and stylish?",
"25. What are the best ways to use rugs in interior design?",
"26. How do you approach designing a bathroom?",
"27. What are some tips for creating a relaxing bedroom?",
"28. How do you incorporate storage solutions into your designs?",
"29. What are the best ways to use plants in interior design?",
"30. How do you stay inspired and keep your designs fresh?",
];

let currentPage = 0;
const questionsPerPage = 3;
const totalPages = Math.ceil(questions.length / questionsPerPage);

document.addEventListener('DOMContentLoaded', () => {
    displayQuestions();
    setupNavigationButtons();
    startTimer();
    setupVisibilityAPI();
});

function displayQuestions() {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    questions.slice(start, end).forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<label>${question}</label><textarea></textarea>`;
        container.appendChild(questionDiv);
    });
    document.getElementById('submitButton').style.display = currentPage === totalPages - 1 ? 'block' : 'none';
}

function setupNavigationButtons() {
    document.getElementById('prevButton').addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            displayQuestions();
        }
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            displayQuestions();
        }
    });

    document.getElementById('essayForm').addEventListener('submit', (event) => {
        event.preventDefault();
        submitForm();
    });
}

function startTimer() {
    let timeLeft = 600;
    const timerElement = document.getElementById('timer');
    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitForm();
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}

function setupVisibilityAPI() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            submitForm();
        }
    });

    window.addEventListener('blur', submitForm);
    window.addEventListener('resize', submitForm);
}

function submitForm() {
    const form = document.getElementById('essayForm');
    const formData = new FormData(form);
    const responses = [];
    formData.forEach((value, key) => {
        responses.push({ question: key, answer: value });
    });

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ responses, timestamp: new Date() })
    }).then(() => {
       
        document.body.innerHTML = '<h2 style="color: red">Submitted! No further attempts permitted</h2>';
    });
}
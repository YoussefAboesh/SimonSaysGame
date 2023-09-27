const buttons = document.querySelectorAll('.btn');
const startBtn = document.getElementById('startBtn');
const simonSequence = [];
let playerSequence = [];
let round = 0;
let gameOn = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (gameOn) {
            const color = button.id;
            playerSequence.push(color);
            checkSequence();
        }
    });
});

startBtn.addEventListener('click', startGame);

function startGame() {
    simonSequence.length = 0;
    playerSequence.length = 0;
    round = 0;
    gameOn = true;
    nextRound();
}

function nextRound() {
    addRandomColor();
    showSequence();
}

function addRandomColor() {
    const colors = ['green', 'red', 'blue', 'yellow'];
    const randomColor = colors[Math.floor(Math.random() * 4)];
    simonSequence.push(randomColor);
    round++;
}

function showSequence() {
    let i = 0;
    const sequenceInterval = setInterval(() => {
        if (i < simonSequence.length) {
            const color = simonSequence[i];
            flashColor(color);
            i++;
        } else {
            clearInterval(sequenceInterval);
        }
    }, 1000);
}

function flashColor(color) {
    const button = document.getElementById(color);
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 500);
}

function checkSequence() {
    const index = playerSequence.length - 1;
    if (playerSequence[index] !== simonSequence[index]) {
        gameOver();
        return;
    }
    if (playerSequence.length === round) {
        if (round === 5) {
            alert('Congratulations! You won the game!');
            gameOn = false;
        } else {
            playerSequence.length = 0;
            setTimeout(nextRound, 1000);
        }
    }
}

function gameOver() {
    alert('Game over! You reached round ' + round);
    gameOn = false;
    
    
    const repeatBtn = document.getElementById('repeatBtn');
    repeatBtn.style.display = 'block';
    
   
    repeatBtn.addEventListener('click', () => {
        repeatBtn.style.display = 'none'; // Hide the button
        startGame(); // Restart the game
    });
}

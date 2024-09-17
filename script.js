import { cards, shuffleArray } from "./cards.js"
import { createBoard, startIconCycle, stopIconCycle } from './random.js';

const click = new Audio("./mp3/pop_mouth.mp3")
const click2 = new Audio("./mp3/click.mp3")
const splat = new Audio("./mp3/splat.mp3")
const battery = new Audio("./mp3/battery.mp3")
const bell = new Audio("./mp3/bells_bell.mp3")
const match = new Audio("./mp3/style_coin.mp3")
const lose = new Audio("./mp3/lose.mp3")

const ButtonsBox = document.querySelector('.play-button-box')
const timeBar = document.querySelector('.time-bar-placeholder')
const board = document.querySelector('.board')
const atempts = document.querySelector('.atempts')
const crono = document.querySelector('.crono')
const inArowCount = document.querySelector('.in-a-row')
const lifesaverBox = document.querySelector('.lifesaver-box')

let cardsToCompare = []
let isRunningGame = false
let isGameResetting = false;
let isChacking = false
let isRunning = false
let lifesaverTruck = false
let lifesaver = ''
let timer
let seconds = 180
let endGameTruck = 0
let atemptsCount = 0
let inArow = 0

createBoard()
startIconCycle()
ButtonsBox.innerHTML = `<button class="play-button">PLAY</button>`
const playButton = document.querySelector('.play-button')
playButton.addEventListener('click', () => {
    bell.play()
    isRunningGame = true;
    playGame()
});

function playGame() {
    if (isRunningGame)
        playButton.disabled = true
    stopIconCycle()
    shuffleArray(cards)
    createGame()
    startTimer()
}

function createGame() {
    board.innerHTML = ''
    inArowCount.innerHTML = '0'
    crono.textContent = '00:00'
    atempts.innerHTML = '0'
    inArow = 0
    atemptsCount = 0
    seconds = 180
    cards.forEach((el, i) => {

        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = el.path
        card.dataset.name = el.name
        card.dataset.number = el.number

        card.addEventListener('mouseenter', () => {
            if (card.dataset.active === 'false') {
                card.classList.add('card-hover')
            }
        });

        card.addEventListener('mouseleave', () => {
            if (card.dataset.active === 'false') {
                card.classList.remove('card-hover')
            }
        });

        setTimeout(() => {
            card.addEventListener('click', () => {
                card.classList.remove('card-hover')
                card.dataset.active = 'true';
                if (isChacking) { return }
                click.currentTime = 0
                click.play();
                card.classList.remove('cover')
                pushCard(cardsToCompare, card)
                compareCards()
            });
        }, 8700)
        board.appendChild(card)
    });

    const coverDelay = cards.length * 40 + 300

    setTimeout(() => {
        cards.forEach((el, i) => {
            const card = board.querySelector(`.card:nth-child(${i + 1})`)
            const delay = i * 40
            setTimeout(() => {
                card.classList.add('cover')
                card.dataset.active = el.active
                battery.currentTime = 0
                battery.play()
            }, delay)
        })
        setTimeout(() => {
            cronoGame()
            lifesaverBox.innerHTML = `<i class="lifesaver fa-regular fa-life-ring"></i>`
            lifesaver = document.querySelector('.lifesaver')
            lifesaver.addEventListener('click', lifesaverFunction)
        }, coverDelay)

        ButtonsBox.innerHTML = `<button class="reset-button play-button">RESET</button>`
        const resetGameButton = document.querySelector('.reset-button')
        resetGameButton.addEventListener('click', resetGame)

    }, 7000)
}

function compareCards() {
    if (cardsToCompare.length === 2) {
        isChacking = true
        const [card1, card2] = cardsToCompare
        const isMatch = card1.dataset.name === card2.dataset.name &&
            ((card1.dataset.number === '0' && card2.dataset.number === '1') ||
                (card1.dataset.number === '1' && card2.dataset.number === '0'));
        if (!isMatch) {
            inArow = 0
            inArowCount.innerHTML = inArow
            cardsToCompare.forEach(el => {
                setTimeout(() => {
                    el.classList.add('cover')
                    card1.dataset.active = 'false'
                    card2.dataset.active = 'false'
                }, 1200)
            })
            atemptsCount++
            atempts.innerHTML = atemptsCount
        } else {
            cardsToCompare.forEach(el => {
                el.classList.toggle('active')
                setTimeout(() => {
                    match.play()

                    el.innerHTML = `<i class="fa-solid fa-face-grin-hearts"></i>`
                    el.classList.add('match-icon-color')
                }, 800)
            })
            inArow++
            inArowCount.innerHTML = inArow
            document.querySelector('.logo-under').classList.add('logo-opacity');
            setTimeout(() => {
                document.querySelector('.logo-under').classList.remove('logo-opacity');
            }, 1000)

            endGameTruck++
            endGame()
        }

        setTimeout(() => {
            cardsToCompare = []
            isChacking = false
        }, 1300)
    }
}

function startTimer() {
    if (!lifesaverTruck) {
        timeBar.innerHTML = `<div class="time-bar"></div>`
        document.querySelector('.time-bar')
        const time = document.querySelector('.time-bar')
        time.classList.remove('shrink')
        void time.offsetWidth;  // Forza il reflow
        time.classList.add('shrink')
    }

    if (lifesaverTruck) {
        timeBar.innerHTML = `<div class="time-bar2"></div>`
        document.querySelector('.time-bar2')
        const time2 = document.querySelector('.time-bar2')
        time2.classList.remove('shrink')
        void time2.offsetWidth;  // Forza il reflow
        time2.classList.add('shrink')
    }
}

function pushCard(array, el) {
    if (array.length < 2) {
        array.push(el)
    }
}

function endGame() {
    if (endGameTruck === 18) {
        splat.play()
        showConfetti()
        clearInterval(timer)
        isRunning = false
        playButton.disabled = false
    }
}

function gameOver() {
    lose.play()
    lifesaverBox.innerHTML = ''
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal';
    modalContainer.innerHTML = `
    <div class="modal-content">
    <p>Game Over!</p>
    <button class="play-button">TRY AGAIN</button>
    </div>
    `
    document.body.appendChild(modalContainer);
    const playButton = modalContainer.querySelector('.play-button');
    playButton.disabled = false;
    playButton.addEventListener('click', () => {
        bell.play()
        isRunningGame = true;
        modalContainer.remove();
        seconds = 180
        endGameTruck = 0
        atemptsCount = 0
        inArow = 0
        playGame()
    });
}

function resetGame() {
    if (lifesaverTruck) { return }
    if (isGameResetting) { return }
    clearInterval(timer)
    isGameResetting = true
    isRunningGame = true
    lifesaverBox.innerHTML = ''
    bell.play()
    seconds = 180
    endGameTruck = 0
    atemptsCount = 0
    inArow = 0
    playGame()
    setTimeout(() => {
        isGameResetting = false;
    }, 8440)
}
function cronoGame() {
    function updateDisplay() {
        const minutes = Math.floor(seconds / 60);
        const sec = seconds % 60;
        crono.textContent = `${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }
    if (!isRunning) {
        timer = setInterval(() => {
            seconds--;
            updateDisplay();
            if (seconds <= 0) {
                clearInterval(timer); // Ferma il timer quando il conto alla rovescia arriva a 0
                isRunning = false;
                gameOver()
            }
        }, 1000);
    }
}

function lifesaverFunction() {
    click2.play()
    lifesaverTruck = true
    startTimer();
    const cards = document.querySelectorAll('.card')
    lifesaver.remove()
    cards.forEach(el => {
        if (!el.classList.contains('active')) {
            el.classList.remove('cover');
        }
    });
    setTimeout(() => {
        cards.forEach(el => {
            if (!el.classList.contains('active')) {
                el.classList.add('cover')
            }
            lifesaverTruck = false
        });
    }, 3000);
}

function showConfetti() {
    confetti({
        particleCount: 200,  // Numero di particelle
        spread: 120,          // Spread dell'esplosione
        origin: { y: 0.6 }   // Punto di origine (60% dall'alto)
    });
}











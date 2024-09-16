export const totalCards = 36; // Numero totale di carte
export const icon = `<i class="fa-solid fa-face-grin-hearts" style="color: #ffbe1a"></i>`; // L'icona che desideri mostrare
let iconCycleInterval;

export function createBoard() {
    const board = document.querySelector('.board');
    board.innerHTML = ''; // Svuota la board
    for (let i = 0; i < totalCards; i++) {
        const card = document.createElement('div');
        card.classList.add('card', 'cover');
        board.appendChild(card);
    }
}

export function startIconCycle() {
    iconCycleInterval = setInterval(() => {
        placeIconRandomly();
    }, 2000); // Cambia l'icona ogni 2 secondi
}

export function stopIconCycle() {
    clearInterval(iconCycleInterval); // Ferma il ciclo
}

function placeIconRandomly() {
    const cards = document.querySelectorAll('.card');

    function getRandomIndices() {
        const indices = Array.from({ length: totalCards }, (_, i) => i);
        shuffleArray(indices);
        return indices.slice(0, 2); // Prendi solo i primi due indici
    }

    const [pos1, pos2] = getRandomIndices();
    cards[pos1].innerHTML = icon;
    cards[pos2].innerHTML = icon;

    // Mostra l'icona per un tempo specifico e poi nascondila
    setTimeout(() => {
        cards[pos1].innerHTML = '';
        cards[pos2].innerHTML = '';
    }, 1000); // Mostra l'icona per 1 secondo
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap
    }
}




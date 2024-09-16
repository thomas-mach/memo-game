export const cards = [
    { name: 'heart', path: '<i class="fa-solid fa-heart"></i>', number: '0', active: false },
    { name: 'heart', path: '<i class="fa-solid fa-heart"></i>', number: '1', active: false },
    { name: 'ghost', path: '<i class="fa-solid fa-ghost"></i>', number: '0', active: false },
    { name: 'ghost', path: '<i class="fa-solid fa-ghost"></i>', number: '1', active: false },
    { name: 'bell', path: '<i class="fa-solid fa-bell"></i>', number: '0', active: false },
    { name: 'bell', path: '<i class="fa-solid fa-bell"></i>', number: '1', active: false },
    { name: 'gift', path: '<i class="fa-solid fa-gift"></i>', number: '0', active: false },
    { name: 'gift', path: '<i class="fa-solid fa-gift"></i>', number: '1', active: false },
    { name: 'umbrella', path: '<i class="fa-solid fa-umbrella"></i>', number: '0', active: false },
    { name: 'umbrella', path: '<i class="fa-solid fa-umbrella"></i>', number: '1', active: false },
    { name: 'car', path: '<i class="fa-solid fa-car"></i>', number: '0', active: false },
    { name: 'car', path: '<i class="fa-solid fa-car"></i>', number: '1', active: false },
    { name: 'lock', path: '<i class="fa-solid fa-lock"></i>', number: '0', active: false },
    { name: 'lock', path: '<i class="fa-solid fa-lock"></i>', number: '1', active: false },
    { name: 'rocket', path: '<i class="fa-solid fa-rocket"></i>', number: '0', active: false },
    { name: 'rocket', path: '<i class="fa-solid fa-rocket"></i>', number: '1', active: false },
    { name: 'crown', path: '<i class="fa-solid fa-crown"></i>', number: '0', active: false },
    { name: 'crown', path: '<i class="fa-solid fa-crown"></i>', number: '1', active: false },
    { name: 'lightbulb', path: '<i class="fa-solid fa-lightbulb"></i>', number: '0', active: false },
    { name: 'lightbulb', path: '<i class="fa-solid fa-lightbulb"></i>', number: '1', active: false },
    { name: 'yin-yang', path: '<i class="fa-solid fa-yin-yang"></i>', number: '0', active: false },
    { name: 'yin-yang', path: '<i class="fa-solid fa-yin-yang"></i>', number: '1', active: false },
    { name: 'sun', path: '<i class="fa-solid fa-sun"></i>', number: '0', active: false },
    { name: 'sun', path: '<i class="fa-solid fa-sun"></i>', number: '1', active: false },
    { name: 'bug', path: '<i class="fa-solid fa-bug"></i>', number: '0', active: false },
    { name: 'bug', path: '<i class="fa-solid fa-bug"></i>', number: '1', active: false },
    { name: 'fish', path: '<i class="fa-solid fa-fish"></i>', number: '0', active: false },
    { name: 'fish', path: '<i class="fa-solid fa-fish"></i>', number: '1', active: false },
    { name: 'hammer', path: '<i class="fa-solid fa-hammer"></i>', number: '0', active: false },
    { name: 'hammer', path: '<i class="fa-solid fa-hammer"></i>', number: '1', active: false },
    { name: 'dumbbell', path: '<i class="fa-solid fa-dumbbell"></i>', number: '0', active: false },
    { name: 'dumbbell', path: '<i class="fa-solid fa-dumbbell"></i>', number: '1', active: false },
    { name: 'skull', path: '<i class="fa-solid fa-skull"></i>', number: '0', active: false },
    { name: 'skull', path: '<i class="fa-solid fa-skull"></i>', number: '1', active: false },
    { name: 'frog', path: '<i class="fa-solid fa-frog"></i>', number: '0', active: false },
    { name: 'frog', path: '<i class="fa-solid fa-frog"></i>', number: '1', active: false },
]


export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Numero casuale tra 0 e i
        [array[i], array[j]] = [array[j], array[i]];   // Scambia gli elementi
    }
    return array;
}



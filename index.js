/** Classrepresenting a Card */
class Card {
    /*** @type {Array<Card>}*/
    static list = [];
    /**@type {Array<string>} */
    static colorsList = ['aqua', 'red', 'green', 'yellow', 'purple', 'orange', 'blue', 'black', 'aqua', 'red', 'green', 'yellow', 'purple', 'orange', 'blue', 'black']

    /**
     * @constructor
     * @param {object} data - The card data
     * @param {string} data.name - The card name
     * @param {string} data.color - The card color
     * @param {number} data.id - The card id
     */
    constructor (data) {
        this.name = data.name;
        this.color = data.color;
        this.id = data.id;
        this.createElement();
        Card.list.push(this);
    }

    /** Create the card element */
    createElement () {
        this.element = document.createElement('div');
        this.element.classList.add('card', 'unrevealed');
        this.element.dataset.id = this.id;
    }

    /**
    * Get a card by its id
    * @param {number} id - The card id
    * @returns {Card} The card with the given id
    */
    static Get (id) {
		return this.list.find(card => card.id == id);
	}
}

const htmlMain = document.querySelector('.main')


let activeElement = null;
let wait = false;

/**Create cards and shuffle them */
Card.colorsList.forEach(el => {
    const data = {
        name : el,
        color: el,
        id: Math.random() * 1000,
    }
    new Card(data)
})
shuffleArray(Card.list)

/**Add cards element to the main element */
Card.list.forEach(el => {
    htmlMain.append(el.element)
})

/** Handle click event on the cards */
document.addEventListener('click', e => {
    if (e.target.classList.contains('card') && !wait) {
        const card = Card.Get(e.target.dataset.id)

        if (!activeElement) {
            activeElement = card
            revealCard(card)
        }
        else {
            if (activeElement.color != card.color) {
                revealCard(card)
                turnFaild(card)
            } else {
                revealCard(card)
                turnWon(card)
            }
        }
    }
})

/**
 * Shuffle an array
 * @param {Array} arr - The array to shuffle
 */
function shuffleArray(arr) {
    arr.sort(() => Math.random() - 0.5);
}

/**
 * Reveal a card
 * @param {Card} card - the card to reveal
 */
function revealCard(card) {
    card.element.classList.add(card.color)
    card.element.classList.remove('unrevealed')
}

/**
 * Hide a card
 * @param {Card} card - the card to hide
 */
function hideCard(card) {
    card.element.classList.add('unrevealed')
    card.element.classList.remove(card.color)
}

/**
 * Handle the fail turn
 * @param {Card} currentCard - The current revealed card
 */
function turnFaild (currentCard) {
    wait = true
    setTimeout(() => {
        hideCard(activeElement)
        hideCard(currentCard)
        activeElement = null
        wait = false
    }, 1000);
}

/**
 * Handle the win turn
 * @param {Card} card - the current revealed card
 */
function turnWon (card) {
    wait = true
    setTimeout(() => {

        activeElement = null
        wait = false
    }, 500);
}
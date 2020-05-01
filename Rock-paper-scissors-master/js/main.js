/* --------------------------------------Elements--------------------------------------- */

const playerScore = document.querySelector('.score');
const gameItems = document.querySelectorAll('.wrapper');
const playerPick = document.querySelector('.player-picked');
const housePick = document.querySelector('.house-picked');
const stage1 = document.querySelector('.game-stage-1');
const stage2 = document.querySelector('.game-stage-2');
const restartBtn = document.querySelector('.play-btn');
const items = ['paper', 'scissors', 'rock'];

/* --------------------------------------Game class--------------------------------------- */

class Game {
    constructor(items, player, house, stage1, stage2, playerScore, playerBox, ) {
        this.items = items;
        this.score = 0;
        this.playerScore = playerScore;
        this.player = player;
        this.house = house;
        this.stage1 = stage1;
        this.stage2 = stage2;
        this.housePickValue;
    }

    increaseScore() {
        this.score += 1;
    }

    decreaseScore() {
        if (this.score > 0) {
            this.score -= 1;
        }
    }

    getScore() {
        return this.score;
    }

    getPlayerPick(item) {
        return item;
    }

    getHousePick() {
        const index = Math.floor(Math.random() * this.items.length);

        return this.items[index];
    }

    renderPlayerScore() {
        playerScore.innerText = this.getScore();
    }

    renderPlayerPick(item) {
        const html = `<img src="images/icon-${item}.svg" alt="${item}">`;

        this.player.parentNode.classList.add(`${item}`);
        this.player.innerHTML = html;
    }

    renderHousePick() {
        this.housePickValue = this.getHousePick();
        const html = `<img src="images/icon-${this.housePickValue}.svg" alt="${this.housePickValue}">`;

        this.house.parentNode.classList.add(`${this.housePickValue}`);
        this.house.innerHTML = html;
    }

    nextStage() {
        this.stage1.classList.add('active');
        this.stage2.classList.add('active');
    }

    defineWinner(playerItem) {
        const playerValue = this.getPlayerPick(playerItem);
        const houseValue = this.housePickValue;

        console.log(playerValue, houseValue);

        if (playerValue === 'rock' && houseValue === 'scissors' || playerValue === 'scissors' && houseValue === 'paper' || playerValue === 'paper' && houseValue === 'rock') {
            document.querySelector('.result').innerText = 'You Win';
            document.querySelector('.player-pick').classList.add('win');

            this.increaseScore();
            this.renderPlayerScore();

        } else if (playerValue === 'scissors' && houseValue === 'rock' || playerValue === 'paper' && houseValue === 'scissors' || playerValue === 'rock' && houseValue === 'paper') {
            document.querySelector('.result').innerText = 'You Lose';
            document.querySelector('.house-pick').classList.add('win');

            this.decreaseScore();
            this.renderPlayerScore();
        } else {
            document.querySelector('.result').innerText = 'Drawn';
        }
    }

    restartGame() {
        this.stage1.classList.remove('active');
        this.stage2.classList.remove('active');

        this.player.innerHTML = '';
        this.house.innerHTML = '';
        document.querySelector('.result').innerText = '';

        document.querySelector('.player-pick').classList.remove('win');
        document.querySelector('.house-pick').classList.remove('win');

        this.items.map(item => this.player.parentNode.classList.remove(item));
        this.items.map(item => this.house.parentNode.classList.remove(item));
    }
}

/* ------------------------------------------Create new game------------------------------------------- */


let newGame = new Game(items, playerPick, housePick, stage1, stage2, playerScore);


/* -----------------------------------------Listeners------------------------------------------ */

for (let item of gameItems) {
    item.addEventListener('click', function () {
        newGame.nextStage();
        newGame.renderPlayerPick(this.dataset.item);
        setTimeout(() => {
            newGame.renderHousePick();
        }, 1000);

        setTimeout(() => {
            newGame.defineWinner(this.dataset.item);
        }, 1500);


    })
};

restartBtn.addEventListener('click', event => {
    event.preventDefault();
    newGame.restartGame();
});


/* -----------------------------------------Rules modal------------------------------------------ */

const rulesBtn = document.querySelector('.rules-btn');
const closeBtn = document.querySelector('.close');
const modal = document.querySelector('.game-rules-wrapper');

/* Open rules modal */

function openRulesModal() {
    modal.classList.add('show');
}

/* Close rules modal */

function closeRulesModal() {
    modal.classList.remove('show');
}

rulesBtn.addEventListener('click', event => {
    event.preventDefault();

    openRulesModal();
});

closeBtn.addEventListener('click', event => {
    event.preventDefault();

    closeRulesModal();
})
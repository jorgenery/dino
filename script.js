const dino = document.querySelector('#dino');
const background = document.querySelector('.background');

const FPS = 1000 / 55;

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
	if (event.keyCode === 32 || event.keyCode === 38 ) {
		if (!isJumping) {
			jump();
		}
	}
}

function jump() {
	isJumping = true;

	let upInterval = setInterval(() => {
		if (position >= 150) {
			clearInterval(upInterval);
			let downInterval = setInterval(() => {
				if (position <= 0) {
					clearInterval(downInterval);
					isJumping = false;
				} else {
					position -= 20;
					dino.style.bottom = position + 'px';
				}
			}, FPS);
		} else {
			position += 20;
			dino.style.bottom = position + 'px';
		}
	}, FPS);
}

function createCactus() {
	const cactus = document.createElement('div');
	let cactusPosition = 1000;
	let randomTime = Math.random() * (6000 - 100) + 100;

	if (isGameOver) return;

	cactus.classList.add('cactus');
	background.appendChild(cactus);
	cactus.style.left = cactusPosition + 'px';

	let leftTimer = setInterval(() => {
		if (cactusPosition < -60) {
			clearInterval(leftTimer);
			background.removeChild(cactus);
		} else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
			clearInterval(leftTimer);
			isGameOver = true;
			document.body.innerHTML = '<div class="game-over"><h1>Fim de jogo</h1><h2>F5 - Jogar Novamente<h2></div>';
		} else {
			cactusPosition -= 10;
			cactus.style.left = cactusPosition + 'px';
		}
	}, FPS);

	setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
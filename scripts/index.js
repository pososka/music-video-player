import video from './videoPlayer.js';
import radio from './radioPlayer.js';
import music from './musicPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivationPlayer = () => {
	temp.style.display = 'none';

	video.pause();
	radio.pause();
	music.pause();

	playerBtn.forEach((item) => {
		item.classList.remove('active');
	});

	playerBlock.forEach((item) => {
		item.classList.remove('active');
	});
}

playerBtn.forEach((btn, i) => {
	btn.addEventListener('click', () => {
		deactivationPlayer();
		btn.classList.add('active');
		playerBlock[i].classList.add('active');
	});
});

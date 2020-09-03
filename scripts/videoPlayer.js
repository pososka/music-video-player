import { addZero } from './supScript.js';

class videoPlayer {
	constructor() {
		this.video = document.querySelector('.video-player');
		this.videoButtonPlay = document.querySelector('.video-button__play');
		this.videoButtonStop = document.querySelector('.video-button__stop');
		this.videoTimePassed = document.querySelector('.video-time__passed');
		this.videoProgress = document.querySelector('.video-progress');
		this.videoTimeTotal = document.querySelector('.video-time__total');
		this.videoButtonScreen = document.querySelector('.video-button__screen');
		this.videoVolume = document.querySelector('.video-volume');
		this.videoButtonVolume = document.querySelector('.video-button__volume');

		this.volume = 0;

		this.video.addEventListener('click', this.togglePlay.bind(this));
		this.videoButtonPlay.addEventListener('click', this.togglePlay.bind(this));

		this.video.addEventListener('play', this.toggleIconPlay.bind(this));
		this.video.addEventListener('pause', this.toggleIconPlay.bind(this));

		this.videoButtonStop.addEventListener('click', this.stopPlay.bind(this));

		this.video.addEventListener('timeupdate', () => {
			const currentTime = this.video.currentTime;
			const duration = this.video.duration;

			this.videoProgress.value = (currentTime / duration) * 100;

			let minutesPassed = Math.floor(currentTime / 60);
			let secondsPassed = Math.floor(currentTime % 60);

			let minutesTotal = Math.floor(duration / 60);
			let secondsTotal = Math.floor(duration % 60);

			this.videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
			this.videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
		});

		this.videoProgress.addEventListener('input', () => {
			const duration = this.video.duration;
			const value = this.videoProgress.value;

			this.video.currentTime = (value * duration) / 100;
		});

		this.videoButtonScreen.addEventListener('click', () => {
			this.video.requestFullscreen();
		});

		this.videoVolume.addEventListener('input', () => {
			this.video.muted = false;
			this.video.volume = this.videoVolume.value / 100;

			this.toggleIconVolume();
		});

		this.videoButtonVolume.addEventListener('click', () => {
			if (this.video.muted) {
				// this.video.volume = volume / 100;
				this.videoVolume.value = this.volume;
			} else {
				this.volume = this.videoVolume.value;
				// this.video.volume = 0;
				this.videoVolume.value = 0;
			}

			this.toggleIconVolume();
			
			this.video.muted = !this.video.muted;
		});

		this.videoVolume.value = this.video.volume * 100;
	}

	toggleIconPlay() {
		if (this.video.paused) {
			this.videoButtonPlay.classList.remove('fa-pause');
			this.videoButtonPlay.classList.add('fa-play');
		} else {
			this.videoButtonPlay.classList.add('fa-pause');
			this.videoButtonPlay.classList.remove('fa-play');
		}
	}

	toggleIconVolume() {
		this.videoButtonVolume.classList.remove('fa-volume-off');

		if (this.videoVolume.value < 50) {
			this.videoButtonVolume.classList.remove('fa-volume-up');
			this.videoButtonVolume.classList.add('fa-volume-down');

			if (this.videoVolume.value == 0) {
				this.videoButtonVolume.classList.remove('fa-volume-down');
				this.videoButtonVolume.classList.add('fa-volume-off');
			}
		} else {
			this.videoButtonVolume.classList.remove('fa-volume-down');
			this.videoButtonVolume.classList.add('fa-volume-up');
		}
	}

	togglePlay() {
		if (this.video.paused) {
			this.video.play();
		} else {
			this.video.pause();
		}
	}

	stopPlay() {
		this.video.pause();
		this.video.currentTime = 0;
	}

	pause() {
		this.video.pause();
	}
}

export default new videoPlayer();

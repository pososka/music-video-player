import { addZero } from './supScript.js';

class musicPlayer {
	constructor() {
		this.audio = document.querySelector('.audio');
		this.audioImg = document.querySelector('.audio-img');
		this.audioHeader = document.querySelector('.audio-header');
		this.audioPlayer = document.querySelector('.audio-player');
		this.audioNavigation = document.querySelector('.audio-navigation');
		this.audioButtonPlay = document.querySelector('.audio-button__play');
		this.audioTimePassed = document.querySelector('.audio-time__passed');
		this.audioProgress = document.querySelector('.audio-progress');
		this.audioProgressTiming = document.querySelector('.audio-progress__timing');
		this.audioTimeTotal = document.querySelector('.audio-time__total');

		this.playlist = ['hello', 'flow', 'speed'];
		this.trackIndex = 0;

		this.audioPlayer.addEventListener('play', this.toggleIcons.bind(this));
		this.audioPlayer.addEventListener('pause', this.toggleIcons.bind(this));

		this.audioNavigation.addEventListener('click', (event) => {
			const target = event.target;

			if (target.classList.contains('audio-button__play')) {
				if (this.audioPlayer.paused) {
					this.audioPlayer.play();
				} else {
					this.audioPlayer.pause();
				}

				const track = this.playlist[this.trackIndex];
				this.audioHeader.textContent = track.toUpperCase();
			}

			if (target.classList.contains('audio-button__prev')) {
				this.prevTrack();
			}

			if (target.classList.contains('audio-button__next')) {
				this.nextTrack();
			}
		});

		this.audioPlayer.addEventListener('ended', () => {
			this.nextTrack();
			this.audioPlayer.play();
		});

		this.audioPlayer.addEventListener('timeupdate', () => {
			const duration = this.audioPlayer.duration;
			const currentTime = this.audioPlayer.currentTime;
			const progress = (currentTime / duration) * 100;

			this.audioProgressTiming.style.width = progress + '%';

			const minutesPassed = Math.floor(currentTime / 60) || '0';
			const secondsPassed = Math.floor(currentTime % 60) || '0';

			const minutesTotal = Math.floor(duration / 60) || '0';
			const secondsTotal = Math.floor(duration % 60) || '0';

			this.audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
			this.audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
		});

		this.audioProgress.addEventListener('click', (event) => {
			const x = event.offsetX;
			const allWidth = this.audioProgress.clientWidth;
			const progress = (x / allWidth) * this.audioPlayer.duration;

			this.audioPlayer.currentTime = progress;
		});
	}

	loadTrack() {
		const isPlayed = this.audioPlayer.paused;
		const track = this.playlist[this.trackIndex];

		this.audioHeader.textContent = track.toUpperCase();
		this.audioImg.src = `./audio/${track}.jpg`;
		this.audioPlayer.src = `./audio/${track}.mp3`;

		if (isPlayed) {
			this.audioPlayer.pause();
		} else {
			this.audioPlayer.play();
		}
	}

	prevTrack() {
		if (this.trackIndex !== 0) {
			this.trackIndex--;
		} else {
			this.trackIndex = this.playlist.length - 1;
		}

		this.loadTrack();
	}

	nextTrack() {
		if (this.trackIndex === this.playlist.length - 1) {
			this.trackIndex = 0;
		} else {
			this.trackIndex++;
		}

		this.loadTrack();
	}

	toggleIcons() {
		if (this.audioPlayer.paused) {
			this.audio.classList.remove('play');
			this.audioButtonPlay.classList.add('fa-play');
			this.audioButtonPlay.classList.remove('fa-pause');
		} else {
			this.audio.classList.add('play');
			this.audioButtonPlay.classList.remove('fa-play');
			this.audioButtonPlay.classList.add('fa-pause');
		}
	}

	pause() {
		this.audioPlayer.pause();
	}
}

export default new musicPlayer();

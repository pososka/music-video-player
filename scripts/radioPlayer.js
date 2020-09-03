class radioPlayer {
	constructor () {
		this.radio = document.querySelector('.radio');
		this.radioCoverImg = document.querySelector('.radio-cover__img');
		this.radioNavigation = document.querySelector('.radio-navigation');
		this.radioItems = document.querySelectorAll('.radio-item');
		this.radioHeaderBig = document.querySelector('.radio-header__big');
		this.radioStop = document.querySelector('.radio-stop');

		this.audio = new Audio();
		this.audio.type = 'audio/aac';

		this.radioStop.disabled = true;

		this.radioNavigation.addEventListener('change', (event) => {
			const target = event.target;
			const parent = target.closest('.radio-item');
			const title = parent.querySelector('.radio-name').textContent;
			const urlImg = parent.querySelector('.radio-img').src;

			this.radioHeaderBig.textContent = title;
			this.radioCoverImg.src = urlImg;

			this.radioStop.disabled = false;
			this.audio.src = target.dataset.radioStantion;;
			this.play();

			this.selectItem(parent);
		});

		this.radioStop.addEventListener('click', () => {
			if (this.audio.paused) {
				this.play();
			} else {
				this.pause();
			}
		});

		this.audio.addEventListener('play', this.toggleIconPlay.bind(this));
		this.audio.addEventListener('pause', this.toggleIconPlay.bind(this));
	}

	toggleIconPlay() {
		if (this.audio.paused) {
			this.radio.classList.remove('play');
			this.radioStop.classList.remove('fa-stop');
			this.radioStop.classList.add('fa-play');
		} else {
			this.radio.classList.add('play');
			this.radioStop.classList.remove('fa-play');
			this.radioStop.classList.add('fa-stop');
		}
	}

	selectItem(elem) {
		this.radioItems.forEach((item) => {
			item.classList.remove('select');
		});

		elem.classList.add('select');
	}

	pause() {
		this.audio.pause();
	}

	play() {
		this.audio.play();
	}
}

export default new radioPlayer();

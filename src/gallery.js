// Gallery rebuilt from gallaryref with site color scheme and local images

(function () {
	// We use the reference canvas layout and local images from public/Gallery

	// Utilities
	class Utilities {
		static randomRange(min, max) {
			return min + Math.random() * (max - min);
		}
		static randomInt(min, max) {
			return Math.floor(min + Math.random() * (max - min + 1));
		}
	}

	// Loader
	class Loading {
		constructor(imagePaths) {
			this.load = document.getElementsByClassName('loading')[0];
			this.line = this.load ? this.load.querySelector('.line') : null;
			this.counter = this.load ? this.load.querySelector('.counter') : null;
			this.imagePaths = imagePaths || [];
			this.loadedNumber = 1;
			this.percentage = 0;
			this.num = 0;
		}
		initialize() {
			if (!this.load) return Promise.resolve();
			return new Promise((resolve) => {
				this.loadImages(resolve);
			});
		}
		loadImages(resolve) {
			if (!this.imagePaths.length) {
				// No images to preload; hide immediately
				requestAnimationFrame(() => {
					this.load.classList.add('loaded');
					resolve();
				});
				return;
			}
			for (let i = 0; i < this.imagePaths.length; i++) {
				const path = this.imagePaths[i];
				const image = new Image();
				image.src = path;
				image.addEventListener('load', () => {
					this.percentage = Math.floor(
						(this.loadedNumber++ / this.imagePaths.length) * 100
					);
				});
			}
			this.drawPercentage(resolve);
		}
		drawPercentage(resolve) {
			if (this.num < this.percentage) this.num++;
			if (this.line) this.line.style.width = this.num + '%';
			if (this.counter) this.counter.textContent = this.num + '%';
			if (this.num === 100) {
				cancelAnimationFrame(this.animationID);
				if (this.load) this.load.classList.add('loaded');
				resolve();
				return;
			}
			this.animationID = requestAnimationFrame(
				this.drawPercentage.bind(this, resolve)
			);
		}
	}

	// Core canvas sketch adapted to use preloaded local images
	class Sketch {
		constructor(images) {
			this.images = images; // Array<Image>
			this.canvas = document.createElement('canvas');
			this.canvas.className = 'gallery-canvas';
			this.ctx = this.canvas.getContext('2d');
			document.body.appendChild(this.canvas);
			this.touch = { deltaX: 0, deltaY: 0, mouseX: 0, mouseY: 0 };
			this.setup();
		}
		setup() {
			this.onResize = this.onResize.bind(this);
			this.onWheel = this.onWheel.bind(this);
			this.onMousemove = this.onMousemove.bind(this);
			window.addEventListener('resize', this.onResize, false);
			window.addEventListener('wheel', this.onWheel, false);
			document.body.addEventListener('mousemove', this.onMousemove, false);
			this.initialize();
		}
		initialize() {
			if (this.raf) cancelAnimationFrame(this.raf);
			this.width = this.canvas.width = window.innerWidth;
			this.height = this.canvas.height = window.innerHeight;
			this.edge = Math.max(this.width, this.height);
			this.radius = this.edge / 2;
			this.count = 10; // fewer tiles for smoother performance
			this.size = this.radius / (this.count / 6);
			this.shapes = [];
			for (let x = 0, i = 0; x < this.count; x++) {
				for (let y = 0; y < this.count; y++) {
					const img =
						this.images[Utilities.randomInt(0, this.images.length - 1)];
					this.shapes.push({ xIndex: x, yIndex: y, i: i++, img, ratio: 0 });
				}
			}
			const draw = (t) => {
				this.ctx.clearRect(0, 0, this.width, this.height);
				this.ctx.save();
				this.ctx.translate(this.width / 2, this.height / 2);
				for (let s of this.shapes) {
					const xR = ((Math.PI * 2) / this.count) * s.xIndex;
					const yR = ((Math.PI * 2) / this.count) * s.yIndex;
					const x = Math.sin(xR + this.touch.deltaX) * this.radius;
					const y = Math.cos(yR + this.touch.deltaY) * this.radius;
					// Draw all quads (disable culling to ensure visibility)
					// Skip if image not loaded yet
					if (!s.img || !s.img.complete || s.img.naturalWidth === 0) continue;
					const dist = Math.sqrt(x * x + y * y) / this.radius;
					const eased = 1 - Math.min(dist * dist * dist, 1);
					const ratio = eased;
					const size = this.size * ratio; // scale tile by ratio
					if (size <= 0.5) continue; // skip very tiny draws

					// Fit image to fill the tile (cover mode for better visual)
					const iw = s.img.naturalWidth;
					const ih = s.img.naturalHeight;
					const scale = Math.max(size / iw, size / ih);
					const dw = Math.max(1, iw * scale);
					const dh = Math.max(1, ih * scale);
					const dx = x - dw / 2;
					const dy = y - dh / 2;

					// Store tile info for click detection
					s.screenX = x + this.width / 2;
					s.screenY = y + this.height / 2;
					s.screenSize = size;

					this.ctx.save();
					if (ratio < 1) this.ctx.globalAlpha = ratio;
					// Clip to tile boundaries
					this.ctx.beginPath();
					this.ctx.rect(x - size / 2, y - size / 2, size, size);
					this.ctx.clip();
					this.ctx.drawImage(s.img, dx, dy, dw, dh);
					this.ctx.restore();
				}
				this.ctx.restore();
				this.raf = requestAnimationFrame(draw);
			};
			draw(0);
		}
		onResize() {
			this.initialize();
		}
		onWheel(e) {
			this.touch.deltaX += e.deltaX * 0.0005;
			this.touch.deltaY += e.deltaY * 0.0005;
		}
		onMousemove(e) {
			this.touch.mouseX = e.clientX;
			this.touch.mouseY = e.clientY;
		}
	}

	// Build local image path list from existing gallery assets
	// Support both 'gallary' and 'Gallery' folder spellings
	const names = [
		'AT3A3005.JPG',
		'AT3A3015.JPG',
		'AT3A3200.JPG',
		'AT3A3207.JPG',
		'bob.JPG',
		'DSC_0128.JPG',
		'DSC_0138.JPG',
		'DSC_0166.JPG',
		'DSC_0169.JPG',
		'IMG_0173.JPG',
		'IMG_0269.JPG',
		'IMG_0676.JPG',
		'IMG_0679.JPG',
		'IMG_0767.JPG',
		'IMG_0772.JPG',
		'IMG_0777.JPG',
		'IMG_0797.JPG',
		'IMG_0824.JPG',
		'IMG_0833.JPG',
		'IMG_0850.JPG',
		'IMG_0853.JPG',
		'IMG_0864.JPG',
		'IMG_1090.JPG',
		'IMG_5467.JPG',
		'IMG_5470.JPG',
		'IMG_9700.JPG',
		'IMG_9749.JPG',
		'IMG_9824.JPG',
		'IMG_9897.JPG',
		'IMG_9922.JPG',
		'IMG_9923.JPG',
		'IMG_9991.JPG',
		'IMG_9992.JPG',
		'IMG_9999.JPG',
		'indiangroup.jpg',
		'indiansolo.JPG',
		'spotchoreo.JPG',
		'streetplay.jpg',
		'westerngroup.jpg',
		'westernsolo.png',
	];
	const localPaths = [
		...names.map((n) => `./public/gallary/${n}`),
		...names.map((n) => `./public/Gallery/${n}`),
	];

	// Preload images before starting canvas to avoid blank screen
	function preloadImages(paths) {
		return new Promise((resolve) => {
			if (!paths.length) return resolve([]);
			const good = [];
			let processed = 0;
			const done = () => {
				if (processed >= paths.length) resolve(good);
			};
			paths.forEach((src) => {
				const img = new Image();
				img.onload = () => {
					processed++;
					good.push(img);
					done();
				};
				img.onerror = () => {
					processed++;
					done();
				};
				img.src = src;
			});
		});
	}

	// Start
	const loader = new Loading(localPaths);
	function shuffle(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	loader
		.initialize()
		.then(() => preloadImages(localPaths))
		.then((images) => {
			const imgs = shuffle(images.slice());
			const sketch = new Sketch(imgs);
			// Periodically update random tiles with next images to create looping effect
			let pool = imgs.slice();
			let ptr = 0;
			setInterval(() => {
				if (!sketch || !sketch.shapes || !pool.length) return;
				// reshuffle when we reach end
				if (ptr >= pool.length - 1) {
					pool = shuffle(pool.slice());
					ptr = 0;
				}
				// update up to 10 random tiles
				for (let k = 0; k < 10; k++) {
					const si = Math.floor(Math.random() * sketch.shapes.length);
					sketch.shapes[si].img = pool[ptr++];
				}
			}, 3000);
		});
})();

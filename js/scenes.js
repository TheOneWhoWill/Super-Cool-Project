class Arena extends Scene {
	constructor() {
		super([
			ryu,
			ken,
		])
		this.count = 0;
	}

	renderBackground(context) {
		let background = gifFrameExtractor(this.count, 20, "images/dock/", 8);
		context.drawImage(background, 0, 0, 1280, 800);
		this.count++;
	}
}

class Main extends Scene {
	constructor() {
		super([])
		this.count = 0;
	}

	renderBackground(context) {
		let background = gifFrameExtractor(this.count, 16, "images/street/", 8);
		let logoSize = 400;
		let logo = new Image()
		logo.src = "images/scene/logo.png"
		let instructions = new Image();
		instructions.src = "images/scene/instructions.png";

		context.drawImage(background, 0, 0, 1280, 800);
		context.drawImage(logo, 1280 / 2 - logoSize / 2, 0, logoSize, logoSize)
		context.drawImage(instructions, 1280 / 2 - logoSize / 2, logoSize, logoSize, logoSize)
		this.count++;
	}

	handleInput(keycode) {
		if (keycode === "Space") {
			currentScene = new Arena();
		}

		if (keycode === "KeyQ") {
			currentScene = new Help();
		}
	}
}

class Help extends Scene {
	constructor() {
		super([])
		this.count = 0;
	}

	renderBackground(context) {
		let background = gifFrameExtractor(this.count, 16, "images/street/", 8);
		let help = new Image();
		help.src = "images/scene/help.png";

		context.drawImage(background, 0, 0, 1280, 800);
		context.drawImage(help, 0, 0, 1280, 800);
		this.count++;
	}

	handleInput(keycode) {
		if (keycode === "Space") {
			currentScene = new Arena();
		}
	}
}

class Victory extends Scene {
	constructor(winner) {
		super([])
		this.winner = winner;
		this.count = 0;
		audio.pause();
		audio.src = "audio/victory.wav";
		audio.play();

		audio.addEventListener('ended', () => {
			audio.pause();
			audio.src = "audio/09. Ryu Stage.flac";
			currentScene = new Main();
			audio.play();
			reset();
		})
	}

	renderBackground(context) {
		let background = gifFrameExtractor(this.count, 16, "images/street/", 8);
		let victory = new Image();
		victory.src = "images/scene/victory.png";

		context.drawImage(background, 0, 0, 1280, 800);
		context.drawImage(victory, 0, 0, 1280, 800);

		let victor;

		if(this.winner === "Ryu") {
			victor = gifFrameExtractor(this.count, 8, "images/fighter/hq/", 13);
			context.drawImage(victor, 390, 50, 500, 700);
		} else {
			victor = gifFrameExtractor(this.count, 8, "images/ken/", 6);
			context.drawImage(victor, 512, 256, 256, 494);
		}


		this.count++;
	}

	handleInput(keycode) {
		if (keycode === "Space") {
			currentScene = new Arena();
		}
	}

}

function gifFrameExtractor(frame, fps, src, frames) {
	let frameGap = fps * frames;
	let frameImage = new Image();

	frameImage.src = `${src}${parseInt(frame % frameGap / parseInt(frameGap / frames))}.png`;

	return frameImage;
}
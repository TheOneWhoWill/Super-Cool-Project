class Fighter extends Actor {
	constructor(pos) {
		super(pos, "Undefined");
		this.count = 0;
		this.movement = 15;
		this.state = "normal";
		this.actionCount = 0;
		this.leftMove = "Undefined";
		this.rightMove = "Undefined";
		this.attack1 = "Undefined";
		this.attack2 = "Undefined";
		this.opponent = null;
		this.health = 100;
	}

	render(context) {

		if(this.state === "normal") {
			let fighter = gifFrameExtractor(this.count, 8, this.src, 6);

			context.drawImage(fighter, this.pos.x, this.pos.y);
		} else if(this.state === "punching") {
			this.attack1Animation(context)

		} else if(this.state === "blasting") {
			this.attack2Animation(context);
		}
	
		this.count++;
	}

	attack1Animation(context) {
		throw new Error("Attack 1 Animation not Implemented");
	}
	attack2Animation(context) {
		throw new Error("Attack 2 Animation not Implemented");
	}
	attack1Handler() {
		throw new Error("Attack 1 not implemented");
	}
	attack2Handler() {
		throw new Error("Attack 2 not implemented");
	}

	takeDamage(damage, victor) {
		this.health -= damage;

		if(this.health < 0) {
			this.health = 0;
			currentScene = new Victory(victor);
		}
	}

	createBar(context, direction, x, y, percentage, width, height, border, fillColor, borderColor) {
		context.beginPath();
		context.fillStyle = borderColor;
		if(direction === -1) {
			context.rect(1280 - x - width, y, width, height);
		} else {
			context.rect(x, y, width, height);
		}
		context.fill();
		context.beginPath();
		context.fillStyle = fillColor;
		if(direction === -1 && percentage > 0) {
			context.rect(1280 - x - width + border + (width * ((100 - percentage) / 100)), y + border, width * (percentage / 100) - border * 2, height - 2 * border);
		} else {
			context.rect(x + border, y + border, (width - 2 * border) * (percentage / 100), 30);
		}
		context.fill();
	}

	input(codes) {
		let i;
		for(i = 0; i < codes.length; i++) {
			let code = codes[i];

			switch(code) {
				case this.rightMove:
					this.pos.x += this.movement;
					break;
				case this.leftMove:
					this.pos.x -= this.movement;
					break;
				case this.attack1:
					if(this.state === "normal") {
						this.state = "punching";
						this.attack1Handler();
					}
					break;
				case this.attack2:
					if(this.state === "normal") {
						this.state = "blasting";
						this.attack2Handler();
					}
					break;
				default:
					break;
			}
		}
	}
}

class Ryu extends Fighter {
	constructor(pos) {
		super(pos);
		this.src = "images/fighter/";
		this.leftMove = "KeyA";
		this.rightMove = "KeyD";
		this.attack1 = "KeyQ";
		this.attack2 = "KeyE";
	}

	render(context) {
		super.render(context);
		super.createBar(context, 1, 50, 50, this.health, 400, 50, 10, "skyblue", "black")
	}

	attack1Handler() {
		let distance = Math.abs(ken.pos.x - this.pos.x);

		if (distance < 320) {
			ken.takeDamage(15, "Ryu");
		}
	}

	attack2Handler() {
		let distance = Math.abs(ken.pos.x - this.pos.x);

		if (distance < 800 && distance > 550) {
			ken.takeDamage(20, "Ryu");
		}
	}

	attack1Animation(context) {
		let frames = 10;
		let slowdown = 5.5;
		let puncher = gifFrameExtractor(this.actionCount, 1 * slowdown, `${this.src}punch/`, frames)

		context.drawImage(puncher, this.pos.x, this.pos.y);

		if(this.actionCount >= frames * slowdown || this.actionCount === frames * slowdown) {
			this.state = "normal";
			this.actionCount = 0;
		} else {
			this.actionCount++;
		}
	}

	attack2Animation(context) {
		let frames = 10;
		let slowdown = 3;
		let blaster = gifFrameExtractor(this.actionCount, 1 * slowdown, `${this.src}blast/`, frames);

		context.drawImage(blaster, this.pos.x, this.pos.y + 35);

		if(this.actionCount >= frames * slowdown || this.actionCount === frames * slowdown) {
			this.state = "normal";
			this.pos.x += 220;
			this.actionCount = 0;
		} else {
			this.actionCount++;
		}
	}
}

class Ken extends Fighter {
	constructor(pos) {
		super(pos);
		this.src = "images/ken/"
		this.leftMove = "KeyJ";
		this.rightMove = "KeyL";
		this.attack1 = "KeyU";
		this.attack2 = "KeyO";
	}

	render(context) {
		super.render(context);
		super.createBar(context, -1, 50, 50, this.health, 400, 50, 10, "green", "black")
	}

	attack1Handler() {
		let distance = Math.abs(ryu.pos.x - this.pos.x);

		if (distance < 285) {
			ryu.takeDamage(15, "Ken");
		}
	}

	attack2Handler() {
		let distance = Math.abs(ryu.pos.x - this.pos.x);

		if (distance < 375) {
			ryu.takeDamage(20, "Ken");
		}
	}

	attack1Animation(context) {
		let frames = 10;
		let slowdown = 4;
		let kicker = gifFrameExtractor(this.actionCount, 1 * slowdown, `${this.src}kick/`, frames)
		let imgScale = 4;
		context.drawImage(kicker, this.pos.x - 180, this.pos.y - 140, 131 * imgScale, 157 * imgScale);

		if(this.actionCount >= frames * slowdown || this.actionCount === frames * slowdown) {
			this.state = "normal";
			this.actionCount = 0;
		} else {
			this.actionCount++;
		}
	}

	attack2Animation(context) {
		let frames = 27;
		let slowdown = 5;
		let imgScale = 4;
		let kicker = gifFrameExtractor(this.actionCount, 1 * slowdown, `${this.src}super_kick/`, frames)

		context.drawImage(kicker, this.pos.x - 320, this.pos.y - 500, 238 * imgScale, 256 * imgScale);

		if(this.actionCount >= frames * slowdown || this.actionCount === frames * slowdown) {
			this.state = "normal";
			this.pos.x -= 250;
			this.actionCount = 0;
		} else {
			this.actionCount++;
		}
	}
}
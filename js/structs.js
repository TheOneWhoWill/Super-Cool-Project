class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Scene {
	constructor(actors) {
		this.actors = actors;
		this.keyCodesInQue = [];
	}

	render(context) {
		let actors = this.actors;

		this.renderBackground(context);

		let i;
		for(i = 0; i < actors.length; i++) {
			actors[i].render(context);
		}
	
		for (const actor of actors) {
			actor.keyCodesQueue = [];
		}
		
		// Iterate over the key codes in the global key codes queue and add them to the actor's key codes queue.
		for (const code of this.keyCodesInQue) {
			this.handleInput(code);

			for (const actor of actors) {
				actor.keyCodesQueue.push(code);
			}
		}
		
		// Iterate over the actors and call the input() function.
		for (const actor of actors) {
			actor.input(actor.keyCodesQueue);
		}
	
		this.keyCodesInQue = [];
	}

	renderBackground(context) {
		//
	}

	handleInput(keycode) {
		//
	}
}

class Actor {
	// Pos indicates the location relative to the top left of the screen
	// src defines the url of the sprite map or for now just the sprite
	constructor(pos, src) {
		this.pos = pos;
		this.src = src;
		this.keyCodesQueue = []
	}

	render(context) {
		throw new Error("Render not implemented")
	}

	input(codes) {
		throw new Error("Key Handler not implemented")
	}
}
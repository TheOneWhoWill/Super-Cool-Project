let audio = new Audio("audio/09. Ryu Stage.flac");
let canvas = document.getElementById("canvas");
let backcanvas = document.getElementById("backcanvas");
let context = canvas.getContext('2d');
let backcontext = backcanvas.getContext('2d');
let canvasDimension = new Vector2(1280, 800);

let ryu = new Ryu(new Vector2(100, 275));
let ken = new Ken(new Vector2(924, 275));

let arena = new Main();// new Arena();
let currentScene = arena;

function render() {
	backcontext.clearRect(0, 0, canvasDimension.x, canvasDimension.y);

	currentScene.render(backcontext);

	context.drawImage(backcanvas, 0, 0);

	requestAnimationFrame(render)
}

function initalize(dimensions) {    
	let width = `${dimensions.x}px`;
	let height = `${dimensions.y}px`;
	
	canvas.setAttribute("width", width);
	canvas.setAttribute("height", height);

	backcanvas.setAttribute("width", width);
	backcanvas.setAttribute("height", height);

	audio.id = "audio"
	audio.preload = true;

	render();
}

function reset() {
	ryu.health = 100;
	ken.health = 100;
	ryu.pos = new Vector2(100, 275);
	ken.pos = new Vector2(924, 275);
}

initalize(canvasDimension);

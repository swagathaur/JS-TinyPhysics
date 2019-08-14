var canvas = document.getElementById('game')
var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;

// utils
function timestamp()
{
	if (window.performance && window.performance.now)
		return window.performance.now();
	else
		return new Date().getTime();
}

// input
document.addEventListener('keydown', function(ev) { return onKey(ev);  }, false);
//document.addEventListener('keyup',   function(ev) { return onKey(ev); }, false);
const moveSpeed = 5;
function onKey(event)
{
	if (event.key == 'w')
		rect2.y -= moveSpeed;
	else if (event.key == 's')
		rect2.y += moveSpeed;
	if (event.key == 'a')
		rect2.x -= moveSpeed;
	else if (event.key == 'd')
		rect2.x += moveSpeed;
}

var rect1 = new Rect(width / 2, height / 2, 32, 32);
var rect2 = new Rect((width / 2) + 64, (height / 2) + 64, 32, 32);

// main scaffolding
var fps = 60;
var dt = 0;
var now;
var last = timestamp();

function frame() {
	now = timestamp();
	dt = now - last / 1000;

	update(dt);
	draw();

	requestAnimationFrame(frame);
}
frame();

function update(dt)
{
	if (rect1.Intersects(rect2))
		console.log("COLLISION");
}

var black = '#000000'
var purple = '#542437';
var red = '#550000'

function draw()
{
	context.fillStyle = '#555555';
	context.fillRect(0, 0, width, height);

	rect1.Draw(black);
	rect2.Draw(red);
}
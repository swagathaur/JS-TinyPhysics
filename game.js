var canvas = document.getElementById('game')
var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;

var fps = 60;
var step = 1 / fps;
var dt = 0;
var now;
var last = timestamp();

// main scaffolding
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

}

var isBlack = false;
var black = '#000000'
var purple = '#542437';

function draw()
{
	context.fillStyle = isBlack ? black : purple;
	context.fillRect(0, 0, width, height);
}

// utils
function timestamp()
{
	if (window.performance && window.performance.now)
		return window.performance.now();
	else
		return new Date().getTime();
}

//input
document.addEventListener('keydown', function(ev) { return onKey(ev);  }, false);
//document.addEventListener('keyup',   function(ev) { return onKey(ev); }, false);
function onKey(event)
{
	if (event.key == ' ')
	{
		isBlack = !isBlack;
	}
}
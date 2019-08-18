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

var rect1 = new Rect(0, 0, 1, 1);
var rect2 = new Rect(2, 2, 1, 1);

var body1 = new RigidBody(1, 1, false, false);
var body2 = new RigidBody(1, 1, false, false);
body1.position = new Vec2(rect1.x, rect1.y);
body2.position = new Vec2(rect2.x, rect2.y);

var cameraPosition = new Vec2(0, 0);
var pixelsPerUnit = 32;

// main scaffolding
var fps = 60;
var dt = 0;
var now;
var last = timestamp();

function frame() {
	now = timestamp();
	dt = (now - last) / 1000;
	last = now;

	update(dt);
	draw();

	requestAnimationFrame(frame);
}
frame();

const moveSpeed = 5;
function update(dt)
{
	if (movement[keybinds.LEFT])
		body1.AddForce(new Vec2(-1, 1), new Vec2(0, 0));
	else if (movement[keybinds.RIGHT])
		body1.AddForce(new Vec2(1, 1), new Vec2(0, 0));

	if (rect1.Intersects(rect2))
		console.log("COLLISION");
		
	body1.UpdateForces(dt);
	body2.UpdateForces(dt);
	rect1.x = body1.position.x;
	rect1.y = body1.position.y;
	rect2.x = body2.position.x;
	rect2.y = body2.position.y;
}

var black = '#000000'
var purple = '#542437';
var red = '#550000'

function draw()
{
	context.fillStyle = '#555555';
	context.fillRect(0, 0, width, height);
	cameraOffset = Vec2.Add(new Vec2(-cameraPosition.x, -cameraPosition.y), new Vec2(width / 2, height / 2));
	rect1.Draw(black, cameraOffset, pixelsPerUnit);
	rect2.Draw(red, cameraOffset, pixelsPerUnit);
}
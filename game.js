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

var body1 = new RigidBody(new Rect(0, 0, .8, 1.5), 1, 1, false, false);
var body2 = new RigidBody(new Rect(0, 0, 1, 0.5), 1, 1, false, false);
body1.position = new Vec2(5, -5);
body2.position = new Vec2(6, -5);

var topWall = new RigidBody(new Rect(0, 0, 10000, 1), 100000000, 1, true, true);
topWall.position = new Vec2(0, 13);
var bottomWall = new RigidBody(new Rect(0, 0, 10000, 1), 100000000, 1, true, true);
bottomWall.position = new Vec2(0, -13);
var leftWall = new RigidBody(new Rect(0, 0, 1, 10000), 100000000, 1, true, true);
leftWall.position = new Vec2(-23, 0);
var rightWall = new RigidBody(new Rect(0, 0, 1, 10000), 100000000, 1, true, true);
rightWall.position = new Vec2(23, 0);

dynamicBodies = [body1, body2];
staticBodies = [leftWall, rightWall, topWall, bottomWall];

var testRect = new Rect(-10, 10, 1, 1);

var cameraPosition = new Vec2(0, 0);
var pixelsPerUnit = 32;

// main scaffolding
var fps = 60;
var dt = 0;
var now;
var last = timestamp();

var sprite = createSprite("LeonsWeirdNakedGirlThing.png");

function frame() {
	
	now = timestamp();
	dt = (now - last) / 1000;
	last = now;
	
	draw();
	update(dt);
	
	requestAnimationFrame(frame);
}
frame();

const moveSpeed = 5;
function update(dt)
{
	if (movement[keybinds.LEFT])
		body1.AddForce(new Vec2(-.4, 0), new Vec2(0, 0));
	if (movement[keybinds.RIGHT])
		body1.AddForce(new Vec2(.4, 0), new Vec2(0, 0));
	if (movement[keybinds.UP])
		body1.AddForce(new Vec2(0, .4), new Vec2(0, 0));
	if (movement[keybinds.DOWN])
		body1.AddForce(new Vec2(0, -.4), new Vec2(0, 0));

	HandleCollision(body1, body2);
	dynamicBodies.forEach(dynaBod => {
		/*staticBodies.forEach(staticBod => {
			staticBod.Update(dt);
			HandleCollision(dynaBod, staticBod);
		});
	*/
		dynaBod.Update(dt);
	});
}

var black = '#000000'
var purple = '#542437';
var red = '#550000'

function GetCameraOffset()
{	
	//This doesnt use pixel-unit Ratio yet
	return Vec2.Add(new Vec2(-cameraPosition.x, -cameraPosition.y), new Vec2(width / 2, height / 2));
}

function draw()
{
	context.fillStyle = '#555555';
	context.fillRect(0, 0, width, height);

	testRect.DrawSpriteDithered(sprite, GetCameraOffset(), pixelsPerUnit, 0.2);
}
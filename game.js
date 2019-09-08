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

var player = new RigidBody(new Rect(0, 0, .8, 1.5), 1, false);
var body1 = new RigidBody(new Rect(0, 0, 1, 1), 1, false);
var body2 = new RigidBody(new Rect(0, 0, 1, 0.5), 1, false);
player.position = new Vec2(-3, -5);
body1.position = new Vec2(5, -5);
body2.position = new Vec2(6, -5);

var topWall = new RigidBody(new Rect(0, 0, 10000, 1), 100000000, true);
topWall.position = new Vec2(0, 13);
var bottomWall = new RigidBody(new Rect(0, 0, 10000, 1), 100000000, true);
bottomWall.position = new Vec2(0, -13);
var leftWall = new RigidBody(new Rect(0, 0, 1, 10000), 100000000, true);
leftWall.position = new Vec2(-23, 0);
var rightWall = new RigidBody(new Rect(0, 0, 1, 10000), 100000000, true);
rightWall.position = new Vec2(23, 0);

var platform1 = new RigidBody(new Rect(0, 0, 20, 1), 100000000, true);
platform1.position = new Vec2(-10, -5);
var platform2 = new RigidBody(new Rect(0, 0, 5, 5), 100000000, true);
platform2.position = new Vec2(-15, -2.5);
var platform3 = new RigidBody(new Rect(0, 0, 10, 2), 100000000, true);
platform3.position = new Vec2(17, 7.5);

var rightWall = new RigidBody(new Rect(0, 0, 1, 10000), 100000000, true);
rightWall.position = new Vec2(23, 0);

dynamicBodies = [player, body1, body2];
staticBodies = [leftWall, rightWall, topWall, bottomWall, platform1, platform2, platform3];

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
		player.AddForce(new Vec2(-.4, 0), new Vec2(0, 0));
	if (movement[keybinds.RIGHT])
		player.AddForce(new Vec2(.4, 0), new Vec2(0, 0));
	if (movement[keybinds.UP])
	{
		if (player.canMoveDown == false)
		{			
			player.AddForce(new Vec2(0, 13), new Vec2(0, 0));
		}
	}
	
	//Loop through in 5 steps to really correct the garbage collision at high speeds
	for (i = 0; i < 5; i++)
	{
		dynamicBodies.forEach(dynaBod => {			
			dynaBod.ResetConditions();
			staticBodies.forEach(staticBod => {
				staticBod.Update(dt);
				dynaBod.HandleDynamicCollision(staticBod);
			});	
			dynaBod.Update(dt * 0.2);
		});
	}
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
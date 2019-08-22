
// keybinds
const keybinds = {
	LEFT: 'a',
	RIGHT: 'd',
	UP: 'w',
	DOWN: 's'
}

var movement = {};

// input
document.addEventListener('keydown', function(ev) { return onKey(ev, true);  }, false);
document.addEventListener('keyup',   function(ev) { return onKey(ev, false); }, false);
function onKey(event, isDown)
{
	movement[event.key] = isDown;
}

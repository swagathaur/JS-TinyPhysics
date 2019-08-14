class Rect
{
	constructor(x, y, w, h)
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		console.log("initializing rect");
	}

	Intersects(other)
	{
		return (this.x < other.x + other.w && this.x + this.w > other.x && 
			this.y < other.y + other.h && this.y + this.h > other.y);
	}

	Draw(colour)
	{
		context.fillStyle = colour;
		context.fillRect(this.x, this.y, this.w, this.h);
	}
}
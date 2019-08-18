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

	Draw(colour, positionOffset, pixelsPerUnit)
	{
		context.fillStyle = colour;
		context.fillRect((this.x * pixelsPerUnit) + positionOffset.x, (-this.y * pixelsPerUnit) + positionOffset.y, this.w * pixelsPerUnit, this.h * pixelsPerUnit);
	}
}
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
		context.fillRect((this.x * pixelsPerUnit) + GetCameraOffset().x, (-this.y * pixelsPerUnit) + GetCameraOffset().y, this.w * pixelsPerUnit, this.h * pixelsPerUnit);
	}
	
	DrawSprite(sprite, positionOffset, pixelsPerUnit)
	{
		context.drawImage(sprite, 
			(this.x * pixelsPerUnit) + positionOffset.x,
			(-this.y * pixelsPerUnit) + positionOffset.y,
			this.w * pixelsPerUnit,
			this.h * pixelsPerUnit
		);
	}

	DrawSpriteDithered(sprite, positionOffset, pixelsPerUnit, dither)
	{
		// top half
		context.drawImage(sprite,
			0, 0, sprite.width, sprite.height / 2,
			(this.x * pixelsPerUnit) + positionOffset.x,
			(-this.y * pixelsPerUnit) + positionOffset.y,
			(this.w * pixelsPerUnit),
			(this.h * pixelsPerUnit) / 2
		);

		// bottom half
		context.drawImage(sprite,
			0, sprite.height / 2, sprite.width, sprite.height,
			(this.x * pixelsPerUnit) + positionOffset.x + (dither * pixelsPerUnit),
			(-this.y * pixelsPerUnit) + positionOffset.y + (this.h * pixelsPerUnit / 2),
			(this.w * pixelsPerUnit),
			(this.h * pixelsPerUnit)
		);
	}
}
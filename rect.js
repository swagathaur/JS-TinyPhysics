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

	Draw(colour, rotation = 0)
	{
		context.fillStyle = colour;
		var center = new Vec2((this.x * pixelsPerUnit) + GetCameraOffset().x, (-this.y * pixelsPerUnit) + GetCameraOffset().y)
		//Translate the canvas and rotate to rotate around sprite center
		context.translate(	center.x, 
							center.y);
		context.rotate(rotation* Math.PI / 180);		
		context.translate(	-center.x, 
							-center.y);
		//Draw the rect
		context.fillRect(	center.x - (this.w * .5 * pixelsPerUnit),
							center.y - (this.h * .5 * pixelsPerUnit), 
							this.w * pixelsPerUnit, 
							this.h * pixelsPerUnit);
		//Reset canvas to default transform
		context.setTransform(1, 0, 0, 1, 0, 0);
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
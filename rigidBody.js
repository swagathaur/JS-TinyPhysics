class RigidBody
{
    constructor(colliderRect, mass = 1, lockMovement = false)
    {
        this.collider = colliderRect;
        this.mass = mass;
        
        this.lockMovement = lockMovement;
        
        this.velocity = new Vec2(0, 0);
        
        this.position = new Vec2(0, 0);
        this.rotation = 0;
        this.gravity = new Vec2(0, -40);
        this.drag = 2;
        this.groundedFriction = 3;
        
        this.inverseMass = 1 / mass;
        
        this.canMoveUp = true;
        this.canMoveLeft = true;
        this.canMoveDown = true;
        this.canMoveRight = true;
                
        console.log("Initializing RigidBody");
    }
    
    UpperLeft()
    {
        var upperLeft = Vec2.Add(this.position, new Vec2(-this.collider.w * 0.5, this.collider.h * 0.5));
        return Vec2.RotatePointAroundPivot(upperLeft, this.position, this.rotation);
    }

    UpperRight()
    {        
        var upperRight = Vec2.Add(this.position, new Vec2(this.collider.w * 0.5, this.collider.h * 0.5));
        return Vec2.RotatePointAroundPivot(upperRight, this.position, this.rotation);
    }

    LowerLeft()
    {        
        var lowerLeft = Vec2.Add(this.position, new Vec2(-this.collider.w * 0.5, -this.collider.h * 0.5));
        return Vec2.RotatePointAroundPivot(lowerLeft, this.position, this.rotation);
    }
    
    LowerRight()
    {
        var lowerRight = Vec2.Add(this.position, new Vec2(this.collider.w * 0.5, -this.collider.h * 0.5));
        return Vec2.RotatePointAroundPivot(lowerRight, this.position, this.rotation);
    }

    SetMass(mass)
    {
        this.mass = mass;
        this.inverseMass = 1/mass;
    }

    //Takes a Vec2 that dictates force, and another to dictate the offset from the centre of the body where force should be applied.
    AddForce(force, positionOffset)
    {
        this.velocity.x += force.x / this.mass;
        this.velocity.y += force.y / this.mass;
    }

    HandleDynamicCollision(staticBody)
    {
        if (CheckCollision(this, staticBody) != false)
			{
				var collisionPoint = CheckCollision(this, staticBody);
				if (collisionPoint.y < this.position.y - (this.collider.h * 0.4))
				{
					var yOverlap = (this.position.y - (this.collider.h * 0.5)) - collisionPoint.y;
                    this.position.y -= yOverlap;
                    this.canMoveDown = false;
                }
                if (collisionPoint.y > this.position.y + (this.collider.h * 0.4))
				{
					var yOverlap = (this.position.y + (this.collider.h * 0.5)) - collisionPoint.y;
                    this.position.y -= yOverlap;
                    this.canMoveUp = false;                    
                }
                if (collisionPoint.x < this.position.x - (this.collider.w * 0.4))
				{
					var yOverlap = (this.position.x - (this.collider.w * 0.5)) - collisionPoint.x;
                    this.position.x -= yOverlap;
                    this.canMoveLeft = false;
                }
                if (collisionPoint.x > this.position.x + (this.collider.w * 0.4))
				{
					var yOverlap = (this.position.x + (this.collider.w * 0.5)) - collisionPoint.x;
                    this.position.x -= yOverlap;
                    this.canMoveRight = false;
				}
			}
    }
    
    ResetConditions()
    {
        this.canMoveDown = true;
        this.canMoveUp = true;
        this.canMoveLeft = true;
        this.canMoveRight = true;
    }
    Update(delta)
    {        
        if (!this.canMoveDown)
        {
            if (this.velocity.y <= 0)
                this.velocity.y = 0;
        }
        if (!this.canMoveLeft)
        {
            if (this.velocity.x <= 0)
                this.velocity.x = 0;
        }
        if (!this.canMoveUp)
        {
            if (this.velocity.y >= 0)
                this.velocity.y = 0;
        }
        if (!this.canMoveRight)
        {
            if (this.velocity.x >= 0)
                this.velocity.x = 0;
        }
        
        //Update position
        if (!this.lockMovement)
        {   
            this.AddForce(Vec2.Multiply(Vec2.Multiply(this.gravity, this.mass), delta), new Vec2(0,0))
            this.position = Vec2.Add(this.position, Vec2.Multiply(this.velocity, delta));
        }
        else
        {
            this.velocity = new Vec2(0,0);
        }

        //Move the collider
        this.collider.x = this.position.x;
        this.collider.y = this.position.y;

        //Apply drag and friction
        if (!this.canMoveDown)
            this.velocity = Vec2.Subtract(this.velocity, Vec2.Multiply(this.velocity, this.groundedFriction * delta));
        else
            this.velocity = Vec2.Subtract(this.velocity, Vec2.Multiply(this.velocity, this.drag * delta));
    
        //Turn this off when sprites are done
        if (this.lockMovement)
            this.collider.Draw('#550000', this.rotation);
        else
            this.collider.Draw('#542437', this.rotation);
    }
}
class RigidBody
{
    constructor(colliderRect, mass = 1, resitution = 0.8, lockMovement = false, lockRotation = false)
    {
        this.collider = colliderRect;
        this.mass = mass;
        
        this.lockMovement = lockMovement;
        this.lockRotation = lockRotation;
        
        this.resitution = resitution;
        
        this.velocity = new Vec2(0, 0);
        this.angularVelocity = 0;
        
        this.position = new Vec2(0, 0);
        this.rotation = 0;
        this.gravity = new Vec2(0, -9.81);
        
        this.inverseMass = 1 / mass;
        
        this.RecalulateInertia();
        
        console.log("Initializing RigidBody");
    }
    
    UpperLeft()
    {
        sinVal = Math.sin(this.rotation);
        cosVal = Math.cos(this.rotation);
        x = -this.collider.w * 0.5;
        y = this.collider.h * 0.5;
        return new Vec2(this.position.x + (x * cosVal) - (y * sinVal), this.position.y + (y * cosVal) + (x * sinVal));
    }

    UpperRight()
    {
        sinVal = Math.sin(this.rotation);
        cosVal = Math.cos(this.rotation);
        x = this.collider.w * 0.5;
        y = this.collider.h * 0.5;
        return new Vec2(this.position.x + (x * cosVal) - (y * sinVal), this.position.y + (y * cosVal) + (x * sinVal));
    }

    LowerLeft()
    {
        sinVal = Math.sin(this.rotation);
        cosVal = Math.cos(this.rotation);
        x = -this.collider.w * 0.5;
        y = -this.collider.h * 0.5;
        return new Vec2(this.position.x + (x * cosVal) - (y * sinVal), this.position.y + (y * cosVal) + (x * sinVal));
    }
    
    LowerRight()
    {
        sinVal = Math.sin(this.rotation);
        cosVal = Math.cos(this.rotation);
        x = this.collider.w * 0.5;
        y =  -this.collider.h * 0.5;

        return new Vec2(this.position.x + (x * cosVal) - (y * sinVal), this.position.y + (y * cosVal) + (x * sinVal));
    }

    SetMass(mass)
    {
        this.mass = mass;
        this.inverseMass = 1/mass;
    }
    
    RecalulateInertia()
    {        
        //Calculating moment of inertia of a box
        //https://uploads.toptal.io/blog/image/774/toptal-blog-image-1421917331379.png
        this.inertia = (this.mass * ((this.collider.w * this.collider.w) + (this.collider.h * this.collider.h))) / 12;
    }

    //Takes a Vec2 that dictates force, and another to dictate the offset from the centre of the body where force should be applied.
    AddForce(force, positionOffset)
    {
        this.velocity.x += force.x / this.mass;
        this.velocity.y += force.y / this.mass;

        this.AddTorque(force, positionOffset);
    }

    AddTorque(force, positionOffset)
    {
        var torque = (force.y * positionOffset.x) - (force.x * positionOffset.y);
        this.angularVelocity += -torque / (this.inertia);
    }

    //Takes a Vec2 that dictates the offset from the centre of the body.
    GetTorque(distanceFromCentre) 
    {
        return Math.Cross(distanceFromCentre.x, distanceFromCentre.y, angularVelocity);
    }
    
    Update(delta)
    {
        this.AddForce(Vec2.Multiply(Vec2.Multiply(this.gravity, this.mass), delta), new Vec2(0,0))
        this.position = Vec2.Add(this.position, Vec2.Multiply(this.velocity, delta));
        this.rotation += this.angularVelocity * delta;
        
        this.collider.x = this.position.x;
        this.collider.y = this.position.y;

        //Turn this off when sprites are done
        this.collider.Draw('#550000', this.rotation);
    }
}
class RigidBody
{
    constructor(mass = 1, resitution = 0.8, lockMovement = false, lockRotation = false)
    {
        this.mass = mass;
        this.inverseMass = 1 / mass;
        
        this.lockMovement = lockMovement;
        this.lockRotation = lockRotation;
        
        this.resitution = resitution;

        this.velocity = new Vec2(0, 0);
        this.angularVelocity = 0;

        this.position = new Vec2(0, 0);
        this.rotation = 0;
        this.gravity = new Vec2(0, -9.81);
        
		console.log("Initializing RigidBody");
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

    //Takes a Vec2 that dictates the offset from the centre of the body.
    GetTorque(distanceFromCentre) 
    {
        return Math.Cross(distanceFromCentre.x, distanceFromCentre.y, angularVelocity);
    }
    
    UpdateForces(delta)
    {
        this.AddForce(Vec2.Multiply(Vec2.Multiply(this.gravity, this.mass), delta), new Vec2(0,0))
        this.position = Vec2.Add(this.position, Vec2.Multiply(this.velocity, delta));
        this.rotation += this.angularVelocity * delta;
    }
}
class RigidBody
{
    gravity = Vec2(0, -10)

    constructor(mass = 1, resitution = 0.8, lockMovement = false, lockRotation = false)
    {
        this.mass = mass;
        this.inverseMass = 1 / mass;
        
        this.lockMovement = lockMovement;
        this.lockRotation = lockRotation;
        
        this.resitution = resitution;

        this.inertia = 0;
        this.inverseInertia = 0;

        this.velocity = Vec2(0, 0);
        this.acceleration = Vec2(0, 0);
        this.force = Vec2(0,0);

        this.angularVelocity = 0;
        this.angularAcceleration = 0;
        
		console.log("Initializing RigidBody");
    }
    
    SetMass(mass)
    {
        this.mass = mass;
        this.inverseMass = 1/mass;
    }

    GetForce()
    {
        this.force = this.mass * this.acceleration;
    }

    GetTorque(distanceFromCentre) 
    {
        return Math.Cross(distanceFromCentre.x, distanceFromCentre.y, angularVelocity);
    }
    
    UpdateForces(delta)
    {
        velocity += force * inverseMass * delta;
        angularVelocity += angularAcceleration * this.inverseMass * delta;
    }
}
class RigidBody
{
    constructor(colliderRect, mass = 1, restitution = 0.8, lockMovement = false, lockRotation = false)
    {
        this.collider = colliderRect;
        this.mass = mass;
        
        this.lockMovement = lockMovement;
        this.lockRotation = lockRotation;
        
        this.restitution = restitution;
        
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

    GetAxis()
    {
        var axis = [];
        axis[0] = Vec2.Subtract(this.UpperRight(), this.UpperLeft());
        axis[1] = Vec2.Subtract(this.UpperRight(), this.LowerRight());
        axis[2] = Vec2.Subtract(this.LowerLeft(), this.LowerRight());
        axis[3] = Vec2.Subtract(this.LowerLeft(), this.UpperLeft());
        return axis;
    }
    
    GetMinMaxProjections(axis)
    {
        projections = [Vec2.Project(UpperRight, axis),
            Vec2.Project(UpperLeft, axis),
            Vec2.Project(LowerRight, axis),
            Vec2.Project(LowerLeft, axis)];
            projections.sort(function (lhs, rhs) {
                Dot(lhs, axis) - Dot(rhs, axis)
            })
        return [projections[0], projections[3]];
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
        //this.AddForce(Vec2.Multiply(Vec2.Multiply(this.gravity, this.mass), delta), new Vec2(0,0))
        this.position = Vec2.Add(this.position, Vec2.Multiply(this.velocity, delta));
        this.rotation += this.angularVelocity * delta;
        
        this.collider.x = this.position.x;
        this.collider.y = this.position.y;

        //Turn this off when sprites are done
        this.collider.Draw('#550000', this.rotation);
    }
}
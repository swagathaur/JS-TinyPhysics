function HandleCollision(body1, body2)
{
    /*
    Axis1 = A.UR - A.UL
    Axis2 = A.UR - A.LR
    Axis3 = B.UL - B.LL
    Axis4 = B.UL - B.UR
    */
   
    axis1 = Vec2.Subtract(body1.UpperRight(), body1.UpperLeft())
    axis2 = Vec2.Subtract(body1.UpperRight(), body1.LowerRight())
    axis3 = Vec2.Subtract(body2.UpperLeft(), body2.LowerLeft())
    axis4 = Vec2.Subtract(body2.UpperLeft(), body2.UpperRight())
        
    //Set these up for use later, to find the collision point.
    colProjections =[
        new Vec2(0,0),
        new Vec2(0,0),
        new Vec2(0,0),
        new Vec2(0,0)];

    //Get scalars for axis body1 and body2
    //X = Min, Y = Max
    //If Body1Max < Body2Min on any axis, no colision is occuring.
    results1 = GetScalars(body1, axis1);
    b1Scalar = results1[0];
    results2 = GetScalars(body2, axis1);
    b2Scalar = results2[0];
    
    if (!CheckScalarCrossover(b1Scalar, b2Scalar))
        return;
    if (b1Scalar.x < b2Scalar.x)
        colProjections[0] = GetCentrePoint(results1[2], results2[1]);
    else
        colProjections[0] = GetCentrePoint(results1[1], results2[2]);
        
    results1 = GetScalars(body1, axis2);
    b1Scalar = results1[0];
    results2 = GetScalars(body2, axis2);
    b2Scalar = results2[0];
    
    if (!CheckScalarCrossover(b1Scalar, b2Scalar))
        return;
    if (b1Scalar.x < b2Scalar.x)
        colProjections[1] = GetCentrePoint(results1[2], results2[1]);
    else
        colProjections[1] = GetCentrePoint(results1[1], results2[2]);

    results1 = GetScalars(body1, axis3);
    b1Scalar = results1[0];
    results2 = GetScalars(body2, axis3);
    b2Scalar = results2[0];
    
    if (!CheckScalarCrossover(b1Scalar, b2Scalar))
        return;
    if (b1Scalar.x < b2Scalar.x)
        colProjections[2] = GetCentrePoint(results1[2], results2[1]);
    else
        colProjections[2] = GetCentrePoint(results1[1], results2[2]);

    results1 = GetScalars(body1, axis4);
    b1Scalar = results1[0];
    results2 = GetScalars(body2, axis4);
    b2Scalar = results2[0];
    
    if (!CheckScalarCrossover(b1Scalar, b2Scalar))
        return;
    if (b1Scalar.x < b2Scalar.x)
        colProjections[3] = GetCentrePoint(results1[2], results2[1]);
    else
        colProjections[3] = GetCentrePoint(results1[1], results2[2]);

    console.log("There is a collision");

    //Prep values for averaging out the collision point.
    //This is probably not 100% perfect, im just winging it here.
    collisionPoint = GetCentre(colProjections);
    collisionNormal = Vec2.Subtract(body2.position, body1.position); //This is actually for spheres, should fix later.
    console.log(collisionPoint);
    ResolveCollision(body1, body2, collisionPoint, collisionNormal);
}

function ResolveCollision(body1, body2, collisionPoint, collisionNormal)
{
    //Bad resolution, dlt this
    body1.position = Vec2.Subtract(body1.position, Vec2.Multiply(body1.velocity, 0.02));
    body2.position = Vec2.Subtract(body2.position, Vec2.Multiply(body2.velocity, 0.02));

    //Get the correct restitution value for bounce
    restitution = body1.restitution > body2.restitution ? body2.restitution : body1.restitution;

    //Get the relative velocity for the collision
    relativeVelocity = Vec2.Subtract(body2.velocity, body1.velocity);
    velocityAlongNormal = Dot(relativeVelocity, collisionNormal);

    //Calculate the impact scale using the uh, directness of impact (velocity along the normal)
    impulseScale = velocityAlongNormal * restitution;
    
    body1.AddForce(Vec2.Multiply(collisionNormal, impulseScale), collisionPoint);
    body2.AddForce(Vec2.Multiply(collisionNormal, -impulseScale), collisionPoint);
}

function GetCentre(points)
{
    totalX = 0;
    totalY = 0;
    totalPoints = 0;

    points.forEach(point => {
        totalX += point.x;
        totalY += point.y;
        totalPoints += 1;
    });

    return new Vec2(totalX / totalPoints, totalY / totalPoints);
}

function GetCentrePoint(point1, point2)
{
    return Vec2.Add(Vec2.Multiply(Vec2.Subtract(point2, point1), 0.5), point1);
}

function CheckScalarCrossover(scalar1, scalar2)
{
    if (scalar1.x < scalar2.x)
        return scalar1.y > scalar2.x;
    return scalar2.y > scalar1.x;
}

//Will return three vectors.
//[0] = A vector where x portrays the minScalar value and y is the maxScalar value.
//[1] = this minimum point projected on the axis from the body, ordered by scalar.
//[2] = this maximum point projected on the axis from the body, ordered by scalar.
function GetScalars(body, axis)
{
    projections = [
        Vec2.Project(body.UpperLeft(), axis),
        Vec2.Project(body.UpperRight(), axis),
        Vec2.Project(body.LowerLeft(), axis),
        Vec2.Project(body.LowerRight(), axis)];
    minScalar = 100000000000;
    maxScalar = -100000000000;
    minVec = projections[0];
    maxVec = projections[0];

    scalars = [Dot(projections[0], axis), Dot(projections[1], axis), Dot(projections[2], axis), Dot(projections[3], axis)]
    iterator = 0;
    scalars.forEach(function(scalar)
    {
        if (scalar < minScalar)
        {
            minScalar = scalar;
            minVec = projections[iterator];
        }
        if (scalar > maxScalar)
        {
            maxScalar = scalar;          
            maxVec = projections[iterator];   
        }
    });
    return [new Vec2(minScalar, maxScalar), minVec, maxVec];
}
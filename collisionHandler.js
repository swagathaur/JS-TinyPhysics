function HandleColision(body1, body2)
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
    
    //Get scalars for axis body1 and body2
    //X = Min, Y = Max
    //If Body1Max < Body2Min on any axis, no colision is occuring.
    a1b1Scalar = GetScalars(body1, axis1);
    a1b2Scalar = GetScalars(body2, axis1);
    if (!CheckScalarCrossover(a1b1Scalar, a1b2Scalar))
        return;

    a2b1Scalar = GetScalars(body1, axis2);
    a2b2Scalar = GetScalars(body2, axis2);
    if (!CheckScalarCrossover(a2b1Scalar, a2b2Scalar))
        return;

    a3b1Scalar = GetScalars(body1, axis3);
    a3b2Scalar = GetScalars(body2, axis3);
    if (!CheckScalarCrossover(a3b1Scalar, a3b2Scalar))
        return;
        
    a4b1Scalar = GetScalars(body1, axis4);
    a4b2Scalar = GetScalars(body2, axis4);
    if (!CheckScalarCrossover(a4b1Scalar, a4b2Scalar))
        return;

    console.log("Their is a collision");
}

function CheckScalarCrossover(scalar1, scalar2)
{
    if (scalar1.x < scalar2.x)
        return scalar1.y > scalar2.x;
    return scalar2.y > scalar1.x;
}

function GetScalars(body, axis)
{
    Prj1 = Vec2.Project(body.UpperLeft(), axis);
    Prj2 = Vec2.Project(body.UpperRight(), axis);
    Prj3 = Vec2.Project(body.LowerLeft(), axis);
    Prj4 = Vec2.Project(body.LowerRight(), axis);
    minScalar = 100000000000;
    maxScalar = -100000000000;

    scalars = [Dot(Prj1, axis), Dot(Prj2, axis), Dot(Prj3, axis), Dot(Prj4, axis)]
    
    scalars.forEach(function(scalar)
    {
        if (scalar < minScalar)
            minScalar = scalar;
        if (scalar > maxScalar)
            maxScalar = scalar; 
    });
    return new Vec2(minScalar, maxScalar);
}
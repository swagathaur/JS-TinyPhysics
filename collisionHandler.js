function CheckColision(body1, body2)
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
    
    //Get scalers for axis body1 and body2
        //Check if min > max
        //repeat till gap found
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
    
    foreach (scalar in scalars)
    {

        if (scalar < minScalar)
        minScalar = scalar;
        if (scalar > maxScalar)
        maxScalar = scalar;        
    }
    return new Vec2(minScalar, maxScalar);
}
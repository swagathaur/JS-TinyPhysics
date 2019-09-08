function CheckCollision(body1, body2)
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
        return false; 
    colProjections[0] = GetCentrePoint(results1[1], results1[2], results2[1], results2[2], axis4);
        
    results1 = GetScalars(body1, axis2);
    b1Scalar = results1[0];
    results2 = GetScalars(body2, axis2);
    b2Scalar = results2[0];
    
    if (!CheckScalarCrossover(b1Scalar, b2Scalar))
        return false;
    colProjections[1] = GetCentrePoint(results1[1], results1[2], results2[1], results2[2], axis2);

    results1 = GetScalars(body1, axis3);
    b1Scalar = results1[0];
    results2 = GetScalars(body2, axis3);
    b2Scalar = results2[0];
    
    if (!CheckScalarCrossover(b1Scalar, b2Scalar))
        return false;
    colProjections[2] = GetCentrePoint(results1[1], results1[2], results2[1], results2[2], axis3);

    results1 = GetScalars(body1, axis4);
    b1Scalar = results1[0];
    results2 = GetScalars(body2, axis4);
    b2Scalar = results2[0];
    
    if (!CheckScalarCrossover(b1Scalar, b2Scalar))
        return false;
        
    colProjections[3] = GetCentrePoint(results1[1], results1[2], results2[1], results2[2], axis4);
    //console.log("There is a collision");
    return GetCentre(colProjections);
}
function GetCentre(points)
{
    var vec1 = Vec2.Add(points[0], points[1]);
    var vec2 = Vec2.Add(points[2], points[3]);
    var centre = Vec2.Add(vec1, Vec2.Multiply(Vec2.Subtract(vec2, vec1), 0.5))
    return centre;
}

function GetCentrePoint(point1, point2, point3, point4, axis)
{
    var points = [point1, point2, point3, point4];
    points.sort(function (a, b) {
        return Dot(a, axis) - Dot(b, axis);
    });
    //Sort the points based off Dot(point, axis)
    //Return the midpoint between the 2nd and 3rd points in the sorted list.
    return Vec2.Add(Vec2.Multiply(Vec2.Subtract(points[2], points[1]), 0.5), points[1]);
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
        iterator++;
    });
    return [new Vec2(minScalar, maxScalar), minVec, maxVec];
}
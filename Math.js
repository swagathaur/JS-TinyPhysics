class Vec2
{
    constructor (x, y)
    {
        this.x = x;
        this.y = y;
    }

    //Adds two vectors
    static Add(lhs, rhs)
    {
        return new Vec2(lhs.x + rhs.x, lhs.y + rhs.y);
    }
    //Subtracts two vectors
    static Subtract(lhs, rhs)
    {
        return new Vec2(lhs.x - rhs.x, lhs.y - rhs.y);
    }

    //Multiplies vector by the given num
    static Multiply(lhs, rhs)
    {
        return new Vec2(lhs.x *rhs, lhs.y * rhs);
    }
    //Divides vectors by the given num
    static Divide(lhs, rhs)
    {
        return new Vec2(lhs.x / rhs, lhs.y / rhs);
    }

    static RotatePointAroundPivot(point, pivot, rotation)
    {
        var sinVal = Math.sin(rotation);
        var cosVal = Math.cos(rotation);

        var translatedPoint = Vec2.Subtract(pivot, point);
        translatedPoint = new Vec2( (translatedPoint.x * cosVal) - (translatedPoint.y * sinVal),
                                    (translatedPoint.x * sinVal) + (translatedPoint.y * cosVal))                                    
        return Vec2.Add(translatedPoint, pivot);
    }

    //Projects a given point onto a directional vector
    static Project(point, direction)
    {
        var proj = new Vec2(
            ( (point.x*direction.x + point.y*direction.y) / (direction.x*direction.x + direction.y*direction.y) ) * direction.x,
            ( (point.x*direction.x + point.y*direction.y) / (direction.x*direction.x + direction.y*direction.y) ) * direction.y)
        return proj;
    }

    static Distance(point1, point2)
    {
        var betweenVec = Vec2.Subtract(point2, point1);
        return betweenVec.Magnitude();
    }
    Magnitude()
    {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
}
function Dot(lhs, rhs)
{
    return (lhs.x * rhs.x) + (lhs.y * rhs.y);
}

function Cross(ax, ay, bx, by)
{
    return (ax * by) - (ay * bx);
}

function Cross(ax, ay, scaler)
{
    return new Vec2(scaler * ay, -scaler * ax) ;
}

function Cross(scaler, ax, ay)
{
    return new Vec2(-scaler * ay, scaler * ax) ;
}

function Distance(vecA, vecB)
{
    return Math.sqrt((vecA.x - vecB.x)^2 + (vecA.y - vecB.y)^2);
}
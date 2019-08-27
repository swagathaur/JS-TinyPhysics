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

    //Projects a given point onto a directional vector
    static Project(point, direction)
    {
        tempVal = Vec2.Dot(point, direction) / 
                ((direction.x * direction.x) + (direction.y * direction.y));
        return Vec2.Multiply(direction, tempVal)
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
    return Vec2(s * ay, -s * ax) ;
}

function Cross(scaler, ax, ay)
{
    return Vec2(-s * ay, s * ax) ;
}

function Distance(vecA, vecB)
{
    return Math.sqrt((vecA.x - vecB.x)^2 + (vecA.y - vecB.y)^2);
}
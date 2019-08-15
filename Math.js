class Vec2
{
    constructor (x, y)
    {
        this.x = x;
        this.y = y;
    }
}

Cross(ax, ay, bx, by)
{
    return (ax * by) - (ay * bx)
}

Cross(ax, ay, scaler)
{
    return Vec2(s * ay, -s * ax) 
}

Cross(scaler, ax, ay)
{
    return Vec2(-s * ay, s * ax) 
}

Distance(vecA, vecB)
{
    return Math.sqrt((vecA.x - vecB.x)^2 + (vecA.y - vecB.y)^2)
}
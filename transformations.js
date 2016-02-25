PolyK.translate = function(p, x, y)
{
    var A = [];
    for(var i = 0; i < p.length/2; i++) A.push([x,y]);
    newP = PolyK.unflatten(p);
    return PolyK.flatten(math.add(newP, A));
}

PolyK.scale = function(p, scaleX, scaleY)
{
    var box = PolyK.GetAABB(p);
    var A = [[scaleX, 0], [0, scaleY]];
    p = math.multiply(PolyK.unflatten(p), A);
    p = PolyK.translate(PolyK.flatten(p), (box.x+box.width/2)*(-scaleX+1), (box.y+box.height/2)*(-scaleX+1));
    return p;
}

PolyK.rotate = function(p, theta, x, y)
{
    if (!x)
    {
        var box = PolyK.GetAABB(p);
        p = PolyK.translate(p, -box.x-box.width/2, -box.y-box.height/2);
        var A = [[math.cos(theta), -math.sin(theta)], [math.sin(theta), math.cos(theta)]];
        p = math.multiply(PolyK.unflatten(p), A)
        p = PolyK.translate(PolyK.flatten(p), box.x+box.width/2, box.y+box.height/2);
    }
    else
    {
        p = PolyK.translate(p, -x, -y);
        var A = [[math.cos(theta), -math.sin(theta)], [math.sin(theta), math.cos(theta)]];
        p = math.multiply(PolyK.unflatten(p), A)
        p = PolyK.translate(PolyK.flatten(p), x, y);
    }
    return p;
}

PolyK.unflatten = function(p)
{
    var newP = [];
    for(var i = 0; i < p.length; i += 2)
    {
        newP.push(p.slice(i,i+2));
    }
    return newP;
}

PolyK.flatten = function(p)
{
    return [].concat.apply([], p);
}
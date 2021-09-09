function verificarValidade(poligono,pindex)
{
    let pontos = [...poligono.pontos];
    let pular1;
    let pular2;
    let pular3;
    if(pontos.length<3)
    {
        return false;
    }
    let r1,r2;
    if(pindex==0)
    {
        r1 = new LineSegment(pontos[pontos.length-1],pontos[0])
        r2 = new LineSegment(pontos[0],pontos[1])
    }
    else if(pindex==pontos.length-1)
    {
        r1 = new LineSegment(pontos[pontos.length-2],pontos[pontos.length-1])
        r2 = new LineSegment(pontos[pontos.length-1],pontos[0])
    }
    else
    {
        r1 = new LineSegment(pontos[pindex-1],pontos[pindex])
        r2 = new LineSegment(pontos[pindex],pontos[pindex+1])
    }
    //console.log(pular1,pular2,pular3);



    for(let i=0;i<pontos.length;i++)
    {
        let pularR1 = false, pularR2 = false;
        let ic1 = (i)
        let ic2 = (i+1>pontos.length-1) ? 0:i+1; 

        if(retaContemPonto(r1,pontos[ic1])||retaContemPonto(r1,pontos[ic2]))
        {
            pularR1 = true;
        }
        
        if(retaContemPonto(r2,pontos[ic1])||retaContemPonto(r2,pontos[ic2]))
        {
            pularR2 = true;
        }
        r3 = new LineSegment(pontos[ic1],pontos[ic2]);

        let verificacao1 =false;
        let verificacao2 =false;
        if(!pularR1)
        {verificacao1 = r1.intersectAndInside(r3)};
        if(!pularR2)
        {verificacao2 = r2.intersectAndInside(r3)};
        if(verificacao1)
        {
            poligono.retasIntersectantes.push(r1,r3)
            return false;
        }
        if(verificacao2)
        {
            poligono.retasIntersectantes.push(r2,r3)
            return false;
        }
    }
    return true;
}
function retaContemPonto(r1,p)
{
    if(p.x==r1.P1.x && p.y==r1.P1.y) return true;
    if(p.x == r1.P2.x && p.y == r1.P2.y) return true;
    return false;
}
function verificarPoligonosDoConjunto(poligonos,propriedadesGlobais)
{
    let valido = true;
    for (let poligono of poligonos)
    {
        poligono.isValid = true;
        for(let i=0;i<poligono.pontos.length;i++)
        {
            if(!verificarValidade(poligono,i))
            {
                poligono.isValid = false;
                valido = false;
            }
        }
    }
    return valido;
}
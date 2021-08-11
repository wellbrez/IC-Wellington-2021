//let IPs = [];
function LineSegment(P1,P2)
{
    this.P1 = P1;
    this.P2 = P2;
    this.size = ((P1.x - P2.x)**2+(P1.y-P2.y)**2);
    this.difx = P1.x-P2.x;
    this.dify = P1.y-P2.y;
    this.angulo;
    this.isInside = function(Pti)
    {
        const ux = this.difx;
        const uy = this.dify;
        const vx = Pti[0]-this.P2.x;
        const vy = Pti[1]-this.P2.y;
        const produto = ux*vx + uy*vy
         
        if(produto<0) return false;
        if(produto>this.size) return false;
        return true;

    }
    this.intersecaoInvalida = function(Pti,L2)
    {
        const ux = this.difx;
        const uy = this.dify;
        const vx = Pti[0]-this.P2.x;
        const vy = Pti[1]-this.P2.y;
        const produto = ux*vx + uy*vy
        if(produto<0) return false;
        if(produto>this.size) return false;
        const u2x = L2.difx;
        const u2y = L2.dify;
        const v2x = Pti[0]-L2.P2.x;
        const v2y = Pti[1]-L2.P2.y;
        const produto2 = u2x*v2x+u2y*v2y;
        if(produto2<0) return false;
        if(produto2>L2.size) return false;
        return true;         
    }
    this.intersectAndInside = function(linha)
    {
        const P3 = linha.P1;
        const P4 = linha.P2;
        const IP = this.intersect(P3,P4);
        if(IP)
        {
            return this.intersecaoInvalida(IP,linha);
        }
        if(!IP)
        {
            return false;
        }
    }
    this.intersect = function(P3,P4)
    {
        const dif2x = P3.x-P4.x;
        const dif2y = P3.y-P4.y;
        let a,a2,b,b2,x,y;
        if(this.difx===0)
        {
            x= this.P1.x;
            a = Infinity;
        }
        else
        {
            a = (this.dify/this.difx)
            b = this.P1.y - a*this.P1.x;
        }
        if(dif2x===0)
        {
            x = P3.x;
            a2 = Infinity
        }
        else
        {
            a2 = (dif2y/dif2x)
            b2 = P3.y - a2*P3.x;
        }
        if(a===a2) return false;
        if(a==Infinity)
        {
            y=a2*x+b2
        }
        else if(a2==Infinity)
        {
            y=a*x+b
        }
        else
        {
            x = (b2-b)/(a-a2)
            y = a*x+b
        }
        return [x,y];
    }
}

function PVector(x,y)
{
    this.x = x;
    this.y = y;
    this.xOriginal = x;
    this.yOriginal = y;
    this.rotacionar = function(ang)
    {
        let xAnterior = this.x;
        let yAnterior = this.y;
        this.x = xAnterior * Math.cos(ang) - yAnterior * Math.sin(ang),
        this.y = xAnterior * Math.sin(ang) + yAnterior * Math.cos(ang)
    }
    this.produtoVetorial = function(p2)
    {
        return this.x*p2.y - p2.x*this.y
    }
}
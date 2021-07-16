let SohArea1 = new Polygon("SohArea1");
let SohArea2 = new Polygon("SohArea2");
let mostrarLN = false;
function modoLN ()
{
    mostrarLN = !mostrarLN;
    if(!mostrarLN)
    {
        document.getElementById("AreaSapata").innerHTML = "";
    }
}
function desenharLN(mx,my,A,Ix,Iy)
{  
    if(poligonos[0].pontos.length==0) return;
    if(my!=0)
    {
        
        let Pab = new PVector(posicao_do_pixel_x(mx),posicao_do_pixel_y(my));
        Pab.x -= centroideGlobalX;
        Pab.y -= centroideGlobalY;
        Pab.rotacionar(-anguloGlobal);
        let a = Pab.x;
        let b = Pab.y; 


        let x0 = -200;
        let xmax = 200;

        //   1/A + a*x/Iy + b*y/Ix = 0

        let y0 =(-1/A -a*x0/Iy)*Ix/b ;
        let ymax =(-1/A -a*xmax/Iy)*Ix/b ;

        let P1 = new PVector(x0,y0);
        let P2 = new PVector(xmax,ymax);
        P1.rotacionar(anguloGlobal);
        P2.rotacionar(anguloGlobal);
        P1.x += centroideGlobalX;
        P2.x += centroideGlobalX;
        P1.y += centroideGlobalY;
        P2.y += centroideGlobalY;

        const copiaDosPontos = [...poligonos[0].pontos];
        copiaDosPontos.push(copiaDosPontos[0]);
        SohArea1.pontos = [];
        SohArea2.pontos = [];
        const armazemDePontos1 = [];
        const armazemDePontos2 = [];
        let umIntercept = false;
        for(let i=0;i<copiaDosPontos.length-1;i++)
        {
            if(!umIntercept)
            {
                SohArea1.pontos.push(copiaDosPontos[i]);
                armazemDePontos2.push(copiaDosPontos[i]);
            }
            else if(umIntercept)
            {
                armazemDePontos1.push(copiaDosPontos[i]);
                SohArea2.pontos.push(copiaDosPontos[i]);
            }
            if(umIntercept && i>=copiaDosPontos.length-2)
            {
                SohArea2.pontos.concat(armazemDePontos2);
                SohArea1.pontos.concat(armazemDePontos1);
            }
            const segment = new LineSegment(copiaDosPontos[i],copiaDosPontos[i+1]);
            const intercept = segment.intersect(P1,P2);
            

            if(intercept && segment.isInside(intercept))
            {
                umIntercept = !umIntercept;
                SohArea1.pontos.push(new ponto(intercept[0],intercept[1]));
                SohArea2.pontos.push(new ponto(intercept[0],intercept[1]));
                sketch.ellipse(pixelX(intercept[0]),pixelY(intercept[1]),20,20);
            }
        }
        return [a,b]

       /* let x1 = pixelX(P1.x);
        let y1 = pixelY(P1.y);
        let x2 = pixelX(P2.x);
        let y2 = pixelY(P2.y);
        sketch.line(x1,y1,x2,y2);*/
    }        

}



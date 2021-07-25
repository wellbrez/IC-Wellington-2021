let PoligonosAreaTracionada = [];
let PoligonosAreaComprimida = [];
let mostrarLN = false;
function modoLN ()
{
    mostrarLN = !mostrarLN;
    if(!mostrarLN)
    {
        document.getElementById("AreaSapata").innerHTML = "";
    }
}
function desenharLN(mx,my,A,Ix,Iy,poligonos,conjunto)
{  
    PoligonosAreaTracionada = [];
    PoligonosAreaComprimida = [];
    let a=0,b=0;
    for(let poligono of poligonos)
    {
        let SohArea1 = new Polygon();
        let SohArea2 = new Polygon();
        let vetorLN;
        
        if(my!=0)
            {
            
            let Pab = new PVector(posicao_do_pixel_x(mx),posicao_do_pixel_y(my));
            
            Pab.x -= conjunto.centroideGlobalX;
            Pab.y -= conjunto.centroideGlobalY;
            Pab.rotacionar(-conjunto.anguloGlobal);
            a = Pab.x;
            b = Pab.y;


            let x0 = -200;
            let xmax = 200;

            //   1/A + a*x/Iy + b*y/Ix = 0

            let y0 =(-1/A -a*x0/Iy)*Ix/b ;
            let ymax =(-1/A -a*xmax/Iy)*Ix/b ;
            

            let P1 = new PVector(x0,y0);
            let P2 = new PVector(xmax,ymax);
            P1.rotacionar(conjunto.anguloGlobal);
            P2.rotacionar(conjunto.anguloGlobal);
            P1.x += conjunto.centroideGlobalX;
            P2.x += conjunto.centroideGlobalX;
            P1.y += conjunto.centroideGlobalY;
            P2.y += conjunto.centroideGlobalY;
            vetorInicioLN = new PVector(P2.x,P2.y);
            vetorLN = new PVector(P1.x-P2.x,P1.y-P2.y);

            const copiaDosPontos = [...poligono.pontos];
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
                    SohArea1.LN.push({x:intercept[0],y:intercept[1]});
                    SohArea2.LN.push({x:intercept[0],y:intercept[1]});
                }
                
            }

            calcular_propriedades(SohArea1)
            calcular_propriedades(SohArea2)
            let comprimido = 1;
            if(SohArea1.area!=0)
            {
                let vetorCentroide = new PVector(SohArea1.centroideX - vetorInicioLN.x,SohArea1.centroideY-vetorInicioLN.y)
                let resultado = vetorCentroide.x*vetorLN.y - vetorLN.x*vetorCentroide.y;
                comprimido = (resultado>0)? 1:2

            }
            else if(SohArea2.area!=0)
            {
                let vetorCentroide = new PVector(SohArea2.centroideX -vetorInicioLN.x ,SohArea2.centroideY-vetorInicioLN.y)
                let resultado = vetorCentroide.x*vetorLN.y - vetorLN.x*vetorCentroide.y;
                comprimido = (resultado>0)? 2:1
            }
            if(comprimido==1)
            {
                PoligonosAreaComprimida.push(SohArea1)
                PoligonosAreaTracionada.push(SohArea2)
            }
            else
            {
                PoligonosAreaComprimida.push(SohArea2)
                PoligonosAreaTracionada.push(SohArea1)
            }

            
            

       /* let x1 = pixelX(P1.x);
        let y1 = pixelY(P1.y);
        let x2 = pixelX(P2.x);
        let y2 = pixelY(P2.y);
        sketch.line(x1,y1,x2,y2);*/
        }       
        
        
    }
    return [a,b] 
    

}


function LN(p)
    {
        let i=0;

		recursivaLN(propriedadesGlobais,poligonos,p,i);
    }
    function recursivaLN(prop,poligonosCompr,p,iteracao,a=0,b=0)
    {
        iteracao++;
        if(iteracao>10) return;
        propriedadesAreaComprimida = {...prop};
		poligonosComprimidos = [...poligonosCompr];
        
        if(!a && !b)
        {
            [a,b] = desenharLN(p.mouseX,p.mouseY,propriedadesAreaComprimida.areaTotal,propriedadesAreaComprimida.IxPrincipal,propriedadesAreaComprimida.IyPrincipal,poligonosComprimidos,propriedadesAreaComprimida);
        }
        else
        {
            desenharLN(p.mouseX,p.mouseY,propriedadesAreaComprimida.areaTotal,propriedadesAreaComprimida.IxPrincipal,propriedadesAreaComprimida.IyPrincipal,poligonosComprimidos,propriedadesAreaComprimida);
        }
        let areaTotalTracionada=0;
			for(poligono of PoligonosAreaTracionada)
			{
				areaTotalTracionada+=poligono.area;
			}
			if(areaTotalTracionada/propriedadesAreaComprimida.areaTotal>0.5)
			{
				[PoligonosAreaTracionada, PoligonosAreaComprimida] = [PoligonosAreaComprimida,PoligonosAreaTracionada];
			}
            if(areaTotalTracionada == propriedadesAreaComprimida.areaTotal || areaTotalTracionada==0) return;
			for(let poligono of PoligonosAreaTracionada)
			{
                poligono.poligonos = PoligonosAreaTracionada;
                poligono.conjunto = propriedadesAreaTracionada;
                poligono.nome = "Tracionado"
				poligono.atualizarPropriedades();
				poligono.color = "rgba(255,0,0,.4)";
				poligono.desenhar();
			}
			for(let poligono of PoligonosAreaComprimida)
			{
                poligono.poligonos = PoligonosAreaComprimida;
                poligono.conjunto = propriedadesAreaComprimida;
                poligono.nome = "Comprimido"
				poligono.atualizarPropriedades();
				poligono.color = "rgba(0,255,0,.4)";
				poligono.desenhar();
			}
            if(-propriedadesAreaComprimida.areaTotal+prop.areaTotal<=0.1)
            {
                sketch.fill("white");
			    sketch.strokeWeight(0);
			    sketch.text(`a: ${a.toFixed(2)}`,correcaoPixelX(sketch.mouseX),correcaoPixelY(sketch.mouseY)-20)
			    sketch.text(`b: ${-b.toFixed(2)}`,correcaoPixelX(sketch.mouseX),correcaoPixelY(sketch.mouseY))
                document.getElementById("AreaSapata").innerText = (propriedadesAreaComprimida.areaTotal/propriedadesGlobais.areaTotal*100).toFixed(2)+"%"
                return;
            }
            recursivaLN(propriedadesAreaComprimida,PoligonosAreaComprimida,p,iteracao,a,b)
    }
let areaTotal=0;
let centroideGlobalX=0;
let centroideGlobalY=0;
let inerciaCanvasX=0;
let inerciaCanvasY=0;
let maiorInerciaGlobal=0;
let menorInerciaGlobal=0;
let anguloParaDirecoesPrincipais=0;
let IxPrincipal=0;
let IyPrincipal=0;
let pontosDoNucleoCentral = [];
let eixoPrincipalL1 =[];
let eixoPrincipalL2 =[];
let anguloGlobal = 0;
function calcular_propriedades(poligono)
{
    //Organizar pontos;
    let pontosOrganizados = [...poligono.pontos];
    pontosOrganizados.push(pontosOrganizados[0]);
    let somatorioArea = 0;
    let somatorioCx=0;
    let somatorioCy=0;
    let somatorioIx=0;
    let somatorioIy=0;
    let somatorioIxy=0;
    let anguloExternoTotal=0;
    for(let i=0;i<pontosOrganizados.length-1;i++)
    {
        let xi = pontosOrganizados[i].x;
        let yi = pontosOrganizados[i].y;
        let xi1 = pontosOrganizados[i+1].x;
        let yi1 = pontosOrganizados[i+1].y;
        somatorioArea += (xi*yi1 - xi1*yi);
        somatorioCx += (xi+xi1)*(xi*yi1-xi1*yi);
        somatorioCy += (yi+yi1)*(xi*yi1-xi1*yi);
        let x0;
        let y0;
        if(i==0)
        {
            x0 = pontosOrganizados[pontosOrganizados.length-2].x
            y0 = pontosOrganizados[pontosOrganizados.length-2].y
        }
        else
        {
            x0 = pontosOrganizados[i-1].x;
            y0 = pontosOrganizados[i-1].y;
        }
        
        //let signedArea =(x0*yi - xi*y0);
        let v1x = xi - x0;
        let v1y = yi - y0;
        let v2x = xi1 - xi;
        let v2y = yi1 - yi;
        let signedArea = v1x*v2y-v2x*v1y;
        let anguloExterno = (v1x*v2x + v1y*v2y)*isqrt(v1x**2+v1y**2)*isqrt(v2x**2+v2y**2);
        anguloExterno = Math.acos(anguloExterno);
        //console.log(anguloExterno*180/Math.PI)
        if(signedArea<0)
        {
            anguloExternoTotal+=anguloExterno;
        }
        else
        {
            anguloExternoTotal-=anguloExterno;
        }


        //somatorioIx += (yi*yi + yi*yi1 + yi1*yi1)*ai;
        //somatorioIy += (xi*xi + xi*xi1 + xi1*xi1)*ai;
        //somatorioIxy += (xi*yi1 + 2*xi*yi + 2*xi1*yi1 + xi1*yi)*ai
    }
    //console.log(anguloExternoTotal*180/Math.PI)
    let somaAngulosExternos = Math.round(Math.abs(anguloExternoTotal*180/Math.PI))
    if(somaAngulosExternos!=360)
    {
        poligono.isValid = false;
        return
    }
    poligono.isValid=true;
    let area = somatorioArea/2;
    let Cx = somatorioCx/(6*area);
    let Cy = somatorioCy/(6*area);

    for(let i=0;i<pontosOrganizados.length-1;i++)
    {
        let xi = pontosOrganizados[i].x-Cx;
        let yi = pontosOrganizados[i].y-Cy;
        let xi1 = pontosOrganizados[i+1].x-Cx;
        let yi1 = pontosOrganizados[i+1].y-Cy;
        let ai = xi*yi1 - xi1*yi;
        somatorioIx += (yi*yi + yi*yi1 + yi1*yi1)*ai;
        somatorioIy += (xi*xi + xi*xi1 + xi1*xi1)*ai;
        somatorioIxy += (xi*yi1 + 2*xi*yi + 2*xi1*yi1 + xi1*yi)*ai
    }

    let Ix = somatorioIx/12;
    let Iy = somatorioIy/12;
    let Ixy = somatorioIxy/24;

    if(area>0)
    {
        Ixy=-Ixy;
    }
    area = Math.abs(area);
    Ix = Math.abs(Ix);
    Iy = Math.abs(Iy);
    

    poligono.area = area;
    poligono.centroideX = Cx;
    poligono.centroideY = Cy;
    poligono.IxCanvas = Ix;
    poligono.IyCanvas = Iy;
    poligono.IxyCanvas = Ixy;
    calcularCentroidesGlobais();
    calcularInerciaGlobal();
    calcularNucleoCentral();
    return [area,Cx,Cy,Ix,Iy,Ixy]
}
function calcularCentroidesGlobais()
{
    let somaArea=0;
    let somaXArea=0;
    let somaYArea=0;

    for (let i=0;i<poligonos.length;i++) 
	{
		somaArea+= poligonos[i].area;
		somaXArea+=poligonos[i].centroideX*poligonos[i].area;
		somaYArea+=poligonos[i].centroideY*poligonos[i].area;
	}

    areaTotal = somaArea;
    centroideGlobalX = somaXArea/areaTotal;
    centroideGlobalY = somaYArea/areaTotal;
}
function calcularInerciaGlobal()
{

		let Ix=0;
		let Iy=0;
		let Ixy = 0;

		for (let i=0;i<poligonos.length;i++)  //TEOREMA DOS EIXOS PARALELOS COM RETANGULOS
		{
			Ix +=poligonos[i].IxCanvas+poligonos[i].area*(poligonos[i].centroideY-centroideGlobalY)**2; 
			Iy +=poligonos[i].IyCanvas+poligonos[i].area*(poligonos[i].centroideX-centroideGlobalX)**2;
			Ixy +=poligonos[i].IxyCanvas+poligonos[i].area*(-centroideGlobalX+poligonos[i].centroideX)*(centroideGlobalY-poligonos[i].centroideY); 
		}

		let Imed = (Ix+Iy)/2;
		let R = (((Ix-Iy)/2)**2+Ixy**2)**0.5;
		let Imax = Imed+R;
		let Imin = Imed-R;
        maiorInerciaGlobal = Imax;
        menorInerciaGlobal = Imin;
        inerciaCanvasX = Ix;
        inerciaCvanasY = Iy;
        
		
		if (Ix>Iy)
		{
			anguloParaDirecoesPrincipais = Math.atan(-2*Ixy/(Iy-Ix))/2;
			Ixnew = Imax;
			Iynew = Imin;
		}
		else if(Iy>Ix)
		{
			anguloParaDirecoesPrincipais = Math.atan(-2*Ixy/(Iy-Ix))/2;
			Iynew=Imax;
			Ixnew=Imin;
		}
		else
		{
			anguloParaDirecoesPrincipais = Math.PI/4;
			if (Ixy>0)
			{
				Ixnew = Imax;
				Iynew = Imin;
			}
			else
			{
				Iynew = Imax;
				Ixnew = Imin;
			}
		}
        IxPrincipal = Ixnew;
        IyPrincipal = Iynew;

}

function rotacionarVetor(vetor,angulo)
{
    return new PVector(
        
    );
}


//Teste com envoltoria
function calcularNucleoCentral()
	{
        pontosDoNucleoCentral = [];

        let arrayEnvoltoria = pontosDaEnvoltoria.slice();
        arrayEnvoltoria.push(arrayEnvoltoria[0]);
        arrayEnvoltoria.push(arrayEnvoltoria[1]);

        
        let angulo = anguloParaDirecoesPrincipais;
        let Ixnew = IxPrincipal;
        let Iynew = IyPrincipal;
        let A = areaTotal;

        for(let i=0;i<arrayEnvoltoria.length;i+=2)
        {
            let x1 = arrayEnvoltoria[i]
            let x2 = arrayEnvoltoria[i+2];
            let y1 = arrayEnvoltoria[i+1];
            let y2 = arrayEnvoltoria[i+3];
            let xbarra = centroideGlobalX;
            let ybarra = centroideGlobalY;
            let mx1 = -xbarra+x1;
		    let mx2 = -xbarra+x2;
		    let my1 = -ybarra+y1;
		    let my2 = -ybarra+y2;

            let tempy1 = my1;
			my1 = my1*Math.cos(angulo)-mx1*Math.sin(angulo);
			mx1 = mx1*Math.cos(angulo)+tempy1*Math.sin(angulo);
			let tempy2 = my2;
			my2 = my2*Math.cos(angulo)-mx2*Math.sin(angulo);
			mx2 = mx2*Math.cos(angulo)+tempy2*Math.sin(angulo);
            
            let vetorPonto;

            if ((mx1>mx2 && my1>my2) || (mx1<mx2 && my1<my2))//crescente
            {
                let coef_angular = Math.abs((my1-my2)/(mx1-mx2));
                let coef_linear = my1 - coef_angular*mx1;
                let x_auxiliar = -coef_linear/coef_angular;
                let y_auxiliar = coef_linear;
                let pa = (-Iynew/(A*x_auxiliar));
                let pb = (-Ixnew/(A*y_auxiliar));
                vetorPonto = new PVector(pa,pb);


            }
            else if(mx1-mx2==0)//vertical
            {
                let pa = (-Iynew/(A*mx1))
                let pb = (0)
                vetorPonto = new PVector(pa,pb);

            }
            else if(my1-my2==0)//horizontal
            {
                let pa = (0);
                let pb = (-Ixnew/(A*my1));
                vetorPonto = new PVector(pa,pb);
            }
            else //decrescente
            {
                let coef_angular = -Math.abs((my1-my2)/(mx1-mx2));
                let coef_linear = my1 - coef_angular*mx1;
                let x_auxiliar = -coef_linear/coef_angular;
                let y_auxiliar = coef_linear;
                let pa = (-Iynew/(A*x_auxiliar));
                let pb = (-Ixnew	/(A*y_auxiliar));
                vetorPonto = new PVector(pa,pb);
                
            }
            eixoPrincipalL1[0] = (new PVector(0,10));
            eixoPrincipalL1[1] = (new PVector(0,-10));
            eixoPrincipalL2[0] = (new PVector(10,0));
            eixoPrincipalL2[1] = (new PVector(-10,0));
            eixoPrincipalL1[0].rotacionar(angulo);
            eixoPrincipalL1[1].rotacionar(angulo);
            eixoPrincipalL2[0].rotacionar(angulo);
            eixoPrincipalL2[1].rotacionar(angulo);
            anguloGlobal = angulo;
            



            vetorPonto.rotacionar(angulo);
            vetorPonto.x+=centroideGlobalX;
            vetorPonto.y+=centroideGlobalY;
            pontosDoNucleoCentral.push(vetorPonto);

        }
	}

var buf = new ArrayBuffer(4),
f32=new Float32Array(buf),
u32=new Uint32Array(buf);

/*function isqrt(x) {
  var x2 = 0.5 * (f32[0] = x);
  u32[0] = (0x5f3759df - (u32[0] >> 1));
  var y = f32[0];
  y  = y * ( 1.5 - ( x2 * y * y ) );   // 1st iteration
  return y;
}*/
function isqrt(x)
{
    return 1/Math.sqrt(x);
}
function att_propriedades_canvas()
{

	if (intervalo*escalax>200)
	{
		intervalo = intervalo/10;
	}

	if (intervalo*escalax<40)
	{
		intervalo=intervalo*10;
	}
}

function linhas_principais(p,corlp)
{
	p.push()
	p.strokeWeight(3)
	p.stroke(corlp)
	p.line(-width/2,-origin_pixeldisty,width/2,-origin_pixeldisty)
	p.line(-origin_pixeldistx,-height/2,-origin_pixeldistx,height/2)
	p.pop()
}

function grade(p,intervalo,tipo)
{
	if(tipo=='principal')
	{
		p.stroke(corGradePrincipal)
		p.strokeWeight(2)
	}
	if(tipo=='secundaria')
	{
		p.strokeWeight(1)
		p.stroke(corGradeSecundaria);
	}
	minrangex = Math.floor((origemX-width/2/escalax)/intervalo)*intervalo
	maxrangex = Math.ceil((origemX+width/2/escalax)/intervalo)*intervalo


	minrangey = Math.floor((origemY-height/2/escalay)/intervalo)*intervalo
	maxrangey = Math.ceil((origemY+height/2/escalay)/intervalo)*intervalo


	for(i=minrangex;i<maxrangex;i+=intervalo)
	{
		p.line(-origin_pixeldistx+i*escalax,-height/2,-origin_pixeldistx+i*escalax,height/2)
	}
	for(i=minrangey;i<maxrangey;i+=intervalo)
	{
		p.line(-width/2,-origin_pixeldisty+i*escalay,width/2,-origin_pixeldisty+i*escalay)
	}
}
function eixosPrincipais(propriedadesGlobais)
{
	try{
	x0 = pixelX(propriedadesGlobais.eixoPrincipalL1[0].x+propriedadesGlobais.centroideGlobalX)
	y0 = pixelY(propriedadesGlobais.eixoPrincipalL1[0].y+propriedadesGlobais.centroideGlobalY)
	x1 = pixelX(propriedadesGlobais.eixoPrincipalL1[1].x+propriedadesGlobais.centroideGlobalX)
	y1 = pixelY(propriedadesGlobais.eixoPrincipalL1[1].y+propriedadesGlobais.centroideGlobalY)
	sketch.line(x0,y0,x1,y1);
	x0 = pixelX(propriedadesGlobais.eixoPrincipalL2[0].x+propriedadesGlobais.centroideGlobalX)
	y0 = pixelY(propriedadesGlobais.eixoPrincipalL2[0].y+propriedadesGlobais.centroideGlobalY)
	x1 = pixelX(propriedadesGlobais.eixoPrincipalL2[1].x+propriedadesGlobais.centroideGlobalX)
	y1 = pixelY(propriedadesGlobais.eixoPrincipalL2[1].y+propriedadesGlobais.centroideGlobalY)
	sketch.line(x0,y0,x1,y1);
	}
	catch{};
}
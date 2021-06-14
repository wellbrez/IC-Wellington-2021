function att_intervalo()
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

function grade(p,intervalo)
{
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
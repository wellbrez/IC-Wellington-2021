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
	p.line(-origin_pixeldisty,-width/2,-origin_pixeldisty,width/2)
	p.line(-height/2,-origin_pixeldistx,height/2,-origin_pixeldistx)
	p.pop()
}

function grade(p,intervalo)
{
	minrangex = Math.floor((cscreenX-width/2/escalax)/intervalo)*intervalo
	maxrangex = Math.ceil((cscreenX+width/2/escalax)/intervalo)*intervalo


	minrangey = Math.floor((cscreenY-height/2/escalay)/intervalo)*intervalo
	maxrangey = Math.ceil((cscreenY+height/2/escalay)/intervalo)*intervalo
	//console.log('minrangex'+minrangex)
	//console.log('maxrangex'+maxrangex)


	for(i=minrangex;i<maxrangex;i+=intervalo)
	{
		p.line(-height/2,-origin_pixeldistx+i*escalax,height/2,-origin_pixeldistx+i*escalax)
	}
	for(i=minrangey;i<maxrangey;i+=intervalo)
	{
		p.line(-origin_pixeldisty+i*escalay,-width/2,-origin_pixeldisty+i*escalay,width/2)
	}
}
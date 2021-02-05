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

function linhas_principais(corlp)
{
	push()
	strokeWeight(3)
	stroke(corlp)
	line(-origin_pixeldisty,-width/2,-origin_pixeldisty,width/2)
	line(-height/2,-origin_pixeldistx,height/2,-origin_pixeldistx)
	pop()
}

function grade(intervalo)
{
	minrangex = Math.floor((cscreenX-width/2/escalax)/intervalo)*intervalo
	maxrangex = Math.ceil((cscreenX+width/2/escalax)/intervalo)*intervalo


	minrangey = Math.floor((cscreenY-height/2/escalay)/intervalo)*intervalo
	maxrangey = Math.ceil((cscreenY+height/2/escalay)/intervalo)*intervalo
	//console.log('minrangex'+minrangex)
	//console.log('maxrangex'+maxrangex)


	for(i=minrangex;i<maxrangex;i+=intervalo)
	{
		line(-height/2,-origin_pixeldistx+i*escalax,height/2,-origin_pixeldistx+i*escalax)
	}
	for(i=minrangey;i<maxrangey;i+=intervalo)
	{
		line(-origin_pixeldisty+i*escalay,-width/2,-origin_pixeldisty+i*escalay,width/2)
	}
}
function setup()
{
	frameRate(60)
	screvent = null;
	mvevent = null;
	width = (windowWidth*0.9);
	height = (windowHeight*0.9);
	createCanvas(width,height);
	escalax=1;
	escalay=1;

	cscreenX = 0;
	cscreenY = 0;
	origin_pixeldistx = cscreenX*escalax;
	origin_pixeldisty = cscreenY*escalay;
	intervalo = 10;
	pol1 = new Polygon();
	adjtime=0;
	adjinty=0;
	adjintx=0;
	//TABELA DE CORES//
	corBolha = '#7fcd91'
	corGradePrincipal = '#5b5656'
	corGradeSecundaria = '#5b5656'
	corFundo = '#4d4646'
	corLinhasPrincipais = "#7fcd91"
	corContorno = '#5b5656'
	corPoligono = "#f5eaea"
	

}
function pixelX(coordX){
return -origin_pixeldistx + coordX*escalax}
function pixelY(coordY){
return -origin_pixeldisty + coordY*escalay}

function coord_mx()
{
	return (mouseX-width/2)/escalax+cscreenX
}
function coord_my()
{return -(mouseY-height/2)/escalay+cscreenY}

function scrolling(passos,zoomx,zoomy,posx,posy)
{
	//this.incremento = scr_objetivo/tempo;
	this.passos = passos;
	//this.incremento = (escalax*scr_objetivo-escalax)/passos;
	this.zoom_inicial_x = escalax;
	this.zoom_inicial_y = escalay;

	this.zoom_final_x = escalax*zoomx;
	this.zoom_final_y = escalay*zoomy;

	this.posicao_final_x = cscreenX + (posx-width/2)/escalax - (posx-width/2)/escalax/zoomx;
	this.posicao_final_y = cscreenY - (posy-height/2)/escalay + (posy-height/2)/escalay/zoomy;

	this.incremento_zoom_x = (this.zoom_final_x - escalax)/passos;
	this.incremento_zoom_y = (this.zoom_final_y - escalay)/passos;

	this.incremento_posicao_x = (this.posicao_final_x)/passos;
	this.incremento_posicao_y = (this.posicao_final_y)/passos;

	this.aplicar = function()
	{
		if (this.passos>0)
		{
			var escala_x_anterior = escalax;
			var escala_y_anterior = escalay;

			escalax+=this.incremento_zoom_x;
			escalay+=this.incremento_zoom_y;

			cscreenX=cscreenX + (posx-width/2)/escala_x_anterior - (posx-width/2)/escalax;
			cscreenY=cscreenY - (posy-height/2)/escala_y_anterior + (posy-height/2)/escalay;

			this.passos-=1;

		}
		else
		{
			escalax = this.zoom_final_x;
			escalay = this.zoom_final_y;
			//cscreenX = coord_mx()-(mouseX-width/2)/(escalax);
			//cscreenY = coord_my()+(mouseY-height/2)/(escalay);
			cscreenX= this.posicao_final_x
			cscreenY= this.posicao_final_y;
			screvent = null;

		}
	}
}
function moving(tempo,mv_objetivox,mv_objetivoy)
{

	this.incrementox = mv_objetivox/tempo;
	this.incrementoy = mv_objetivoy/tempo;
	this.tempo = tempo;
	this.aplicar = function()
	{
		if (this.tempo>0)
		{
			cscreenX+=this.incrementox;
			cscreenY+=this.incrementoy;
			this.tempo-=1;
		}
	}
}




//console.log("mensagem"+str(parametro))
function draw()
{



	origin_pixeldistx = cscreenX*escalax;
	origin_pixeldisty = cscreenY*escalay;
	background(corFundo);
	translate(width/2,height/2);
	rotate(-90*Math.PI/180);
	att_intervalo()
	//grade principal
	stroke(corGradePrincipal)
	strokeWeight(2)
	grade(intervalo);
	//grade secundária
	strokeWeight(1)
	stroke(corGradeSecundaria);
	grade(intervalo/5);

	linhas_principais(corLinhasPrincipais);


	rect(-origin_pixeldisty,-origin_pixeldistx,50*escalay,50*escalax);
	push()
	fill('red')

	if(adjtime==0||pol1.pontos.length<=4)
	{pol1.draw()}
	else{pol1.adjusting()}
	pop()
	
	pol1.bubbledraw()

	if(screvent!=null){
	screvent.aplicar()}
	if(mvevent!=null){
	mvevent.aplicar()};




}
function mouseClicked()
{

	pol1.add_ponto();
	adjtime=20;


	midpointx = (pol1.pontos[0]+pol1.pontos[pol1.pontos.length-4])/2
	midpointy = (pol1.pontos[1]+pol1.pontos[pol1.pontos.length-3])/2
	console.log('midpointx'+midpointx)
	console.log('midpointy'+midpointy)
	adjintx = (coord_mx() - midpointx)
	adjinty = (coord_my() - midpointy)

	
}
function mouseWheel(event)
{
	console.log(event.delta);


	
	//mvevent = new moving(5, (mouseX-width/2)/escalax*0.3,-(mouseY-height/2)/escalay*0.3);



	delta_scroll = (Math.abs(event.delta/1000)+1)**Math.sign(-event.delta);
	escalax_antes = escalax;
	escalay_antes = escalay;
	
	screvent = new scrolling(5,delta_scroll,delta_scroll,mouseX,mouseY)
	//mvevent = new moving(5,coord_mx()-cscreenX-(mouseX-width/2)/(escalax_antes*delta_scroll) , coord_my()-cscreenY+(mouseY-height/2)/(escalay_antes*delta_scroll));



	
}


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
{line(-height/2,-origin_pixeldistx+i*escalax,height/2,-origin_pixeldistx+i*escalax)}
for(i=minrangey;i<maxrangey;i+=intervalo)
{line(-origin_pixeldisty+i*escalay,-width/2,-origin_pixeldisty+i*escalay,width/2)}
}



function Polygon()
{
	this.pontos = [];
	this.encostounabolha = function()
	{
	}
	this.add_ponto = function()
	{
		this.pontos.push(coord_mx());
		this.pontos.push(coord_my());
		console.log(this.pontos[0])
		console.log(this.pontos[1])
	}
	this.adjusting = function()
	{
		console.log('adjusting');
		adjtime-=1;
		fill(corPoligono)
		stroke(corContorno)
		strokeWeight(4)
		beginShape()
		for(i=0;i<this.pontos.length-2;i+=2)
		{
			vertex(pixelY(this.pontos[i+1]),pixelX(this.pontos[i]));

		console.log(i)
		}
		vary = map(adjtime,0,20,pixelY(this.pontos[i+1]),pixelY(midpointy))
		varx = map(adjtime,0,20,pixelX(this.pontos[i]),pixelX(midpointx))
		vertex(vary,varx);


		console.log(i)

		endShape(CLOSE)
	}
	this.bubbledraw = function()
	{
		push()
		ellipseMode(CENTER)
		fill(corBolha)
		for(i=0;i<this.pontos.length;i+=2)
		{
			ellipse(pixelY(this.pontos[i+1]),pixelX(this.pontos[i]),10,10)
		}
		pop()
	}
	this.draw = function()
	{
		stroke(corContorno)
		strokeWeight(4)
		fill(corPoligono)
		beginShape()
		for(i=0;i<this.pontos.length;i+=2)
		{
			vertex(pixelY(this.pontos[i+1]),pixelX(this.pontos[i]));
		}

		endShape(CLOSE)
	}
}
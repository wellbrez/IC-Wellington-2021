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

	for (m=0;m<pontos_pre_carregados.length;m+=2)
	{
		pol1.add_ponto_por_coordenada(pontos_pre_carregados[m],pontos_pre_carregados[m+1]);
	}

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
//console.log("mensagem"+str(parametro))
function draw()
{
	//distância, em pixels, da origem do plano cartesiano (atualizacao)
	origin_pixeldistx = cscreenX*escalax;
	origin_pixeldisty = cscreenY*escalay;
	//definindo cor de fundo do canvas
	background(corFundo);
	//translacção ao meio da tela
	translate(width/2,height/2);
	//rotacao do canvas (?)
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


	//rect(-origin_pixeldisty,-origin_pixeldistx,50*escalay,50*escalax);
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







function Polygon()
{
	this.pontos = [];
	this.encostounabolha = function()
	{
	}
	this.add_ponto_por_pixel = function(posx,posy)
	{
		this.pontos.push(posicao_do_pixel_x(posx));
		this.pontos.push(posicao_do_pixel_y(posy));
	}
	this.add_ponto_por_coordenada = function(posx,posy)
	{
		this.pontos.push(posx);
		this.pontos.push(posy);
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
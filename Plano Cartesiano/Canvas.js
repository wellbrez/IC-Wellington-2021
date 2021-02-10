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
	decode();

	
	

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
	
	

	
	for(let poligono of polygons)
	{
		push()
		fill('red')
		if(adjtime==0||poligono.pontos.length<=4)
		{
			poligono.draw();
			poligono.bubbledraw();
		}
		else
		{
			poligono.adjusting();
			poligono.bubbledraw();
		}
		
		pop()
	}

	if(screvent!=null){
	screvent.aplicar()}
	if(mvevent!=null){
	mvevent.aplicar()};




}








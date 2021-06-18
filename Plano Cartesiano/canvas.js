

function resizewindow()
{
	let width = document.getElementById('canvas2').getBoundingClientRect().width;
	//let width = screen.width;
	let height = document.getElementById('canvas2').getBoundingClientRect().height;
	//let height = screen.height;
	window.sketch.resizeCanvas(width,height,true);
}
var sketch = function(p)
{
	p.setup = function()
	{
		d_circle = 0;
		toquex=0;
		toquey=0;
		p.frameRate(60)
		eventoZoom = null;
		eventoScroll = null;
		//width = (p.windowWidth);
		//height = (p.windowHeight);
		width = document.getElementById('canvas2').getBoundingClientRect().width;
		height = document.getElementById('canvas2').getBoundingClientRect().height;
		p.cnv = p.createCanvas(width,height);

		escalax=1;
		escalay=1;
		iglobal = 0;

		origemX = 0;
		origemY = 0;

		origin_pixeldistx = origemX*escalax;
		origin_pixeldisty = origemY*escalay;

		intervalo = 10;
		carregarImportacaoInicial();
		let grahamScan;
		poligonos[poligonos.length-1].selected = true;

		
		
		mostrar_area = false;

		
		resizewindow();

	}
	p.mouseWheel = function(event)
	{
		mouseWheel(event);
	}
	p.draw = function()
	{
		p.clear();
		resizewindow();
		//distância, em pixels, da origem do plano cartesiano (atualizacao)
		origin_pixeldistx = origemX*escalax;
		origin_pixeldisty = origemY*escalay;
		//definindo cor de fundo do canvas
		p.background(corFundo);
		//translacção ao meio da tela
		p.translate(width/2,height/2);
		//rotacao do canvas (?)
		att_intervalo()
		//grade principal
		p.stroke(corGradePrincipal)
		p.strokeWeight(2)
		grade(p,intervalo);
		//grade secundária
		p.strokeWeight(1)
		p.stroke(corGradeSecundaria);
		grade(p,intervalo/5);

		linhas_principais(p,corLinhasPrincipais);
		
		//p.ellipse(0,0,d_circle,d_circle)
		//rect(-origin_pixeldisty,-origin_pixeldistx,50*escalay,50*escalax);
		
		

		
		for(let poligono of poligonos)
		{
			p.push()
			for(let ponto of poligono.pontos)
			{
				ponto.animar();
			}
			p.pop()
			envoltoria = calcularEnvoltoria();
			desenharEnvoltoria(envoltoria);
			poligono.desenhar();
			poligono.desenharPontos();
		}

		
		if(eventoScroll!=null){
			eventoScroll.aplicar()};
		if(eventoZoom!=null){
		eventoZoom.aplicar()}
		//p.stroke('white');
		//p.strokeWeight(2);
		//p.line(-origin_pixeldistx,-origin_pixeldisty,0,0);
		//p.ellipse(toquex-width/2,toquey-height/2,10,10);

		p.push();
		p.fill('yellow');
		p.noStroke;

		



	}
}









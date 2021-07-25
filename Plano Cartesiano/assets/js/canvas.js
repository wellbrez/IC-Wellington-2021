

function resizewindow()
{
	width = document.body.getBoundingClientRect().width;
	//let width = screen.width;
	height = document.body.getBoundingClientRect().height;
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
		width = document.body.getBoundingClientRect().width;
		height = document.body.getBoundingClientRect().height;
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

	}/*
	p.mouseWheel = function(event)
	{
		mouseWheel(event);
	}*/
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
		
		
		if(propriedadesGlobais.envoltoria)
		{
			desenharEnvoltoria(propriedadesGlobais.envoltoria);
		}
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
			poligono.desenharCentroide();
		}
		p.push();
		p.beginShape()
		for(let ponto of propriedadesGlobais.pontosDoNucleoCentral)
		{
			
			let x = pixelX(ponto.x);
			let y = pixelY(ponto.y);
			let xTexto = pixelX(ponto.x)+2;
			let yTexto = pixelY(ponto.y) -2;
			let cx = ponto.xOriginal.toFixed(2);
			let cy = -ponto.yOriginal.toFixed(2);

			p.vertex(x,y);
			p.fill(corTexto);
			p.textSize(15);
			p.strokeWeight(0);
			p.text(`(${cx} , ${cy})`,xTexto,yTexto)
			p.strokeWeight(2);
			p.fill(corContorno);
			p.ellipse(x,y,7,7);
		}
		
		
		/*SohArea.atualizarPropriedades();*/
		p.strokeWeight(3);
		p.stroke(corNC)
		p.fill('rgba(0,0,0,0)');
		p.endShape(p.CLOSE)

		if(propriedadesGlobais.eixoPrincipalL1.length>0)
		{
			eixosPrincipais();
		}
		
		
		if(mostrarLN)
		{
			LN(p);
		}
		
		p.beginShape()
		for(let ponto of propriedadesAreaComprimida.pontosDoNucleoCentral)
		{
			
			let x = pixelX(ponto.x);
			let y = pixelY(ponto.y);
			let xTexto = pixelX(ponto.x)+2;
			let yTexto = pixelY(ponto.y) -2;
			let cx = ponto.xOriginal.toFixed(2);
			let cy = -ponto.yOriginal.toFixed(2);

			p.vertex(x,y);
			p.fill(corTexto);
			p.textSize(15);
			p.strokeWeight(0);
			p.text(`(${cx} , ${cy})`,xTexto,yTexto)
			p.strokeWeight(2);
			p.fill(corContorno);
			p.ellipse(x,y,7,7);
		}
		
		
		/*SohArea.atualizarPropriedades();*/
		p.strokeWeight(3);
		p.stroke(corNC)
		p.fill('rgba(0,0,0,0)');
		p.endShape(p.CLOSE)

		if(eventoScroll!=null){
			eventoScroll.aplicar()};
		if(eventoZoom!=null){
		eventoZoom.aplicar()} 
	}
}











function resizewindow()
{
	width = document.getElementById('canvas2').getBoundingClientRect().width;
	height = document.getElementById('canvas2').getBoundingClientRect().height;
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
		screvent = null;
		mvevent = null;
		width = (p.windowWidth);
		height = (p.windowHeight);
		p.cnv = p.createCanvas(width,height);

		escalax=1;
		escalay=1;

		cscreenX = 0;
		cscreenY = 0;

		origin_pixeldistx = cscreenX*escalax;
		origin_pixeldisty = cscreenY*escalay;

		intervalo = 10;
		decode();
		polygons[polygons.length-1].selected = true;

		
		

		adjtime=0;
		adjinty=0;
		adjintx=0;

		//TABELA DE CORES//
		corBolha = '#DC0073'
		corGradePrincipal = '#5E1808'
		corGradeSecundaria = '#5E1808'
		corFundo = '#230903'
		corLinhasPrincipais = "#E8EBE4"
		corContorno = '#E8EBE4'
		corPoligono = "white"
		
		resizewindow();

	}
	//console.log("mensagem"+str(parametro))
	p.mouseWheel = function(event)
	{
		mouseWheel(event);
	}
	p.draw = function()
	{
		p.clear();
		resizewindow();
		//distância, em pixels, da origem do plano cartesiano (atualizacao)
		origin_pixeldistx = cscreenX*escalax;
		origin_pixeldisty = cscreenY*escalay;
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
		
		

		
		for(let poligono of polygons)
		{
			p.push()
			p.fill('red')
			if(adjtime==0||poligono.pontos.length<=4 || !poligono.selected)
			{
				poligono.draw();
				poligono.bubbledraw();
			}
			else
				{
				poligono.adjusting();
				poligono.bubbledraw();
			}
			
			p.pop()
		}

		
		if(mvevent!=null){
			mvevent.aplicar()};
		if(screvent!=null){
		screvent.aplicar()}
		//p.stroke('white');
		//p.strokeWeight(2);
		//p.line(-origin_pixeldistx,-origin_pixeldisty,0,0);
		//p.ellipse(toquex-width/2,toquey-height/2,10,10);



	}
}









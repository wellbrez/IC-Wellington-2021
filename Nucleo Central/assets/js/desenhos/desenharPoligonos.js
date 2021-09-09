function desenharPoligonos(poligonos,p=sketch,cor,centroide=true)
{
    for(let poligono of poligonos)
		{
			p.push()
			for(let ponto of poligono.pontos)
			{
				ponto.animar();
			}
			p.pop()
			poligono.desenhar(cor);
			poligono.desenharPontos();
            if(centroide) {poligono.desenharCentroide();}
			
		}
}
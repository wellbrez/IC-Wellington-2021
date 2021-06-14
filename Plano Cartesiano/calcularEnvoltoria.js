//iniciando método
function calcularEnvoltoria()
{
    grahamScan = new GrahamScan();
    pontosTotais = [];
    for (let poligono of poligonos)
    {
        if(poligono.positivo)
        {
            for(let i=0;i<poligono.pontos.length;i+=2)
            {
                pontosTotais.push(poligono.pontos.slice(i,i+2));
            }
        }
    }
    
    grahamScan.setPoints(pontosTotais);
    envoltoriaCrua = grahamScan.getHull();  // [1,0], [2,1], [0,1]
    envoltoriaPadronizada = [];
    for (let point of envoltoriaCrua)
    {
        envoltoriaPadronizada.push(point[0]);
        envoltoriaPadronizada.push(point[1]);
    }
    return envoltoriaPadronizada;
}
function desenharEnvoltoria(pontos)
{
    sketch.stroke(corEnvoltoria);
	sketch.strokeWeight(3.9);
	sketch.beginShape();
    sketch.fill(0,0,0,0);
	for(i=0;i<pontos.length;i+=2)
	{
		sketch.vertex(pixelX(pontos[i]),pixelY(pontos[i+1]));
	}

	sketch.endShape(sketch.CLOSE)
}

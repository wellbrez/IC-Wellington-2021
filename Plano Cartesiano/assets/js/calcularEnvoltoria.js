//iniciando método
function calcularEnvoltoria(poligonos,conjunto)
{
    let grahamScan = new GrahamScan();
    pontosTotais = [];
    if(!poligonos) return;
    for (let poligono of poligonos)
    {
        if(poligono.positivo)
        {
            for(let i=0;i<poligono.pontos.length;i++)
            {
                pontosTotais.push([poligono.pontos[i].x,poligono.pontos[i].y]);
            }
        }
    }
    
    grahamScan.setPoints(pontosTotais);
    envoltoriaCrua = grahamScan.getHull();  // [1,0], [2,1], [0,1]
    conjunto.pontosDaEnvoltoria = [];
    for (let point of envoltoriaCrua)
    {
        conjunto.pontosDaEnvoltoria.push(point[0]);
        conjunto.pontosDaEnvoltoria.push(point[1]);
    }
    return conjunto.pontosDaEnvoltoria;
}
function desenharEnvoltoria(pontos)
{
    sketch.stroke(corEnvoltoria);
	sketch.strokeWeight(3.9);
	sketch.beginShape();
    sketch.fill(0,0,0,0);
    if(!pontos) return;
	for(let i=0;i<pontos.length;i+=2)
	{
		sketch.vertex(pixelX(pontos[i]),pixelY(pontos[i+1]));
	}

	sketch.endShape(sketch.CLOSE)
}

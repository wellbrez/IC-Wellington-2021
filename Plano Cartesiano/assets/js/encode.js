function encode()
{
    let dadosEmString = "";
    for(let poligono of poligonos)
    {
        dadosEmString+=`${poligono.nome};${poligono.pontos.length}`
        for(let ponto of poligono.pontos)
        {
            dadosEmString+=`;${ponto.x};${ponto.y}`
        }
        dadosEmString+=";";
    }
    return dadosEmString.slice(0,-1);
}
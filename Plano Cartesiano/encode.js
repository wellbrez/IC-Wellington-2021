function encode()
{
    let dadosEmString = "";
    for(let i=0;i<poligonos.length;i++)
    {
        dadosEmString+=`${poligonos[i].nome};${poligonos[i].pontos.length}`;
        
        for(let j=0;j<poligonos[i].pontos.length;j++)
        {
            dadosEmString+= `;${poligonos[i].pontos[j]}`
        }
        if(i<poligonos.length-1)
        {
            dadosEmString+=";";
        }
    }
    //return comprimir(dadosEmString)
    return dadosEmString;
}
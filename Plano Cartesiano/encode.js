function encode()
{
    let dadosEmString = "";
    for(let i=0;i<polygons.length;i++)
    {
        dadosEmString+=`${polygons[i].nome};${polygons[i].pontos.length}`;
        
        for(let j=0;j<polygons[i].pontos.length;j++)
        {
            dadosEmString+= `;${polygons[i].pontos[j]}`
        }
        if(i<polygons.length-1)
        {
            dadosEmString+=";";
        }
    }
    //return comprimir(dadosEmString)
    return dadosEmString;
}
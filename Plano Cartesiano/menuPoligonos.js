function atualizarMenuPoligonos()
{
    let divPoligonos = document.getElementById("textoPoligonos")
    let polindex = 0;
    let divPoligonosInnerHtml = "";
    for (let pol of polygons)
    {
        divPoligonosInnerHtml += `Poligono ${polindex}:<br>Area: ${pol.area.toFixed(2)}<br>`;
        for(let i=0;i<pol.pontos.length;i+=2)
        {
            divPoligonosInnerHtml += `P${i/2} x=${pol.pontos[i].toFixed(2)} , y=${-pol.pontos[i+1].toFixed(2)}<br>`;
        }
        polindex++;
    }
    divPoligonos.innerHTML = divPoligonosInnerHtml;
}
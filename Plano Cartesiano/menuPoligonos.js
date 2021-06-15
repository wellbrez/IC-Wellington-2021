function atualizarMenuPoligonos()
{
    let divPoligonos = document.getElementById("textoPoligonos")
    let polindex = 0;
    let divPoligonosInnerHtml = "";
    for (let pol of poligonos)
    {
        if(polindex == poligonoSelecionado)
        {
            divPoligonosInnerHtml += `<br><pol class=textoSelecionado onclick=selecionar(${polindex})>Poligono ${polindex}:</pol>`;
            if(pol.area>=0)
            {
                divPoligonosInnerHtml +=  `<p class="pstarea area" >Area: ${pol.area.toFixed(2)}</p>`
            }
            else
            {
                divPoligonosInnerHtml += `<p class="ngtarea area" >Area: ${pol.area.toFixed(2)}</p>`
            }
            
            for(let i=0;i<pol.pontos.length;i++)
            {
                divPoligonosInnerHtml += `<p class="pontos">P${i} x=${pol.pontos[i].x.toFixed(2)} , y=${-pol.pontos[i].y.toFixed(2)}</p>`;
            }
        }
        else
        {
            divPoligonosInnerHtml += `<br><pol onclick=selecionar(${polindex})>Poligono ${polindex}:</pol>`;
            if(pol.area>=0)
            {
                divPoligonosInnerHtml +=  `<p class="pstarea area collapsed" >Area: ${pol.area.toFixed(2)}</p>`
            }
            else
            {
                divPoligonosInnerHtml += `<p class="ngtarea area collapsed" >Area: ${pol.area.toFixed(2)}</p>`
            }
            
            for(let i=0;i<pol.pontos.length;i++)
            {
                divPoligonosInnerHtml += `<p class="pontos collapsed">P${i} x=${pol.pontos[i].x.toFixed(2)} , y=${-pol.pontos[i].y.toFixed(2)}</p>`;
            }
        }
        
        polindex++;
    }
    divPoligonosInnerHtml+="<br><pol onclick='adicionarPoligono()'>Adicionar Poligono</pol>"
    divPoligonos.innerHTML = divPoligonosInnerHtml;
}
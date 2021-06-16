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
            divPoligonosInnerHtml += "<div class=dadosPoligono>"
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
                let p = polindex;
                let pp = i;
                let px = pol.pontos[i].x.toFixed(2);
                let py = -pol.pontos[i].y.toFixed(2);
                divPoligonosInnerHtml += `<p class="pontos" onmouseover='poligonos[${p}].pontos[${pp}].selecionar()'>
                P${pp} <br>
                x=<input id=P${p}P${pp}x value=${px} onchange="pegarValorDaCaixaDeTexto('P${p}P${pp}x')"></input><br>
                y=<input id=P${p}P${pp}y value=${py} onchange="pegarValorDaCaixaDeTexto('P${p}P${pp}y')"></input>
                </p>`;
            }
            divPoligonosInnerHtml += "</div>"
        }
        else
        {
            divPoligonosInnerHtml += `<br><pol onclick=selecionar(${polindex})>Poligono ${polindex}:</pol>`;
            divPoligonosInnerHtml += "<div class=dadosPoligono>"
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
                let p = polindex;
                let pp = i;
                let px = pol.pontos[i].x.toFixed(2);
                let py = -pol.pontos[i].y.toFixed(2);
                divPoligonosInnerHtml += `<p class="pontos collapsed" onmouseover='poligonos[${p}].pontos[${pp}].selecionar()'>
                P${pp} <br>
                x=<input id=P${p}P${pp}x value=${px} onchange="pegarValorDaCaixaDeTexto('P${p}P${pp}x')"></input><br>
                y=<input id=P${p}P${pp}y value=${py} onchange="pegarValorDaCaixaDeTexto('P${p}P${pp}y')"></input>
                </p>`; 
            }
            divPoligonosInnerHtml += "</div>"
        }
        
        polindex++;
    }
    divPoligonosInnerHtml+="<br><pol onclick='adicionarPoligono()'>Adicionar Poligono</pol>"
    divPoligonos.innerHTML = divPoligonosInnerHtml;
}
function pegarValorDaCaixaDeTexto(nome)
{
    nome = nome.slice(0,-1);
    let dadosSeparados = nome.split('P');
    let iPoligono = Number(dadosSeparados[1]);
    let iPonto = Number(dadosSeparados[2]);
    
    
    console.log('id sliced is '+nome)
    let valorx = Number(document.getElementById(`${nome}x`).value);
    let valory = -Number(document.getElementById(`${nome}y`).value);

    if (Number.isNaN(valorx)||Number.isNaN(valory))
    {
        atualizarUI();
    }
    else
    {
        let pontoMudado = poligonos[iPoligono].pontos[iPonto];
        pontoMudado.selecionar();
        pontoMudado.criarAnimacao(valorx,valory,60);
    }
    

}
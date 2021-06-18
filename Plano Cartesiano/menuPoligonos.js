$("#mostrarPoligonos").on("click",function(e)
{
    let textoPoligonos = document.getElementById("textoPoligonos");
    let botaoMostrarPoligonos = document.getElementById("mostrarPoligonos");
    if(textoPoligonos.style.maxWidth!='40vw')
    {
        textoPoligonos.style.maxWidth="40vw";
        botaoMostrarPoligonos.innerText = "<<"
    }
    else
    {
        textoPoligonos.style.maxWidth='0px';
        botaoMostrarPoligonos.innerText = ">>"
    }
    botaoMostrarPoligonos.style.marginLeft = textoPoligonos.style.maxWidth;
})
function atualizarMenuPoligonos()
{
    let divPoligonos = document.getElementById("textoPoligonos")

    for(let iPoligono=0;iPoligono<poligonos.length;iPoligono++)
    {
        let divPol = document.getElementById(`Pol${iPoligono}`)
        let divPontos = document.getElementById(`Pol${iPoligono}Pontos`)
        {
            if(divPol==null)
            {
                divPol = document.createElement('div');
                divPol.id = `Pol${iPoligono}`;
                divPol.classList.add('nomePoligono');
                let texto = document.createTextNode(`Poligono ${iPoligono} : ${poligonos[iPoligono].nome}`);
                divPol.appendChild(texto);
                texto.onclick = function()
                {
                    selecionar(iPoligono);
                }
                console.log(divPoligonos)
                divPoligonos.appendChild(divPol);
                divPontos = document.createElement(`div`);
                divPontos.id = `Pol${iPoligono}Pontos`;
                divPol.appendChild(divPontos);
            }
        }
        for(let iPonto=0;iPonto<poligonos[iPoligono].pontos.length;iPonto++)
        {
            let divPt = document.getElementById(`P${iPoligono}P${iPonto}`)
            if(divPt==null)
            {
                divPt = document.createElement('div');
                divPt.id = `P${iPoligono}P${iPonto}`;
                divPt.classList.add('pontos');
                divPontos.appendChild(divPt);
                let pontoNome = document.createTextNode(`Ponto ${iPonto}`);
                let x = document.createTextNode("x: ");
                let y = document.createTextNode("y: ");
                let xInput = document.createElement("input")
                let yInput = document.createElement("input")
                xInput.classList.add('inputPontos');
                yInput.classList.add('inputPontos');
                xInput.id = `P${iPoligono}P${iPonto}x`;
                yInput.id = `P${iPoligono}P${iPonto}y`;
                divPt.appendChild(pontoNome);
                divPt.appendChild(document.createElement("br"));
                divPt.appendChild(x);
                divPt.appendChild(xInput);
                divPt.appendChild(document.createElement("br"));
                divPt.appendChild(y);
                divPt.appendChild(yInput);
                xInput.onchange = function()
                {
                    pegarValorDaCaixaDeTexto(iPoligono,iPonto);
                }
                yInput.onchange = function()
                {
                    pegarValorDaCaixaDeTexto(iPoligono,iPonto);
                }
                divPt.onclick = function()
                {
                    poligonos[iPoligono].pontos[iPonto].selecionar();
                }
            }
            let xInput = document.getElementById(`P${iPoligono}P${iPonto}x`)
            let yInput = document.getElementById(`P${iPoligono}P${iPonto}y`)
            xInput.value = poligonos[iPoligono].pontos[iPonto].x.toFixed(2);
            yInput.value = -poligonos[iPoligono].pontos[iPonto].y.toFixed(2);
            if(poligonos[iPoligono].pontos[iPonto].ativo)
            {
                divPt.classList.add('pontoSelecionado');
                if(!isMobile)
                {
                    divPt.scrollIntoView();
                }
            }
            else
            {
                divPt.classList.remove("pontoSelecionado");
            }
        }
        if(poligonoSelecionado==iPoligono)
        {
            divPol.classList.add('textoSelecionado');
            divPontos.classList.remove('collapsed');
        }
        else
        {
            divPol.classList.remove('textoSelecionado');
            divPontos.classList.add('collapsed')
        }

    }



    /*for (let pol of poligonos)
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
    
    */
    
 
    
    
    
    

}
function pegarValorDaCaixaDeTexto(iPoligono,iPonto)
{
    let divId = `P${iPoligono}P${iPonto}`;

    let valorx = Number(document.getElementById(`${divId}x`).value);
    let valory = -Number(document.getElementById(`${divId}y`).value);

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
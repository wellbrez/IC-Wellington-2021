function mostrarMenuPontos()
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

}
function reduzirQtdMostradoresAPoligonos()
{
    const mostradores = document.getElementsByClassName('nomePoligono');
    //igualar qtd mostradores e qtd poligonos
    if (mostradores && poligonos)
    {
        while(mostradores.length>poligonos.length)
        {
                mostradores[mostradores.length-1].remove();
        }
    }
    else
    {
        throw new Error("mostradores ou poligonos são elementos com problemas");
    }
}
function atualizarMenuPoligonos()
{
    reduzirQtdMostradoresAPoligonos()
    const mostradoresDePoligonos = document.querySelectorAll('.nomePoligono')
    
    for(let iPoligono=0;iPoligono<poligonos.length;iPoligono++)
    {
        let mostradorDePoligono = mostradoresDePoligonos[iPoligono];
        ;
        //console.log(mostradoresDePoligonos[iPoligono])
        //Se nao existir o mostrador do poligono, cria um novo.
        if(!mostradorDePoligono || verificarIDs(mostradorDePoligono,iPoligono))
        {
            mostradorDePoligono = criarMostradorDePoligono(iPoligono)
            criarMostradorDeArea(iPoligono)
        }
        atualizarMostradorDeArea(iPoligono)
        atualizarMostradorDePoligono(iPoligono)
        atualizarVisibilidadeDoMostradorDePontos(iPoligono)
    }
}
function pegarValorDaCaixaDeTexto(iPoligono,iPonto)
{
    const elementId = `P${iPoligono}P${iPonto}`;
    const inputx = document.getElementById(`${elementId}x`);
    const inputy = document.getElementById(`${elementId}y`);

    const valorx = Number(inputx.value);
    const valory = -Number(inputy.value);

    if ( Number.isNaN(valorx) || Number.isNaN(valory)) return atualizarUI();

    inputx.blur();
    inputy.blur();
    return ([valorx,valory,iPoligono,iPonto])
}

function atribuirValorAoPonto(vetorDados)
{
    if(!vetorDados) return;
    
    const [valorx,valory,iPoligono,iPonto] = vetorDados
    const ponto = poligonos[iPoligono].pontos[iPonto];
    ponto.selecionar();
    ponto.criarAnimacao(valorx,valory,60);
    
}

function atribuirNovaLinha (elemento)
{
    elemento.appendChild(document.createElement("br"));
}
function criarElemento(tipo,id,classe,elementoPai)
{
    const elementoCriado = document.createElement(tipo);
    if(id) elementoCriado.id = id||undefined;
    if(classe) elementoCriado.classList.add(classe);
    if(elementoPai) elementoPai.appendChild(elementoCriado);
    return elementoCriado;
}
function atribuirTexto(texto,elementoPai)
{
    const textoNode = document.createTextNode(texto);
    if(elementoPai) elementoPai.appendChild(textoNode)
    return textoNode;
}

function atualizarValoresDosMostradores(iPonto,iPoligono)
{
    const xInput = document.getElementById(`P${iPoligono}P${iPonto}x`)
    const yInput = document.getElementById(`P${iPoligono}P${iPonto}y`)
    if(xInput && yInput)
    {
        xInput.value = poligonos[iPoligono].pontos[iPonto].x.toFixed(2);
    yInput.value = -poligonos[iPoligono].pontos[iPonto].y.toFixed(2);
        }
    
}
function atribuirCondicaoDeSelecao(iPonto,iPoligono)
{
    const divPt = document.getElementById(`P${iPoligono}P${iPonto}`)
    if(divPt)
    {
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
}
function atualizarMostradorDeArea(iPoligono)
{
    const spanArea = document.getElementById(`Pol${iPoligono}Area`);
    if(spanArea)
    {document.getElementById(`Pol${iPoligono}Area`).innerText = poligonos[iPoligono].area.toFixed(2);}
    
}

function atualizarMostradorDePoligono(iPoligono)
{
    const divPontos = document.getElementById(`Pol${iPoligono}Pontos`)
    for(let iPonto=0;iPonto<poligonos[iPoligono].pontos.length;iPonto++)
    {
        let divPt = document.getElementById(`P${iPoligono}P${iPonto}`)
        if(divPt==null)
        {
            divPt = criarElemento("div",`P${iPoligono}P${iPonto}`,"pontos",divPontos);
            const xInput = criarElemento("input",`P${iPoligono}P${iPonto}x`,"inputPontos",)
            const yInput = criarElemento("input",`P${iPoligono}P${iPonto}y`,"inputPontos",)

            atribuirTexto(`Ponto ${iPonto}`,divPt);

            atribuirNovaLinha(divPt);
            atribuirTexto("x: ",divPt);
            divPt.appendChild(xInput);
                atribuirNovaLinha(divPt);
                atribuirTexto("y: ",divPt);
            divPt.appendChild(yInput);

            xInput.onchange = function(e)
            {
                const vetorDados = pegarValorDaCaixaDeTexto(iPoligono,iPonto);
                atribuirValorAoPonto(vetorDados);
            }
            yInput.onchange = function(e)
            {
                const vetorDados = pegarValorDaCaixaDeTexto(iPoligono,iPonto);
                atribuirValorAoPonto(vetorDados);
            }
            divPt.onclick = function(e)
            {
                poligonos[iPoligono].pontos[iPonto].selecionar();
            }
        }
        atualizarValoresDosMostradores(iPonto,iPoligono)
        atribuirCondicaoDeSelecao(iPonto,iPoligono);
    }
}
function criarMostradorDePoligono(iPoligono)
{
    const divPoligonos = document.getElementById("textoPoligonos");
    divPol = criarElemento("div",`Pol${iPoligono}`,'nomePoligono',divPoligonos);
    const span = criarElemento("span",null,null,divPol)
    atribuirTexto(`Poligono ${iPoligono} : ${poligonos[iPoligono].nome}`,span)
    atribuirNovaLinha(span);
    span.onclick = function() {selecionar(iPoligono)};
    divPontos = criarElemento("div",`Pol${iPoligono}Pontos`,"pontosContainer",divPol)
    return divPol;
}
function criarMostradorDeArea(iPoligono)
{
    const divPoligonos = document.getElementById("textoPoligonos");
    const span = divPoligonos.querySelector(`#Pol${iPoligono} span`);
    //console.log(span);
    const areaSpan = criarElemento("span",`Pol${iPoligono}Area`,'mostradorArea',span)
    atribuirTexto("Area: ",areaSpan)
}
function atualizarVisibilidadeDoMostradorDePontos(iPoligono)
{
    const divPol = document.getElementById(`Pol${iPoligono}`)
    const divPontos = document.getElementById(`Pol${iPoligono}Pontos`)
    if (divPol && divPontos)
    {
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
}
function verificarIDs(mostrador,idnova)
{
    const idvelho = mostrador.id.split("Pol")[1];
    if(idvelho!=idnova)
    {
        mostrador.remove();
        return true
    }
    return false
    /*const idvelho = mostrador.id.split("Pol")[1];
    console.log(idvelho,idnova);
    const mostradores= mostrador.querySelectorAll("*");
    for(elemento of mostradores)
    {
        if(elemento.id)
        {
            elemento.id.replace(`Pol${idvelho}`,`Pol${idnova}`)
            elemento.id.replace(`P${idvelho}P`,`P${idnova}P`)
        }
    }
*/
}

/*function janelaPopUp(texto)
{
    const popUp = criarElemento("div",null,"janela",document.body);
    atribuirTexto(texto,popUp);
    const inputPopUp = criarElemento("input",null,null,popUp);
    const botaoClose = criarElemento("button",null,"btnClose",popUp);
    const botaoOk = criarElemento("button",null,"btnClose",popUp);
    let status = false;
    let ok=false;
    botaoClose.onclick = function()
    {
        status = true;
    }
    botaoOk.onclick = function()
    {
        status = true;
        ok = true;
    }
    if(ok) return inputPopUp.value;
    popUp.remove();
}*/

function mostrarMenuCompartilhar()
{
    document.getElementById("compartilhamento").classList.toggle("invisivel");
}
function limpar_tela()
{
    const resultado = confirm("Tem certeza que deseja excluir todos os poligonos?")
    if(!resultado) return
    poligonos = [new Polygon()];
    selecionar(0);
    document.getElementById("textoPoligonos").innerHTML = "";
    atualizarUI();
}

function excluirPoligono()
{
    let id = poligonoSelecionado;
    let certeza = confirm(`Tem certeza de que deseja excluir o Polígono ${id} (${poligonos[id].nome})?`)
    const mostrador = document.getElementById(`Pol${id}`);
    if(certeza)
    {
        poligonos.splice(id,1);
        if(mostrador)
        {
            mostrador.remove();
        }
        
    }
    if(poligonos.length==0)
    {
        poligonos = [new Polygon()];
    }
    selecionar(poligonos.length-1);
    atualizarUI();
}
function toggleBotoesNav()
{
    document.getElementById("nav").classList.toggle("invisivel");
}
function toggleQRCode()
{
    document.getElementById("qrCodeJanela").classList.toggle("collapsed");
}
function toggleLinkJanela()
{
    document.getElementById("linkJanela").classList.toggle("collapsed");
}
function toggleJanelaImportacao()
{
    document.getElementById("importacao").classList.toggle("collapsed");
}
function toggleJanela(tags)
{
    document.querySelector(tags).classList.toggle("collapsed")
}
function fecharJanela(tags)
{
    document.querySelector(tags).classList.add("collapsed")
}
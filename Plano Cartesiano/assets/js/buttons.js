function mostrarMenuCompartilhar()
{
    document.getElementById("compartilhamento").classList.toggle("invisivel");
}
function limpar_tela()
{
    poligonos = [new Polygon()];
    selecionar(0);
    document.getElementById("textoPoligonos").innerHTML = "";
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
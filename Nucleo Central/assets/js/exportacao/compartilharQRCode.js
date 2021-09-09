function gerarQRCode()
{
    document.getElementById("qrcode").innerHTML = "";
    let qrcode = new QRCode("qrcode");
    qrcode.makeCode(gerarCodigo(true));
    toggleQRCode();

}
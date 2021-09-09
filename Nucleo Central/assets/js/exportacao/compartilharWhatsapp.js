function compartilharWhatsapp() {
  let link = gerarCodigo(true);
  let texto = encodeURI(
    `Olá! Estou compartilhando uma seção transversal que fiz no app Núcleo Central. \nPara acessar, utilize o link \n${link}`
  );
  let walink = `https://wa.me/?text=${texto}%20`;
  console.log("cheguei aqui");
  window.open(walink);
}

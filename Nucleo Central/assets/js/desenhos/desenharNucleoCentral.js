function desenharNC(propriedadesGlobais, p = sketch, label = true) {
  p.beginShape();
  for (let ponto of propriedadesGlobais.pontosDoNucleoCentral) {
    let x = pixelX(ponto.x);
    let y = pixelY(ponto.y);
    let xTexto = pixelX(ponto.x) + 2;
    let yTexto = pixelY(ponto.y) - 2;
    let cx = ponto.xOriginal.toFixed(2);
    let cy = -ponto.yOriginal.toFixed(2);

    p.vertex(x, y);

    p.fill(corTexto);
    p.textSize(15);
    p.strokeWeight(0);
    if (label) {
      p.text(`(${cx} , ${cy})`, xTexto, yTexto);
    }
    p.strokeWeight(2);
    p.fill(corContorno);
    p.ellipse(x, y, 7, 7);
  }

  /*SohArea.atualizarPropriedades();*/
  p.strokeWeight(3);
  p.stroke(corNC);
  p.fill("rgba(0,0,0,0)");
  p.endShape(p.CLOSE);
}

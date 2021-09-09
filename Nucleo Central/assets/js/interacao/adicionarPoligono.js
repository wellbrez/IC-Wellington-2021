function adicionarPoligonoVazio()
{
    fecharJanela("#novoPoligono")
    let nome = prompt("Digite o nome do poligono");
    nome.replace(";",",")
	poligonos.push(new Polygon(nome));
	selecionar(poligonos.length-1);
    atualizarUI();
}

function adicionarPerfilI()
{
    const janelaPerfil = document.getElementById("perfilI")
    const [nomes,d,bf,tf,tw,pxs,pys] = janelaPerfil.getElementsByTagName("input");
    let nome = nomes.value;
    const px = Number(pxs.value);
    const py = -Number(pys.value);
    const hmax = Number(bf.value)/2;
    const vmax = Number(d.value)/2
    const vmed = vmax - Number(tf.value);
    const hmed = Number(tw.value)/2;
    if(hmax===0 || vmax===0)
    {
        alert("Não pode ter lados nulos")
        return;
    }
    if(Number.isNaN(px)||Number.isNaN(py)||Number.isNaN(hmax)||Number.isNaN(vmax)||Number.isNaN(vmed)||Number.isNaN(hmed))
    {
        alert("Valores invalidos");
        return;
    }
    fecharJanela("#novoPoligono")
    fecharJanela("#perfilI")

    const Pt1 = new ponto(px + hmax,py+vmax)
    const Pt2 = new ponto(px + hmax,py+vmed)
    const Pt3 = new ponto(px + hmed,py+vmed)
    const Pt4 = new ponto(px + hmed,py-vmed)
    const Pt5 = new ponto(px + hmax,py-vmed)
    const Pt6 = new ponto(px + hmax,py-vmax)
    const Pt7 = new ponto(px - hmax,py-vmax)
    const Pt8 = new ponto(px - hmax,py-vmed)
    const Pt9 = new ponto(px - hmed,py-vmed)
    const Pt10 = new ponto(px - hmed,py+vmed)
    const Pt11 = new ponto(px - hmax,py+vmed)
    const Pt12 = new ponto(px - hmax,py+vmax)

    
    nome.replace(";",",")
    const PolNovo = new Polygon(nome)
    PolNovo.pontos = [Pt1,Pt2,Pt3,Pt4,Pt5,Pt6,Pt7,Pt8,Pt9,Pt10,Pt11,Pt12]
    if(poligonos.length==1 && poligonos[0].pontos.length==0)
    {
        poligonos.pop();
        atualizarUI();
    }
	poligonos.push(PolNovo);

	selecionar(poligonos.length-1);
    atualizarUI();
}
function adicionarPerfilRetangular()
{
    const janelaPerfil = document.getElementById("perfilRetangular")
    const [nomes,b,h,pxs,pys] = janelaPerfil.getElementsByTagName("input");

    const hmax = Number(b.value)/2;
    const vmax = Number(h.value)/2
    const px = Number(pxs.value);
    const py = -Number(pys.value);

    if(temNulos([hmax,vmax]))
    {
        alert("Não pode ter lados nulos")
        return;
    }
    if(temNaN([px,py,hmax,vmax]))
    {
        alert("Valores invalidos");
        return;
    }
    fecharJanela("#novoPoligono")
    fecharJanela("#perfilRetangular")

    let nome = nomes.value;
    const Pt1 = new ponto(px + hmax,py+vmax)
    const Pt2 = new ponto(px + hmax,py-vmax)
    const Pt3 = new ponto(px - hmax,py-vmax)
    const Pt4 = new ponto(px - hmax,py+vmax)
    nome.replace(";",",")
    const PolNovo = new Polygon(nome)
    PolNovo.pontos = [Pt1,Pt2,Pt3,Pt4]
    if(poligonos.length==1 && poligonos[0].pontos.length==0)
    {
        poligonos.pop();
        atualizarUI();
    }
	poligonos.push(PolNovo);

	selecionar(poligonos.length-1);
    atualizarUI();

}
function adicionarPerfilCircular()
{
    const janelaPerfil = document.getElementById("perfilCircular")
    const [nomes,apr,r,pxs,pys] = janelaPerfil.getElementsByTagName("input");

    const raio = Number(r.value);
    const aproximacao = parseInt(apr.value);
    const px = Number(pxs.value);
    const py = -Number(pys.value);

    if(temNulos([raio,aproximacao]))
    {
        alert("Não pode ter lados nulos")
        return;
    }
    if(temNaN([raio,aproximacao,px,py]))
    {
        alert("Valores invalidos");
        return;
    }
    fecharJanela("#novoPoligono")
    fecharJanela("#perfilCircular")

    const pontos = [];
    let angulo = 0;
    const incremento = 2*Math.PI/aproximacao;
    for(let i=0;i<aproximacao;i++)
    {
        const x = px + raio*Math.cos(angulo);
        const y = py + raio*Math.sin(angulo);
        pontos.push(new ponto(x,y));
        angulo+=incremento;
    }
    let nome = nomes.value;
    nome.replace(";",",")
    const PolNovo = new Polygon(nome)
    PolNovo.pontos = pontos
    if(poligonos.length==1 && poligonos[0].pontos.length==0)
    {
        poligonos.pop();
        atualizarUI();
    }
	poligonos.push(PolNovo);

	selecionar(poligonos.length-1);
    atualizarUI();

}
function adicionarPerfilElipsoidal()
{
    const janelaPerfil = document.getElementById("perfilElipsoidal")
    const [nomes,apr,rx,ry,pxs,pys] = janelaPerfil.getElementsByTagName("input");

    const raiox = Number(rx.value);
    const raioy = Number(ry.value);
    const aproximacao = parseInt(apr.value);
    const px = Number(pxs.value);
    const py = -Number(pys.value);

    if(temNulos([raiox,raioy,aproximacao]))
    {
        alert("Não pode ter lados nulos")
        return;
    }
    if(temNaN([raiox,raioy,aproximacao,px,py]))
    {
        alert("Valores invalidos");
        return;
    }
    fecharJanela("#novoPoligono")
    fecharJanela("#perfilElipsoidal")

    const pontos = [];
    let angulo = 0;
    const incremento = 2*Math.PI/aproximacao;
    for(let i=0;i<aproximacao;i++)
    {
        const x = px + raiox*Math.cos(angulo);
        const y = py + raioy*Math.sin(angulo);
        pontos.push(new ponto(x,y));
        angulo+=incremento;
    }
    let nome = nomes.value;
    nome.replace(";",",")
    const PolNovo = new Polygon(nome)
    PolNovo.pontos = pontos
    if(poligonos.length==1 && poligonos[0].pontos.length==0)
    {
        poligonos.pop();
        atualizarUI();
    }
	poligonos.push(PolNovo);

	selecionar(poligonos.length-1);
    atualizarUI();

}


function temNulos(lista)
{
    for(elm of lista)
    {
        if(elm===0)
        {
            return true;
        }
    }
    return false;
}
function temNaN(lista)
{
    for(elm of lista)
    {
        if(Number.isNaN(elm))
        {
            return true;
        }
    }
    return false;
}
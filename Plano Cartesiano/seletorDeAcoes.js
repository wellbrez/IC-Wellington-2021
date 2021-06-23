
function criarPonto(tempo,objx,objy,poligono)
{  
    let pontoInicialX,pontoInicialY;
    let qtdPontos = poligono.pontos.length;
    if(qtdPontos>=3)
    {
        let indicePonto=0;
        let indiceRetaMaisProxima=0;
        let distanciaRetaMaisProxima;
        let menorDistanciaAoMeioDaReta;
        while(indicePonto<qtdPontos)
        {
            
            let i1 = ajustarIndiceAoIntervalo(indicePonto,poligono.pontos)
            let i2 = ajustarIndiceAoIntervalo(indicePonto+1,poligono.pontos)

            let meiodaretax = (poligono.pontos[i1].x + poligono.pontos[i2].x)/2;
            let meiodaretay = (poligono.pontos[i1].y + poligono.pontos[i2].y)/2;
            let distanciaPontoAoMeioDaReta = Math.sqrt((objx - meiodaretax)**2 + (objy - meiodaretay)**2)

            ux = -poligono.pontos[i1].x + poligono.pontos[i2].x;
            uy = -poligono.pontos[i1].y + poligono.pontos[i2].y;
            vx = objx - poligono.pontos[i1].x;
            vy = objy - poligono.pontos[i1].y;
            let norma = Math.sqrt(ux**2+uy**2);
            let t = (ux*vx + uy*vy)/norma;
            if(t<0)
            {t=0;}
            else if(t>norma)
            {t=norma;}
            let pix = poligono.pontos[i1].x + t*ux/norma;
            let piy = poligono.pontos[i1].y + t*uy/norma;
            //console.log(`calculo: ${Math.sqrt((pix - objx)**2 + (piy - objy)**2)}`)
            let distanciaPontoAReta = Math.sqrt((pix - objx)**2 + (piy - objy)**2)
            //console.log(`reta ${indicePonto} com distanciapontoareta ${distanciaPontoAReta}`)
            if(indicePonto==0 || distanciaPontoAReta<=distanciaRetaMaisProxima)
            {
                if(distanciaPontoAReta==distanciaRetaMaisProxima)
                {
                    if(distanciaPontoAoMeioDaReta<menorDistanciaAoMeioDaReta)
                    {
                        menorDistanciaAoMeioDaReta = distanciaPontoAReta;
                        indiceRetaMaisProxima = indicePonto;
                        pontoInicialX = pix;
                        pontoInicialY = piy;
                    }
                }
                else
                {
                    distanciaRetaMaisProxima=distanciaPontoAReta;
                    indiceRetaMaisProxima = indicePonto;
                    pontoInicialX = pix;
                    pontoInicialY = piy;
                    menorDistanciaAoMeioDaReta = distanciaPontoAoMeioDaReta;
                }

                //console.log(pix);
                //console.log(piy)
            }

            indicePonto++;
        }
        //console.log(indiceRetaMaisProxima);
        let pontoTemporario = new ponto(pontoInicialX,pontoInicialY,objx,objy,tempo);
        poligono.pontos.splice(indiceRetaMaisProxima+1,0,pontoTemporario);
        pontoAssociado = pontoTemporario;

    }
    else if(qtdPontos==2)
    {
        let ux = -poligono.pontos[0].x + poligono.pontos[1].x;
        let uy = -poligono.pontos[0].y + poligono.pontos[1].y;
        let vx = objx - poligono.pontos[0].x;
        let vy = objy - poligono.pontos[0].y;
        let norma = Math.sqrt(ux**2+uy**2);
        let t = (ux*vx + uy*vy)/norma;
        if(t<0)
        {t=0;}
        else if(t>norma)
        {t=norma;}
        pontoInicialX = poligono.pontos[0].x + t*ux/norma;
        pontoInicialY = poligono.pontos[0].y + t*uy/norma;

        //this.incrementox = (objx - pontoInicialX)/tempo;
        //this.incrementoy = (objy - pontoInicialY)/tempo;
        //console.log(pontoInicialX)
        let pontoTemporario = new ponto(pontoInicialX,pontoInicialY,objx,objy,tempo);

        poligono.pontos.splice(-2,0,pontoTemporario);
        pontoAssociado = pontoTemporario;
    }
    else if(qtdPontos<=1)
    {
        let pontoTemporario = new ponto(objx,objy,objx,objy,tempo);
        poligono.pontos.push(pontoTemporario);
        pontoAssociado = pontoTemporario;
    }
}

function adicionarPoligono()
{
    let nome = prompt("Digite o nome do poligono");
    nome.replace(";",",")
	poligonos.push(new Polygon(nome));
	selecionar(poligonos.length-1);
    atualizarUI();
	
}
function excluirPoligono()
{
    let id = poligonoSelecionado;
    let certeza = confirm(`Tem certeza de que deseja excluir o Polígono ${id} ?`)
    if(certeza)
    {
        poligonos.splice(id,1);
        document.getElementById(`Pol${id}`).remove();
    }
    if(poligonoSelecionado==id)
    {
        selecionar(poligonoSelecionado-1);
    }
    atualizarUI();
}
function selecionar(id)
{
	desSelecionarPontos();
	for(pol of poligonos)
	{
		pol.selected = false;
	}
		poligonoSelecionado = id;
		poligonos[id].selected = true;
	
	
	atualizarUI();
}
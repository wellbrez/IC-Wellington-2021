function ponto(x,y,objetivox,objetivoy,tempo)
{
    this.x=x;
    this.y=y;
    this.objetivox = objetivox;
    this.objetivoy = objetivoy;
    this.cor = corBolha;
    this.tempo = tempo;
    this.incrementox = (this.objetivox - this.x)/this.tempo;
    this.incrementoy = (this.objetivoy - this.y)/this.tempo;
    this.ativo = false;
    this.size = 10;
    //console.log(`x=${x}, y=${y}, objetivox = ${objetivox}, objetivoy = ${objetivoy}, incrementox = ${this.incrementox}`)
    this.desenhar = function()
    {
        sketch.push()
		sketch.stroke(corContorno)
		sketch.strokeWeight(4)
		sketch.ellipseMode(sketch.CENTER)
		sketch.fill(this.cor)
        sketch.ellipse(pixelX(this.x),pixelY(this.y),this.size,this.size)
        sketch.pop()
    }
    this.animar = function()
    {
        if(this.tempo>0)
        {
            this.x+=this.incrementox;
            this.y+=this.incrementoy;
            this.tempo-=1;
            atualizarUI();
            //console.log(`movi com incremento ${this.incrementox}`);
        }
        
    }
    this.mover = function(objx,objy)
    {
        this.x = objx;
        this.y = objy;
        this.tempo = 0;
        this.incrementox = 0;
        this.incrementoy = 0;
    }
    this.selecionar = function()
    {
        desSelecionarPontos();
        this.ativo = true;
        this.cor = 'white';
        this.size=20;
        pontoAtivo = this;
        
    }
    this.desSelecionar = function()
    {
        this.ativo = false;
        this.cor = corBolha;
        this.size=10;
    }
    this.criarAnimacao = function(objx,objy,tempo)
    {
        this.objetivox = objx;
        this.objetivoy = objy;
        this.tempo = tempo;
        this.incrementox = (this.objetivox - this.x)/this.tempo
        this.incrementoy = (this.objetivoy - this.y)/this.tempo
    }
}

function tocouNoPonto(pixelx,pixely)
{
    let pontoTemporario= null;
    let proximidade = 20;
    
    for(pt of poligonos[poligonoSelecionado].pontos)
    {
        dx = pixelX(pt.x)-correcaoPixelX(pixelx);
        dy = pixelY(pt.y)-correcaoPixelY(pixely);
        d2 = dx**2+dy**2
        if(d2 < proximidade**2)
        {
            pontoTemporario = pt;
        }             
    }

    return pontoTemporario;
}
function desSelecionarPontos()
{
    for(let poligono of poligonos)
    {
        for(let ponto of poligono.pontos)
        {
            ponto.desSelecionar();
        }
    }
}
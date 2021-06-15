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
    //console.log(`x=${x}, y=${y}, objetivox = ${objetivox}, objetivoy = ${objetivoy}, incrementox = ${this.incrementox}`)
    this.desenhar = function()
    {
        sketch.push()
		sketch.stroke(corContorno)
		sketch.strokeWeight(4)
		sketch.ellipseMode(sketch.CENTER)
		sketch.fill(this.cor)
        sketch.ellipse(pixelX(this.x),pixelY(this.y),10,10)
        sketch.pop()
    }
    this.animar = function()
    {
        if(this.tempo>0)
        {
            this.x+=this.incrementox;
            this.y+=this.incrementoy;
            this.tempo-=1;
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
}
function transicaoPoligono(tempo,objx,objy,tipo,poligono)
{
	this.tempo = tempo;
    this.pontoAssociado;
	this.objetivox = objx;
	this.objetivoy = objy;
	this.tipo = tipo;
	this.ended = false;
	this.poligono = poligono;

	this.setup = function()
	{
		if(this.tipo=="add")
		{
            let qtdPontos = this.poligono.pontos.length;
            if(qtdPontos>=3)
            {
                let indicePonto=0;
                let indiceRetaMaisProxima=0;
                let distanciaRetaMaisProxima;
				let menorDistanciaAoMeioDaReta;
                while(indicePonto<qtdPontos)
                {
					
                    let i1 = ajustarIndiceAoIntervalo(indicePonto,this.poligono.pontos)
                    let i2 = ajustarIndiceAoIntervalo(indicePonto+1,this.poligono.pontos)

					let meiodaretax = (this.poligono.pontos[i1].x + this.poligono.pontos[i2].x)/2;
					let meiodaretay = (this.poligono.pontos[i1].y + this.poligono.pontos[i2].y)/2;
					let distanciaPontoAoMeioDaReta = Math.sqrt((this.objetivox - meiodaretax)**2 + (this.objetivoy - meiodaretay)**2)

                    ux = -this.poligono.pontos[i1].x + this.poligono.pontos[i2].x;
			        uy = -this.poligono.pontos[i1].y + this.poligono.pontos[i2].y;
			        vx = this.objetivox - this.poligono.pontos[i1].x;
			        vy = this.objetivoy - this.poligono.pontos[i1].y;
                    let norma = Math.sqrt(ux**2+uy**2);
                    let t = (ux*vx + uy*vy)/norma;
                    if(t<0)
                    {t=0;}
                    else if(t>norma)
                    {t=norma;}
                    let pix = this.poligono.pontos[i1].x + t*ux/norma;
                    let piy = this.poligono.pontos[i1].y + t*uy/norma;
                    //console.log(`calculo: ${Math.sqrt((pix - this.objetivox)**2 + (piy - this.objetivoy)**2)}`)
                    let distanciaPontoAReta = Math.sqrt((pix - this.objetivox)**2 + (piy - this.objetivoy)**2)
                    //console.log(`reta ${indicePonto} com distanciapontoareta ${distanciaPontoAReta}`)
                    if(indicePonto==0 || distanciaPontoAReta<=distanciaRetaMaisProxima)
                    {
						if(distanciaPontoAReta==distanciaRetaMaisProxima)
						{
							if(distanciaPontoAoMeioDaReta<menorDistanciaAoMeioDaReta)
							{
								menorDistanciaAoMeioDaReta = distanciaPontoAReta;
								indiceRetaMaisProxima = indicePonto;
                        		this.pontoInicialX = pix;
			            		this.pontoInicialY = piy;
							}
						}
						else
						{
                        	distanciaRetaMaisProxima=distanciaPontoAReta;
                        	indiceRetaMaisProxima = indicePonto;
                        	this.pontoInicialX = pix;
			            	this.pontoInicialY = piy;
							menorDistanciaAoMeioDaReta = distanciaPontoAoMeioDaReta;
						}

                        //console.log(pix);
                        //console.log(piy)
                    }

                    indicePonto++;
                }
                //console.log(indiceRetaMaisProxima);
                let pontoTemporario = new ponto(this.pontoInicialX,this.pontoInicialY,this.objetivox,this.objetivoy,this.tempo);
                this.poligono.pontos.splice(indiceRetaMaisProxima+1,0,pontoTemporario);
                this.pontoAssociado = pontoTemporario;

			    //this.incrementox = (this.objetivox -this.pontoInicialX)/this.tempo;
			    //this.incrementoy = (this.objetivoy -this.pontoInicialY)/this.tempo;
                
                /*for (tsc of this.poligono.transicoes)
			    {
				    if(tsc.pt1>=this.pt1)
				    {
				    	tsc.pt1+=2;
				    	tsc.pt2+=2;
				    }
                }*/
            }
            else if(qtdPontos==2)
            {
                let ux = -this.poligono.pontos[0].x + this.poligono.pontos[1].x;
			    let uy = -this.poligono.pontos[0].y + this.poligono.pontos[1].y;
			    let vx = this.objetivox - this.poligono.pontos[0].x;
			    let vy = this.objetivoy - this.poligono.pontos[0].y;
                let norma = Math.sqrt(ux**2+uy**2);
                let t = (ux*vx + uy*vy)/norma;
                if(t<0)
                {t=0;}
                else if(t>norma)
                {t=norma;}
			    this.pontoInicialX = this.poligono.pontos[0].x + t*ux/norma;
			    this.pontoInicialY = this.poligono.pontos[0].y + t*uy/norma;

                //this.incrementox = (this.objetivox - this.pontoInicialX)/this.tempo;
			    //this.incrementoy = (this.objetivoy - this.pontoInicialY)/this.tempo;
                //console.log(this.pontoInicialX)
                let pontoTemporario = new ponto(this.pontoInicialX,this.pontoInicialY,this.objetivox,this.objetivoy,this.tempo);

                this.poligono.pontos.splice(-2,0,pontoTemporario);
			    this.pontoAssociado = pontoTemporario;
            }
            else if(qtdPontos<=1)
			{
                let pontoTemporario = new ponto(this.objetivox,this.objetivoy,this.objetivox,this.objetivoy,this.tempo);
				this.poligono.pontos.push(pontoTemporario);
                this.pontoAssociado = pontoTemporario;
			}

		}
	}
	this.attframe = function()
	{
		if(this.tempo>0)
		{
			this.tempo-=1;
			this.pontoAssociado.mover();
			atualizarUI();
			
		}
		else if(this.tempo==0 && this.tipo=="delete")
		{
			this.poligono.pontos.splice(this.pt1,2)

			for (tsc of this.poligono.transicoes)
			{
				if(tsc.pt1>this.pt1)
				{
					tsc.pt1-=2;
					tsc.pt2-=2;
				}
			}

			this.ended = true;
		}
		else
		{
			this.ended = true;
		}

	}
}
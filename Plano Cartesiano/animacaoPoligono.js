function transicaoPoligono(tempo,pt1,pt2,obj1,obj2,tipo,poligono)
{
	this.tempo = tempo;
	this.pt1 = pt1;
	this.pt2 = pt2;
	this.objetivox = obj1;
	this.objetivoy = obj2;
	this.tipo = tipo;
	this.ended = false;
	this.incrementox;
	this.incrementoy;
	this.poligono = poligono;

	this.setup = function()
	{
		if(this.tipo=="add")
		{
            let qtdPontos = this.poligono.pontos.length/2;
            if(qtdPontos>=3)
            {
                let qtdRetas = qtdPontos;
                let reta=0;
                let indiceCoordenada=0;
                let indiceRetaMaisProxima=0;
                let distanciaRetaMaisProxima;
                while(reta<qtdRetas)
                {
                    let ix = ajustarIndiceAoIntervalo(indiceCoordenada,this.poligono.pontos);
			        let iy = ajustarIndiceAoIntervalo(indiceCoordenada+1,this.poligono.pontos);
			        let ix2 = ajustarIndiceAoIntervalo(indiceCoordenada+2,this.poligono.pontos);
			        let iy2 = ajustarIndiceAoIntervalo(indiceCoordenada+3,this.poligono.pontos);
                    ux = -this.poligono.pontos[ix] + this.poligono.pontos[ix2];
			        uy = -this.poligono.pontos[iy] + this.poligono.pontos[iy2];
			        vx = this.objetivox - this.poligono.pontos[ix];
			        vy = this.objetivoy - this.poligono.pontos[iy];
                    let norma = Math.sqrt(ux**2+uy**2);
                    let t = (ux*vx + uy*vy)/norma;
                    if(t<0)
                    {t=0;}
                    else if(t>norma)
                    {t=norma;}
                    let pix = this.poligono.pontos[ix] + t*ux/norma;
                    let piy = this.poligono.pontos[iy] + t*uy/norma;
                    console.log(`calculo: ${Math.sqrt((pix - this.objetivox)**2 + (piy - this.objetivoy)**2)}`)
                    let distanciaPontoAReta = Math.sqrt((pix - this.objetivox)**2 + (piy - this.objetivoy)**2)
                    console.log(`reta ${reta} com distanciapontoareta ${distanciaPontoAReta}`)
                    if(reta==0 || distanciaPontoAReta<=distanciaRetaMaisProxima)
                    {
                        distanciaRetaMaisProxima=distanciaPontoAReta;
                        indiceRetaMaisProxima = reta;
                        this.pontoInicialX = pix;
			            this.pontoInicialY = piy;
                        console.log(pix);
                        console.log(piy)
                    }

                    indiceCoordenada+=2;
                    reta+=1;
                }
                console.log(indiceRetaMaisProxima);
                this.poligono.pontos.splice(indiceRetaMaisProxima*2+2,0,this.pontoInicialX,this.pontoInicialY);
                
                this.pt1 = indiceRetaMaisProxima*2;
                this.pt2 = indiceRetaMaisProxima*2+1;

			    this.incrementox = (this.objetivox -this.pontoInicialX)/this.tempo;
			    this.incrementoy = (this.objetivoy -this.pontoInicialY)/this.tempo;
                
                for (tsc of this.poligono.transicoes)
			    {
				    if(tsc.pt1>=this.pt1)
				    {
				    	tsc.pt1+=2;
				    	tsc.pt2+=2;
				    }
                }
            }
            else if(qtdPontos==2)
            {
                indiceCoordenada = 0;
                let ix = ajustarIndiceAoIntervalo(indiceCoordenada,this.poligono.pontos);
			    let iy = ajustarIndiceAoIntervalo(indiceCoordenada+1,this.poligono.pontos);
			    let ix2 = ajustarIndiceAoIntervalo(indiceCoordenada+2,this.poligono.pontos);
			    let iy2 = ajustarIndiceAoIntervalo(indiceCoordenada+3,this.poligono.pontos);
                ux = -this.poligono.pontos[ix] + this.poligono.pontos[ix2];
			    uy = -this.poligono.pontos[iy] + this.poligono.pontos[iy2];
			    vx = this.objetivox - this.poligono.pontos[ix];
			    vy = this.objetivoy - this.poligono.pontos[iy];
                let norma = Math.sqrt(ux**2+uy**2);
                let t = (ux*vx + uy*vy)/norma;
                if(t<0)
                {t=0;}
                else if(t>norma)
                {t=norma;}
			    this.pontoInicialX = this.poligono.pontos[ix] + t*ux/norma;
			    this.pontoInicialY = this.poligono.pontos[iy] + t*uy/norma;

                this.poligono.pontos.splice(-2,0,this.pontoInicialX,this.pontoInicialY);
			    this.incrementox = (this.objetivox - this.pontoInicialX)/this.tempo;
			    this.incrementoy = (this.objetivoy - this.pontoInicialY)/this.tempo;
                this.pt1 = 2;
                this.pt2 = 3;
            }
            else if(qtdPontos==0)
			{
				this.poligono.pontos.push(this.objetivox,this.objetivoy);
				this.incrementox = 0;
				this.incrementoy = 0;
			}
			else
			{
				this.poligono.pontos.splice(this.pt1,0,this.objetivox,this.objetivoy);
				this.incrementox = 0;
				this.incrementoy = 0;
			}




			/*if(this.poligono.pontos.length>=4)
			{
			let ix1 = ajustarIndiceAoIntervalo(pt1-2,this.poligono.pontos)
			let iy1 = ajustarIndiceAoIntervalo(pt2-2,this.poligono.pontos)
			let ix2 = ajustarIndiceAoIntervalo(pt1,this.poligono.pontos)
			let iy2 = ajustarIndiceAoIntervalo(pt2,this.poligono.pontos)

			let midpointx = (this.poligono.pontos[ix1]+this.poligono.pontos[ix2])/2;
			let midpointy = (this.poligono.pontos[iy1]+this.poligono.pontos[iy2])/2;
			this.poligono.pontos.splice(this.pt1,0,midpointx,midpointy);
			this.incrementox = (this.objetivox -midpointx)/this.tempo;
			this.incrementoy = (this.objetivoy -midpointy)/this.tempo;
			}
			else if(this.poligono.pontos.length==0)
			{
				this.poligono.pontos.push(this.objetivox,this.objetivoy);
				this.incrementox = 0;
				this.incrementoy = 0;
			}
			else
			{
				this.poligono.pontos.splice(this.pt1,0,this.objetivox,this.objetivoy);
				this.incrementox = 0;
				this.incrementoy = 0;
			}
            */
			/*
			}*/


		}
	}
	this.attframe = function()
	{
		if(this.tempo>0)
		{
			this.tempo-=1;
			this.poligono.pontos[this.pt1]+=this.incrementox;
			this.poligono.pontos[this.pt2]+=this.incrementoy;
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
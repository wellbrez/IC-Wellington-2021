function Polygon(nome,pontos)
{
    this.nome = (nome==null ? "" : nome);
    this.pontos = (pontos==null ? [] : pontos);
	this.objetivos = this.pontos;
	this.selected = false;
	this.color = sketch.color(sketch.random(0,255),sketch.random(0,255),sketch.random(0,255));
	this.area = 0;
	this.transicoes = [];
    

	this.definir_inicio_da_animacao_de_ajuste = function()
	{
		this.midpointx = (this.objetivos[0]+this.objetivos[this.objetivos.length-4])/2
		this.midpointy = (this.objetivos[0]+this.objetivos[this.objetivos.length-3])/2
	}
	
	this.add_ponto_por_pixel = function(posx,posy,index)
	{
		console.log(this);
		if(index==undefined)
		{
			this.transicoes.push(new transicao(
				60,
				this.pontos.length,
				this.pontos.length+1,
				posicao_do_pixel_x(posx),
				posicao_do_pixel_y(posy),
				"add",
				this))
			this.transicoes[this.transicoes.length-1].setup();
			//this.objetivos.push(posicao_do_pixel_x(posx));
			//this.objetivos.push(posicao_do_pixel_y(posy));
		}
	}
	this.add_ponto_por_coordenada = function(posx,posy)
	{
		if(index==undefined)
		{
			this.transicoes.push(new transicao(
				60,
				this.pontos.length,
				this.pontos.length+1,
				posx,
				posy,
				"add",
				this))
			this.transicoes[this.transicoes.length-1].setup();
			//this.objetivos.push(posicao_do_pixel_x(posx));
			//this.objetivos.push(posicao_do_pixel_y(posy));
		}
		//this.objetivos.push(posx);
		//this.objetivos.push(posy);
	}
	/*this.adjusting = function()
	{
		//console.log('adjusting');
		for(coordenada of this.pontos)
		adjtime-=1;
		sketch.fill(corPoligono)
		sketch.stroke(corContorno)
		sketch.strokeWeight(4)
		sketch.beginShape()
		for(i=0;i<this.pontos.length-2;i+=2)
		{
			sketch.vertex(pixelX(this.pontos[i]),pixelY(this.pontos[i+1]));

		//console.log(i)
		}
		vary = sketch.map(adjtime,0,20,pixelY(this.pontos[i+1]),pixelY(this.midpointy))
		varx = sketch.map(adjtime,0,20,pixelX(this.pontos[i]),pixelX(this.midpointx))
		sketch.vertex(varx,vary);


		//console.log(i)

		sketch.endShape(sketch.CLOSE)
	}*/
	this.atualizar_area = function(override)
	{
		if(override == null)
		{
			somatorio = 0;
			let pttemp = JSON.parse(JSON.stringify(this.pontos));
			
			pttemp.push(pttemp[0]);
			pttemp.push(pttemp[1]);

			for(pt=0;pt<pttemp.length-2;pt+=2)
			{
				somatorio+=pttemp[pt]*pttemp[pt+3]-pttemp[pt+2]*pttemp[pt+1];
				console.log(somatorio);
			}
			this.area = Math.abs(0.5*somatorio);
		}
		else
		{
			this.area = override;
		}
		mostrar_area = true;
	}
	this.bubbledraw = function()
	{
		sketch.push()
		sketch.ellipseMode(sketch.CENTER)
		sketch.fill(corBolha)
		for(i=0;i<this.pontos.length;i+=2)
		{
			sketch.ellipse(pixelX(this.pontos[i]),pixelY(this.pontos[i+1]),10,10)
		}
		sketch.pop()
	}
	this.draw = function()
	{
		sketch.stroke(corContorno)
		sketch.strokeWeight(4)
		if(this.selected)
		{
			sketch.fill(corPoligono)
		}
		else
		{
			sketch.fill(this.color)
		}
		sketch.beginShape()
		for(i=0;i<this.pontos.length;i+=2)
		{
			sketch.vertex(pixelX(this.pontos[i]),pixelY(this.pontos[i+1]));
		}

		sketch.endShape(sketch.CLOSE)
	}
}
function transicao(tempo,pt1,pt2,obj1,obj2,tipo,poligono)
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
			if(this.poligono.pontos.length>=4)
			{
			let ix1 = ajustar_indice_ao_intervalo(pt1-2,this.poligono.pontos)
			let iy1 = ajustar_indice_ao_intervalo(pt2-2,this.poligono.pontos)
			let ix2 = ajustar_indice_ao_intervalo(pt1,this.poligono.pontos)
			let iy2 = ajustar_indice_ao_intervalo(pt2,this.poligono.pontos)

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

			
			
			



			console.log(this.incrementox);
			console.log(this.incrementoy);
			for (tsc of this.poligono.transicoes)
			{
				if(tsc.pt1>this.pt1)
				{
					tsc.pt1+=2;
					tsc.pt2+=2;
				}
			}


		}
	}
	this.attframe = function()
	{
		if(this.tempo>0)
		{
			this.tempo-=1;
			this.poligono.pontos[this.pt1]+=this.incrementox;
			this.poligono.pontos[this.pt2]+=this.incrementoy;
			polygons[0].atualizar_area();
			
		}
		else if(this.tempo==0 && this.tipo=="delete")
		{
			this.poligono.pontos[pt1].splice(pt1,2)

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

function ajustar_indice_ao_intervalo(i,lista)
{
	while(i>=lista.length)
	{
		i-=lista.length;
	}
	while(i<0)
	{
		i+=lista.length;
	}
	return i;
}
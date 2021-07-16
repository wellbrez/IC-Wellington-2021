function atualizarUI()
{

    for (let poligono of poligonos)
    {
        poligono.isValid = true;
        for(let i=0;i<poligono.pontos.length;i++)
        {
            if(!verificarValidade(poligono,i))
            {
                poligono.isValid = false;
            }
        }
        poligono.atualizarPropriedades();
        if (!poligono.isValid)
        {
            pontosDoNucleoCentral = [];
        }
    }


	envoltoria = calcularEnvoltoria();
	desenharEnvoltoria(envoltoria);
    atualizarMenuPoligonos();

    

}
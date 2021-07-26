function Conjunto(nome)
{
    this.nome = nome;
    this.areaTotal=0;
    this.centroideGlobalX=0;
    this.centroideGlobalY=0;
    this.inerciaCanvasX=0;
    this.inerciaCanvasY=0;
    this.maiorInerciaGlobal=0;
    this.menorInerciaGlobal=0;
    this.anguloParaDirecoesPrincipais=0;
    this.IxPrincipal=0;
    this.IyPrincipal=0;
    this.pontosDoNucleoCentral = [];
    this.eixoPrincipalL1 =[];
    this.eixoPrincipalL2 =[];
    this.anguloGlobal = 0;
}
propriedadesGlobais = new Conjunto('global');
propriedadesAreaComprimida = new Conjunto('comprimido');
propriedadesAreaTracionada = new Conjunto();
conjuntoNulo = new Conjunto('nulo');
function calcular_propriedades(poligono)
{
    //Organizar pontos;
    let pontosOrganizados = [...poligono.pontos];
    pontosOrganizados.push(pontosOrganizados[0]);
    let somatorioArea = 0;
    let somatorioCx=0;
    let somatorioCy=0;
    let somatorioIx=0;
    let somatorioIy=0;
    let somatorioIxy=0;
    for(let i=0;i<pontosOrganizados.length-1;i++)
    {
        let xi = pontosOrganizados[i].x;
        let yi = pontosOrganizados[i].y;
        let xi1 = pontosOrganizados[i+1].x;
        let yi1 = pontosOrganizados[i+1].y;
        somatorioArea += (xi*yi1 - xi1*yi);
        somatorioCx += (xi+xi1)*(xi*yi1-xi1*yi);
        somatorioCy += (yi+yi1)*(xi*yi1-xi1*yi);
        let ai = xi*yi1 - xi1*yi;
        //somatorioIx += (yi*yi + yi*yi1 + yi1*yi1)*ai;
        //somatorioIy += (xi*xi + xi*xi1 + xi1*xi1)*ai;
        //somatorioIxy += (xi*yi1 + 2*xi*yi + 2*xi1*yi1 + xi1*yi)*ai
    }
    let area = somatorioArea/2;
    let Cx = somatorioCx/(6*area);
    let Cy = somatorioCy/(6*area);

    for(let i=0;i<pontosOrganizados.length-1;i++)
    {
        let xi = pontosOrganizados[i].x-Cx;
        let yi = pontosOrganizados[i].y-Cy;
        let xi1 = pontosOrganizados[i+1].x-Cx;
        let yi1 = pontosOrganizados[i+1].y-Cy;
        let ai = xi*yi1 - xi1*yi;
        somatorioIx += (yi*yi + yi*yi1 + yi1*yi1)*ai;
        somatorioIy += (xi*xi + xi*xi1 + xi1*xi1)*ai;
        somatorioIxy += (xi*yi1 + 2*xi*yi + 2*xi1*yi1 + xi1*yi)*ai
    }

    let Ix = somatorioIx/12;
    let Iy = somatorioIy/12;
    let Ixy = somatorioIxy/24;
    if(area<0)
    {
        area = -area;
        Ix = -Ix;
        Iy = -Iy;
    }
    poligono.area = area;
    poligono.centroideX = Cx;
    poligono.centroideY = Cy;
    poligono.IxCanvas = Ix;
    poligono.IyCanvas = Iy;
    poligono.IxyCanvas = Ixy;
    return [area,Cx,Cy,Ix,Iy,Ixy]
}
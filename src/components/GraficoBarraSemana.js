import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import '../App.css';
import domtoimage from 'dom-to-image';

class GraficoBarraSemana extends Component{

    constructor(props){
        super(props);
        this.chartReference=React.createRef();
      }


    descargarImagen(id){
      domtoimage.toBlob(window.document.getElementsByClassName(id)[0])
      .then(function(blob) {
        window.saveAs(blob, id+'.png');
      });
    }


      render(){
        var datos = ObtenerVariables(this.props.enlace);
        var identificador =this.props.id;

          return(
            <div className="App">
            <header className="App-header">

            </header>
            <div className= {identificador}>
        <Bar
        data={datos}
        options= {{
            title:{
                display:true,
                text:this.props.titulo,   /* se extrae de de app el titulo del grafico*/
                fontSize:20
              },
              legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                   label: function(tooltipItem) {
                          return tooltipItem.yLabel;
                   }
                }
            },
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false,
                    categorySpacing: 0
                  },
                  stacked: true
                }],
                yAxes: [{
                  display: false,
                  gridLines: {
                    display: false,
                    drawOnChartArea: false
                  },
                  stacked: true,
                  ticks: {
                    beginAtZero: true,
                    stepSize: 10,
                    max: 100
                  }
                }]
              }
        }}/>
 </div>
<button role="button" class="btn btn-outline-secondary btn-lg btn-iconed btn-rounded" onClick={() => console.log("ici") || this.descargarImagen(identificador)}>
           <i class="icon ion-md-arrow-down"></i> <span class="spn">Descargar</span>
		</button>

            </div>);
      }

}


function ObtenerVariables(consulta){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',  consulta,false);
    httpRequest.send();
    var cons =JSON.parse(httpRequest.response);
    var datos = cons.data;
    //console.log(datos);

    var listaDias = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    var lis = [];

    for (var i=0; i<datos.length; i++){;
        lis.push(datos[i].dia);
    }

    for(var j=0; j<listaDias.length; j++){
        if(lis.includes(listaDias[j]) === false){
            datos.push({dia: listaDias[j], numero: 0});
            lis.push(listaDias[j]);
        }
    }

    for(var x=0; x<datos.length; x++){
        switch(datos[x].dia) {
            case "Domingo":
              datos[x].dia = 0
              break;
            case "Lunes":
              datos[x].dia = 1
              break;
            case "Martes":
              datos[x].dia = 2
              break;
            case "Miercoles":
                datos[x].dia = 3
                break;
            case "Jueves":
                datos[x].dia = 4
                break;
            case "Viernes":
                datos[x].dia = 5
                break;
            case "Sabado":
                datos[x].dia = 6
                break;

          }
    }

    var datos_final = [0, 1, 2, 3, 4, 5, 6];
    for(var y=0; y<datos.length;y++){
        datos_final[datos[y].dia] =  datos[y];
    }
    console.log(datos);
    console.log(datos_final)
    const data = {
        labels:listaDias,
        datasets: [
            {
            label: "Porcentaje",
            backgroundColor: 'rgba(165, 76, 120, 1)',
            barThickness: 50,
            data: [datos_final[0].numero.toFixed(2), datos_final[1].numero.toFixed(2), datos_final[2].numero.toFixed(2), datos_final[3].numero.toFixed(2), datos_final[4].numero.toFixed(2), datos_final[5].numero.toFixed(2), datos_final[6].numero.toFixed(2)]
            },
            {
            label: "Porcentaje",
            backgroundColor: 'rgba(220, 221, 222, 1)',
            barThickness: 50,
            data: [100,100,100,100,100,100, 100]
            }
        ]
        };
    return data;
    }

export default GraficoBarraSemana;
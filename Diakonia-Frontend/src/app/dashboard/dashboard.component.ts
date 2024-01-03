import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  nombresInstituciones: string[] = [];
  numeroBeneficiarios: number[] = [];
  totalEstado: string[] = [];
  topInstituciones: string[] = [];
  topBeneficiarios: number[] = [];

  institucionesActivas: number = 0;
  institucionesPasivas: number = 0;

  InstitucionesClasificacion: string[] = [];
  BeneficiariosClasificacion: number[] = [];
  ClasificacionInstituciones: string [] = [];

  listaBeneficiarios: any[][] = [[], []];

  datosCargados = false;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private sharedService: SharedService,
    private router: Router,){

  }


  ngOnInit() {
    //this.getAllInstituciones();
    this.getBeneficiariosXAnio()
    this.getTopDataDashboard();
    this.getClassificationDataDashboard();
    this.getEstadoDataDashboard();
    
    // Las llamadas a chartBarGraphic() y otras funciones de gráficos se han movido a los callbacks de suscripción
  }


  getTopDataDashboard(){
    this.api.DataInstituciones()
    .subscribe({
      next:(res)=>{
        console.log(res[0]);
        let obj = res;
          if (obj) { // Asegúrate de que obj no es undefined
            for (let item of obj) {
              this.nombresInstituciones.push(item.nombre);
              this.numeroBeneficiarios.push(parseFloat(item.numero_beneficiarios));
            }
            console.log(this.nombresInstituciones);
            console.log(this.numeroBeneficiarios);

            let topTres = this.getTopTresInstituciones(this.nombresInstituciones, this.numeroBeneficiarios);

            // Crear nuevas listas para las instituciones y los números de beneficiarios
            this.topInstituciones = topTres.map(x => x.institucion);
            this.topBeneficiarios = topTres.map(x => x.beneficiarios);

            console.log(this.topInstituciones);
            console.log(this.topBeneficiarios);

          } else {
            console.log('No se encontró ningún objeto con id:');
          }
      },
      error:(err)=>{
        alert("Error while fetching the Records!!")
      }
    })
  }

  getTopTresInstituciones(nombresInstituciones: string[], numeroBeneficiarios: number[]) {
    // Crear una lista de objetos donde cada objeto tiene el nombre de la institución y el número de beneficiarios
    let lista = nombresInstituciones.map((institucion, i) => ({ institucion, beneficiarios: numeroBeneficiarios[i] }));

    // Ordenar la lista en orden descendente por el número de beneficiarios
    lista.sort((a, b) => b.beneficiarios - a.beneficiarios);

    // Tomar los primeros tres elementos de la lista ordenada
    return lista.slice(0, 5);
  }

  getClasificacionInstituciones(nombresInstituciones: string[], numeroBeneficiarios: number[]) {
    // Crear una lista de objetos donde cada objeto tiene el nombre de la institución, el número de beneficiarios y la clasificación
    let lista = nombresInstituciones.map((institucion, i) => {
      let clasificacion = '';
      if(numeroBeneficiarios[i] >= 1 && numeroBeneficiarios[i] <= 300){
        clasificacion = "Bronce";
      }
      else if(numeroBeneficiarios[i] >= 301 && numeroBeneficiarios[i] <= 700){
        clasificacion = "Plata";
      }
      else if(numeroBeneficiarios[i] >= 701){
        clasificacion = "Oro";
      }
      this.ClasificacionInstituciones.push(clasificacion);
      return { institucion, beneficiarios: numeroBeneficiarios[i], clasificacion };
    });

    // Ordenar la lista en orden descendente por el número de beneficiarios
    lista.sort((a, b) => b.beneficiarios - a.beneficiarios);

    // Tomar la mejor institución de cada categoría
    let mejorOro = lista.find(x => x.clasificacion === 'Oro') || { institucion: '', beneficiarios: 0, clasificacion: '' };
    let mejorPlata = lista.find(x => x.clasificacion === 'Plata' && x.institucion !== mejorOro.institucion) || { institucion: '', beneficiarios: 0, clasificacion: '' };
    let mejorBronce = lista.find(x => x.clasificacion === 'Bronce' && x.institucion !== mejorOro.institucion && x.institucion !== mejorPlata.institucion) || { institucion: '', beneficiarios: 0, clasificacion: '' };

    // Crear nuevas listas para las instituciones, los números de beneficiarios y las clasificaciones
    this.InstitucionesClasificacion = [mejorOro.institucion, mejorPlata.institucion, mejorBronce.institucion];
    this.BeneficiariosClasificacion = [mejorOro.beneficiarios, mejorPlata.beneficiarios, mejorBronce.beneficiarios];
    this.ClasificacionInstituciones = [mejorOro.clasificacion, mejorPlata.clasificacion, mejorBronce.clasificacion];

    console.log(this.InstitucionesClasificacion);
    console.log(this.BeneficiariosClasificacion);
    console.log(this.ClasificacionInstituciones);
  }

  getClassificationDataDashboard(){
    this.api.DataInstituciones()
    .subscribe({
      next:(res)=>{
        console.log(res[0]);
        let obj = res;
          if (obj) { // Asegúrate de que obj no es undefined
            for (let item of obj) {
              this.nombresInstituciones.push(item.nombre);
              this.numeroBeneficiarios.push(parseFloat(item.numero_beneficiarios));
            }
            console.log(this.nombresInstituciones);
            console.log(this.numeroBeneficiarios);

            let topTres = this.getTopTresInstituciones(this.nombresInstituciones, this.numeroBeneficiarios);

            // Crear nuevas listas para las instituciones y los números de beneficiarios
            this.topInstituciones = topTres.map(x => x.institucion);
            this.topBeneficiarios = topTres.map(x => x.beneficiarios);

            console.log(this.topInstituciones);
            console.log(this.topBeneficiarios);

            this.getClasificacionInstituciones(this.nombresInstituciones, this.numeroBeneficiarios);
            this.chartPolarAreaGraphic(this.topInstituciones, this.topBeneficiarios);
            this.chartBarGraphic(this.InstitucionesClasificacion, this.BeneficiariosClasificacion);
            this.chartLineGraphic();

          } else {
            console.log('No se encontró ningún objeto con id:');
          }
      },
      error:(err)=>{
        alert("Error while fetching the Records!!")
      }
    })
  }

  getEstadoDataDashboard(){
    this.api.DataInstituciones()
    .subscribe({
      next:(res)=>{
        console.log(res);
        let obj = res;
          if (obj) { // Asegúrate de que obj no es undefined
            let totalActivas = 0;
            let totalPasivas = 0;
            for (let item of obj) {
              this.nombresInstituciones.push(item.nombre);
              this.numeroBeneficiarios.push(parseFloat(item.numero_beneficiarios));
              if (item.estado && item.estado[0] && item.estado[0].nombre_estado) {
                this.totalEstado.push(item.estado[0].nombre_estado);
                console.log(item.estado[0].nombre_estado.toLowerCase());
                if (item.estado[0].nombre_estado.toLowerCase() == 'activa') {
                  totalActivas++;
                } else if (item.estado[0].nombre_estado.toLowerCase() == 'pasiva') {
                  totalPasivas++;
                }
              } else {
                console.log('Estado no definido para el ítem:', item);
              }
            }
            console.log(this.totalEstado)
            console.log('Total de instituciones activas: ' + totalActivas);
            console.log('Total de instituciones pasivas: ' + totalPasivas);
            this.institucionesActivas = totalActivas;
            this.institucionesPasivas = totalPasivas;
            this.chartPieGraphic();

          } else {
            console.log('No se encontró ningún objeto con id:');
          }
      },
      error:(err)=>{
        alert("Error while fetching the Records!!")
      }
    })
  }

  async getBeneficiariosXAnio(){
    // let listaBeneficiarios: any[][] = [];
    // //index 0 labels
    // listaBeneficiarios.push([]);
    // //index 1 data
    // listaBeneficiarios.push([]); const resp: any = await this.historiaService.getAntecedentesSinCambios(this.secuenciaAtencion).toPromise();
    try {
      this.datosCargados = false;
      const resp: any = await this.api.getBeneficiariosXAnio()
      .subscribe({
        next: (data: any) => {
          let obj = data;
            if (obj) { // Asegúrate de que obj no es undefined
              console.log('Beneficiarios por anio', obj)
              for(let i of obj){
                console.log(i['anio'])
                this.listaBeneficiarios[0].push(i['anio']);
                this.listaBeneficiarios[1].push(i['numero_beneficiarios']);
      
              }
              console.log(this.listaBeneficiarios)
              this.chartLineGraphic();
              
      
            }
         
        }
      })
      

      this.datosCargados = true
    } catch (error) {
      console.log(error);
      
    }
  }

  chartBarGraphic(labels: string[], data: number[]){
    let myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Total De Beneficiarios',
              data: data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Mejores Instituciones Sociales Oro, Plata y Bronce',
                    font: {
                      size: 24  // Cambia esto al tamaño de fuente que desees
                    }
                }
            }
      }
    });
    myChart.update();
}


  chartPieGraphic() {
    new Chart("myPieChart", {
        type: 'pie',
        data: {
            labels: ['Activas', 'Inactivas'],
            datasets: [{
                label: 'Cantidad total',
                data: [this.institucionesActivas, this.institucionesPasivas],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Total De Instituciones Sociales Por Estado',
                    font: {
                      size: 24  // Cambia esto al tamaño de fuente que desees
                    }
                }
            }
        },
    });
}

chartLineGraphic() {
  new Chart("myLineChart", {
      type: 'line',
      data: {
          labels: this.listaBeneficiarios[0],//['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
          datasets: [{
              label: 'Número De Beneficiarios Por Año',
              data: this.listaBeneficiarios[1],//[650, 359, 280, 181, 256, 355, 140],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
          }]
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
              title: {
                  display: true,
                  text: 'Balance De Beneficiarios Por Año',
                  font: {
                    size: 24  // Cambia esto al tamaño de fuente que desees
                  }
              }
          }
      },
  });
}


chartPolarAreaGraphic(labels: string[], data: number[]) {
  new Chart("myPolarAreaChart", {
      type: 'polarArea',
      data: {
          labels: labels,
          datasets: [{
              label: 'Total De Beneficiarios',
              data: data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
              title: {
                  display: true,
                  text: 'Top 5 De Mejores Instituciones Sociales',
                  font: {
                    size: 24  // Cambia esto al tamaño de fuente que desees
                  }
              }
          }
      },
  });
}



}

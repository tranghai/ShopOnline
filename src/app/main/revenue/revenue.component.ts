import { Component, OnInit, ViewChild  } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { DataService } from '../../core/services/data.service';
import { DecimalPipe } from '@angular/common';

declare var moment: any;
@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {

  public fromDate: string = '';
  public toDate: string = '';
  public tableData: any[];
  constructor(private _dataService: DataService) {
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  public lineChartData: Array<any> = [
    { data: [], label: 'Doanh thu' }
  ];

  public lineChartLabels: Array<any> = [];
  
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
   // events
   public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  ngOnInit() {
    this.loadRevenues();
  }
  refreshChart() {
    setTimeout(() => {

      if (this.chart && this.chart.chart && this.chart.chart.config) {
        this.chart.chart.config.data.labels = this.lineChartLabels;
        this.chart.chart.config.data.datasets = this.lineChartData;
        this.chart.chart.update();
      }
    });
  }
  loadRevenues() {
    this._dataService.get('/api/statistic/getrevenue?fromDate=' + this.fromDate + '&toDate=' + this.toDate)
      .subscribe((response: any[]) => {
        this.lineChartLabels = [];
        this.lineChartData = [];
        var revenue = { data: [], label: 'Doanh thu' };
        this.tableData = [];
        for (let item of response) {

          revenue.data.push(item.Revenues);
          this.lineChartLabels.push(moment(item.Date).format('DD/MM/YYYY'));
          //push to table
          this.tableData = response;

        }
        this.lineChartData.push(revenue);

        this.refreshChart();
      });
  }
}

import { Component, ViewChild, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UserService } from "../../services/user.service";
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './graphic-bar.component.html',
})
export class BarChartComponent {
  @Input('usuarioArray') usuarioArray: Array<any> = [];
  @Input() btnClass: string = 'btn-primary';
  public laberlUser: any = [];
  public valuelUser: any = [];
  constructor(
    private _userService: UserService) { }

  ngOnInit(): void {
    this.setValues()
  }

  ngAfterViewInit(): void {
    this.chart?.update();
  }

  setValues() {
    this.usuarioArray.map((item: any) => {
      this.laberlUser.push(item.login);
    });

    this.usuarioArray.map((item: any) => {
      this.valuelUser.push(item.followers);
    });

    this.chart?.update();
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: this.laberlUser,
    datasets: [
      { data: this.valuelUser, label: 'Seguidores' }
    ],
  };

  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
  }

  public randomize(): void {

    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }
}

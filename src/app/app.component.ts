import { Component } from '@angular/core';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [ChartDataLabels];

  public barChartOptions: ChartOptions = {
    scales: { x: { stacked: true } },
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: model => {
            if (model.datasetIndex === 0) {
              return `${model.dataset.label} ${model.formattedValue}`;
            }

            const index = model.dataIndex;
            const data = model.dataset.data;
            const values = data[index];
            const value = Math.abs(values[0] - values[1]);

            return `${model.dataset.label} ${value}`;
          }
        }
      },
      datalabels: {
        // labels: this.labelsOption,
        formatter: function(value, context) {
          if (context.datasetIndex === 0) {
            return `${value}`;
          }
          const sign = context.datasetIndex === 1 ? '+' : '-';
          const _value = Math.abs(value[0] - value[1]);

          if (_value === 0) {
            return ``;
          }
          return `${sign}${_value}`;
        }
      }
    }
  };

  public barChartLabels: Label[] = [
    `08:00 - 09:00`,
    `09:00 - 10:00`,
    `11:00 - 12:00`,
    `12:00 - 13:00`,
    `14:00 - 15:00`,
    `16:00 - 17:00`
  ];

  public barChartData = [
    {
      data: [3, 4, 4, 6, 8, 3],
      type: 'line',
      label: 'Target',
      backgroundColor: 'black',
      borderColor: 'black',
      hoverBackgroundColor: 'black',
      hoverBorderColor: 'black',
      borderDash: [5, 5],
      pointRadius: 10,
      pointHoverRadius: 12,
      pointHitRadius: 20,
      datalabels: {
        color: 'white'
      }
    },
    {
      label: 'More',
      data: [[11, 3], [6, 4], [7, 4], [9, 6], [9, 8], [5, 3]],
      backgroundColor: '#36a2eb',
      borderColor: '#36a2eb',
      hoverBackgroundColor: '#36a2eb',
      hoverBorderColor: '#36a2eb',
      barThickness: 30,
      datalabels: {
        color: 'white'
      }
    },
    {
      label: 'Less',
      data: [[1, 3], [0, 4], [3, 4], [1, 6], [3, 8], [3, 3]],
      backgroundColor: '#ff6384',
      borderColor: '#ff6384',
      hoverBackgroundColor: '#ff6384',
      hoverBorderColor: '#ff6384',
      barThickness: 30,
      datalabels: {
        color: 'white'
      }
    }
  ];

  constructor() {}

  ngOnInit() {
    Chart.defaults.font.family = 'Roboto, "Helvetica Neue", Arial, sans-serif';
  }
}

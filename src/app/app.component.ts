import { Component } from '@angular/core';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const VALUES = [
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 00:00:00',
    endtime: '2021-08-31 01:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 01:00:00',
    endtime: '2021-08-31 02:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 02:00:00',
    endtime: '2021-08-31 03:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 03:00:00',
    endtime: '2021-08-31 04:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 04:00:00',
    endtime: '2021-08-31 05:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 05:00:00',
    endtime: '2021-08-31 06:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 06:00:00',
    endtime: '2021-08-31 07:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 07:00:00',
    endtime: '2021-08-31 08:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 08:00:00',
    endtime: '2021-08-31 09:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 09:00:00',
    endtime: '2021-08-31 10:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 10:00:00',
    endtime: '2021-08-31 11:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 11:00:00',
    endtime: '2021-08-31 12:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 12:00:00',
    endtime: '2021-08-31 13:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 13:00:00',
    endtime: '2021-08-31 14:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 14:00:00',
    endtime: '2021-08-31 15:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 15:00:00',
    endtime: '2021-08-31 16:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 16:00:00',
    endtime: '2021-08-31 17:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 17:00:00',
    endtime: '2021-08-31 18:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 18:00:00',
    endtime: '2021-08-31 19:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 19:00:00',
    endtime: '2021-08-31 20:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 20:00:00',
    endtime: '2021-08-31 21:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 21:00:00',
    endtime: '2021-08-31 22:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 22:00:00',
    endtime: '2021-08-31 23:00:00'
  },
  {
    more: 1,
    less: 1,
    target: 1,
    starttime: '2021-08-31 23:00:00',
    endtime: '2021-09-01 00:00:00'
  }
];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [ChartDataLabels];

  private allValues = VALUES.map(a => {
    a.target = this.getRandomInt(0, 30);
    a.less = this.getRandomInt(0, 30);
    a.more = this.getRandomInt(0, 30);
    return a;
  });

  public randomize() {
    this.allValues = VALUES.map(a => {
      a.target = this.getRandomInt(0, 30);
      a.less = this.getRandomInt(0, 30);
      a.more = this.getRandomInt(0, 30);
      return a;
    });
  }

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

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getLabels(data: any[]): string[] {
    return data.map(
      d =>
        `${d.starttime
          .toString()
          .substring(11, 16)} - ${d.endtime.toString().substring(11, 16)}`
    );
  }

  private getTargets(data: any[]): number[] {
    return data.map(d => d.target);
  }

  private getMore(tagets: number[], data: any[]): [number, number][] {
    return data.map((d, i) => [tagets[i] + d.more, tagets[i]]);
  }

  private getLess(tagets: number[], data: any[]): [number, number][] {
    return data.map((d, i) => [tagets[i] - d.less, tagets[i]]);
  }

  public barChartLabels: Label[] = this.getLabels(this.allValues);

  // data: [3, 4, 4, 6, 8, 3],
  // data: [[11, 3], [6, 4], [7, 4], [9, 6], [9, 8], [5, 3]],
  // data: [[1, 3], [0, 4], [3, 4], [1, 6], [3, 8], [3, 3]],

  public barChartData = [
    {
      data: this.getTargets(this.allValues),
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
      data: this.getMore(this.getTargets(this.allValues), this.allValues),
      label: 'More',
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
      data: this.getLess(this.getTargets(this.allValues), this.allValues),
      label: 'Less',
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

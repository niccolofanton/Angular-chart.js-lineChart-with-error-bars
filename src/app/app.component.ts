import { Component } from '@angular/core';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as perlin from 'perlin-noise';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public entity = false;

  public allValues = perlin.generatePerlinNoise(5, 5).map(a => {
    const value = Math.floor(a * 100);
    return {
      target: value,
      less: this.getRandomInt(0, 10),
      more: this.getRandomInt(0, 10),
      starttime: '2021-08-31 00:00:00',
      endtime: '2021-09-01 00:00:00'
    };
  });
  private targets = this.getTargets(this.allValues);
  private lessValues = this.getLess(
    this.getTargets(this.allValues),
    this.allValues
  );
  private moreValues = this.getMore(
    this.getTargets(this.allValues),
    this.allValues
  );
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [ChartDataLabels];
  public barChartLabels: Label[] = this.getLabels(this.allValues);
  public barChartData = [
    {
      data: this.targets,
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
      tension: 0.45
    },
    {
      data: this.moreValues,
      label: 'More',
      backgroundColor: '#36a2eb',
      borderColor: '#36a2eb',
      hoverBackgroundColor: '#36a2eb',
      hoverBorderColor: '#36a2eb',
      barThickness: 30,
      borderRadius: 5,
      borderSkipped: context => {
        const values = this.lessValues[context.dataIndex];

        if (!values) {
          return false;
        }

        const value = Math.abs(values[0] - values[1]);

        if (value === 0) {
          return false;
        }

        return 'bottom';
      }
    },
    {
      data: this.lessValues,
      label: 'Less',
      backgroundColor: '#ff6384',
      borderColor: '#ff6384',
      hoverBackgroundColor: '#ff6384',
      hoverBorderColor: '#ff6384',
      barThickness: 30,
      borderRadius: 5,
      borderSkipped: context => {
        const values = this.moreValues[context.dataIndex];

        if (!values) {
          return false;
        }

        const value = Math.abs(values[0] - values[1]);

        if (value === 0) {
          return false;
        }

        return 'top';
      }
    }
  ];
  public barChartOptions: ChartOptions = {
    onClick: (a, b) => {
      if (!b || b.length === 0) {
        return;
      }
      const clickedIndex = b[0].index;

      this.entity = !this.entity;
      console.log(this.entity);
    },
    scales: {
      x: { stacked: true, grid: { display: true } },
      y: { offset: true, beginAtZero: false, grid: { display: false } }
    },
    responsive: true,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        usePointStyle: true,
        callbacks: {
          label: model => {
            if (model.datasetIndex === 0) {
              return `${model.dataset.label} ${model.formattedValue}`;
            }

            const index = model.dataIndex;
            const data = model.dataset.data;
            const values = data[index];
            const value = Math.abs(values[0] - values[1]);

            if (model.datasetIndex === 1) {
              const target = this.targets[index];

              return `${model.dataset.label} ${value} ( total: ${target +
                value} )`;
            }

            return `${model.dataset.label} ${value}`;
          }
        }
      },
      datalabels: {
        font: {
          weight: 'bold',
          size: 14
        },
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
        },
        anchor: context =>
          this.switchDatasets(context, ['center', 'end', 'start']),
        align: context =>
          this.switchDatasets(context, ['center', 'end', 'start']),
        color: context =>
          this.switchDatasets(context, ['white', '#36a2eb', '#ff6384']),
        offset: context => this.switchDatasets(context, [0, 10, 10])
      }
    }
  };

  public entityBarChartLabels: Label[] = this.getEntityLabels(this.allValues);
  private entityTargets = this.getTargets(
    this.allValues.map(a => {
      a.target = this.getRandomInt(10, 25);
      return a;
    })
  );
  private entityMoreLessValues = this.getMoreLess(this.allValues);
  private entityLessValues = this.entityMoreLessValues.less;
  private entityMoreValues = this.entityMoreLessValues.more;
  public entityBarChartData = [
    {
      data: this.entityTargets,
      type: 'line',
      label: 'Target',
      backgroundColor: 'black',
      borderColor: 'black',
      hoverBackgroundColor: 'black',
      hoverBorderColor: 'black',
      // borderDash: [5, 5],
      pointRadius: 10,
      pointHoverRadius: 12,
      pointHitRadius: 20,
      // tension: 0.45
      showLine: false
    },
    {
      data: this.entityMoreValues,
      label: 'More',
      backgroundColor: '#36a2eb',
      borderColor: '#36a2eb',
      hoverBackgroundColor: '#36a2eb',
      hoverBorderColor: '#36a2eb',
      barThickness: 30,
      borderRadius: 5,
      borderSkipped: context => {
        const values = this.entityLessValues[context.dataIndex];

        if (!values) {
          return false;
        }

        const value = Math.abs(values[0] - values[1]);

        if (value === 0) {
          return false;
        }

        return 'bottom';
      }
    },
    {
      data: this.entityLessValues,
      label: 'Less',
      backgroundColor: '#ff6384',
      borderColor: '#ff6384',
      hoverBackgroundColor: '#ff6384',
      hoverBorderColor: '#ff6384',
      barThickness: 30,
      borderRadius: 5,
      borderSkipped: context => {
        const values = this.entityMoreValues[context.dataIndex];

        if (!values) {
          return false;
        }

        const value = Math.abs(values[0] - values[1]);

        if (value === 0) {
          return false;
        }

        return 'top';
      }
    }
  ];
  public entityBarChartOptions: ChartOptions = {
    onClick: (a, b) => {
      if (!b || b.length === 0) {
        return;
      }
      const clickedIndex = b[0].index;
      this.entity = !this.entity;
    },
    scales: {
      x: { stacked: true },
      y: { offset: true, beginAtZero: false, grid: { display: false } }
    },
    responsive: true,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        usePointStyle: true,
        callbacks: {
          label: model => {
            if (model.datasetIndex === 0) {
              return `${model.dataset.label} ${model.formattedValue}`;
            }

            const index = model.dataIndex;
            const data = model.dataset.data;
            const values = data[index];
            const value = Math.abs(values[0] - values[1]);

            if (model.datasetIndex === 1) {
              const target = this.targets[index];

              return `${model.dataset.label} ${value} ( total: ${target +
                value} )`;
            }

            return `${model.dataset.label} ${value}`;
          }
        }
      },
      datalabels: {
        font: {
          weight: 'bold',
          size: 14
        },
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
        },
        anchor: context =>
          this.switchDatasets(context, ['center', 'end', 'start']),
        align: context =>
          this.switchDatasets(context, ['center', 'end', 'start']),
        color: context =>
          this.switchDatasets(context, ['white', '#36a2eb', '#ff6384']),
        offset: context => this.switchDatasets(context, [0, 10, 10])
      }
    }
  };

  constructor() {}

  ngOnInit() {
    Chart.defaults.font.family = 'Roboto, "Helvetica Neue", Arial, sans-serif';
  }

  private getMoreLess(data: any[]) {
    const less = [];
    const more = [];

    data.forEach(d => {
      const random_boolean = Math.random() < 0.5;

      if (random_boolean) {
        less.push([d.target, d.target]);
        more.push([d.target, d.target + this.getRandomInt(0, 10)]);
        return;
      }

      less.push([d.target - d.less, d.target]);
      more.push([d.target, d.target]);
    });

    console.log({ less, more });
    return { less, more };
  }

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

  private getEntityLabels(data: any[]): string[] {
    return data.map(d => 'entity');
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

  private switchDatasets<T>(context, valuesToReturn: [T, T, T]) {
    const values = context.dataset.data[context.dataIndex];
    const value = Math.abs(values[0] - values[1]);

    if (context.datasetIndex === 0 || value > 3) {
      return valuesToReturn[0];
    }

    switch (context.datasetIndex) {
      case 1:
        return valuesToReturn[1];
      case 2:
        return valuesToReturn[2];
    }
  }
}

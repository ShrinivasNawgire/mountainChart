import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Highcharts demo";
  highcharts = Highcharts;
  data: any;

  constructor(private http: HttpClient) {
    this.http.get('./assets/data.json').subscribe(data => {
      this.data = data;
      this.highcharts.stockChart('container', {
        chart: {
          alignTicks: false
        },
        rangeSelector: {
          selected: 1,
          allButtonsEnabled: true,
        },
        plotOptions: {
          column: {
            pointWidth: 20
          }
        },
        navigator: {
          enabled: false
        },
        scrollbar: {
          enabled: false
        },
        title: {
          text: 'AAPL Stock Volume'
        },
        yAxis: {
          opposite: false
        },
        series: [{
          type: 'column',
          name: 'AAPL Stock Volume',
          data: this.data ? this.data : [],
          dataGrouping: {
            units: [[
              'week',
              [1]
            ], [
              'month',
              [1, 2, 3, 4, 6]
            ]]
          }
        }]
      });
    })
  }

}

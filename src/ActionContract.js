import { Page } from "./Page";

export class ActionContract extends Page {
	setup(body) {
		window.Highcharts.chart('chartContainer', {

		  chart: {
		    polar: true
		  },

		  title: {
		    text: 'Polar chart based on your results'
		  },

		  // pane: {
		  //   startAngle: 45,
		  //   endAngle: 360
		  // },

		  xAxis: {
		    tickInterval: 1,
		    min: 0,
		    max: 4,
		    categories: [
		    	"Teamwork",
		    	"Social awareness",
		    	"Knowledge",
		    	"Attitude"
		    ]
		    // labels: {
		    //   formatter: function () {
		    //     return this.value + '°';
		    //   }
		    // }
		  },

		  yAxis: {
		    min: 0
		  },

		  plotOptions: {
		    series: {
		      pointStart: 0,
		      pointInterval: 1
		    },
		    column: {
		      pointPadding: 0,
		      groupPadding: 0
		    }
		  },

		  series: [{
		    type: 'area',
		    name: 'Skills',
		    data: [3, 8, 6, 5]
		  }]
		});
	}
}
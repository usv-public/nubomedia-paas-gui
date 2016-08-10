(function() {

  'use strict';

  function createCharts() {
    var chart1 = document.getElementById("chart1").getContext("2d");
    var chart2 = document.getElementById("chart2").getContext("2d");
    var chart3 = document.getElementById("chart3").getContext("2d");

    // Fill with gradient

    var randomScalingFactor = function() {
      return Math.round(Math.random() * 50);
    };

    var xLabels =
      ["10Jun", "11Jun", "12Jun", "13Jun", "14Jun", "15Jun", "16Jun"];
    var bgColorGreen = "rgba(220, 242, 235, 0.7)";
    var bgColorBlue = "rgba(229, 242, 251, 0.7)";
    var lineColorGreen = "rgb(140, 233, 145)";
    var lineColorBlue = "rgb(147, 196, 250)";

    var config = {
      type: 'line',
      data: {
        labels: xLabels,
        datasets: [{
          backgroundColor: bgColorBlue,
          borderColor: lineColorBlue,
          pointBackgroundColor: lineColorBlue,
          borderWidth: 1.5,
          label: "CPU",
          data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
        }, {
          backgroundColor: bgColorGreen,
          borderColor: lineColorGreen,
          pointBackgroundColor: lineColorGreen,
          borderWidth: 1.5,
          label: "Media",
          data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
        }]
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
        title: {
          display: false,
          text: 'Chart.js Line Chart'
        },
        tooltips: {
          mode: 'label',
          callbacks: {
            // beforeTitle: function() {
            //     return '...beforeTitle';
            // },
            // afterTitle: function() {
            //     return '...afterTitle';
            // },
            // beforeBody: function() {
            //     return '...beforeBody';
            // },
            // afterBody: function() {
            //     return '...afterBody';
            // },
            // beforeFooter: function() {
            //     return '...beforeFooter';
            // },
            // footer: function() {
            //     return 'Footer';
            // },
            // afterFooter: function() {
            //     return '...afterFooter';
            // },
          }
        },
        hover: {
          mode: 'dataset'
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true
            },
            gridLines: {
              display: false,
            },
            ticks: {
              mirror: true
            }
          }],
          yAxes: [{
            display: false,
            scaleLabel: {
              display: false
            },
            ticks: {
              // mirror: true
              // suggestedMin: 0,
              // suggestedMax: 250,
            }
          }]
        }
      }
    };


    window.myLine = new Chart(chart1, config);
    window.myLine = new Chart(chart2, config);
    window.myLine = new Chart(chart3, config);
  }

  $(document).ready(function() {

    if (!!document.getElementById("chart1")) {
      createCharts();
    }

  });

})();

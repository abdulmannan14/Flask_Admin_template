function populateBestTimeToPost2(data) {
    var heatmap2options = {
        chart: {
            type: 'heatmap', // Ensures it's a heatmap chart
            height: 350,
        },
        plotOptions: {
            heatmap: {
                colorScale: {
                    ranges: [{
                        from: -30,
                        to: 95,
                        color: '#6C47B4', // Single color for the entire range
                        name: 'Uniform',  // You can name the range however you want
                    }]
                },
                dataLabels: {
                    enabled: true, // Display values on the heatmap
                },
            }
        },
        series: data.company2,
        title: {
            // text: 'Single-Colored Heatmap Example',
            align: 'center',
            style: {
                color: '#fff',
                fontSize: '16px',
            }
        },
        tooltip: {
            theme: 'dark', // Tooltip with dark theme
            x: {
                show: true, // Display the x-axis value in the tooltip
            },
            y: {
                title: {
                    formatter: function () {
                        return 'Data'; // Show as "Data" in the tooltip
                    }
                }
            }
        },
        xaxis: {
            categories: ['12:00AM', '03:00AM', '06:00AM', '09:00AM', '12:00PM', '03:00PM', '06:00PM', '09:00PM'], // Extended categories
            labels: {
                style: {
                    colors: '#fff', // White labels on x-axis
                    fontSize: '12px',
                }
            }
        },
        yaxis: {
            title: {
                text: 'Values',
                style: {
                    color: '#fff',
                }
            },
            labels: {
                style: {
                    colors: '#fff', // White labels on y-axis
                }
            }
        },
         legend: {
            show: false // Disables the legend
        }
    };

    // Initialize the chart
    var heatmap2chart = new ApexCharts(document.querySelector("#besttimetopostcompany2"), heatmap2options);
    heatmap2chart.render();
}
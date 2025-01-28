function populateEmotionChartAnalysis2(data) {
    var emotionanalysiscompany2options = {
        series: [{
            name: 'Emotions',
            data: data.series[1].data  // Data for all emotions in one array
        }],
        chart: {
            type: 'radar',
            height: 350,
            // background: '#2c3e50', // Dark background
        },
        title: {
            // text: 'Emotion Distribution',
            style: {
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#fff' // Title in white
            }
        },
        xaxis: {
            categories: data.categories,
            labels: {
                style: {
                    colors: '#fff', // Labels in white
                    fontSize: '14px'
                }
            }
        },
        yaxis: {
            show: true,
            tickAmount: 5,
            labels: {
                style: {
                    colors: '#fff', // Y-axis labels in white
                    fontSize: '12px'
                }
            }
        },
        fill: {
            opacity: 0.6, // Adjust opacity for better visibility
            colors: ['#6C47B4', '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#16a085', '#e74c3c'] // Custom colors for each emotion
        },
        stroke: {
            width: 2,
            colors: ['#6C47B4', '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#16a085', '#e74c3c'] // Border colors matching fill
        },
        markers: {
            size: 5,
            colors: '#fff', // White markers
            strokeColor: '#FF5733',
            strokeWidth: 2
        },
        tooltip: {
            y: {
                formatter: function (value) {
                    return value + " units"; // Tooltip shows the value with "units"
                }
            },
            enabled: true,
            theme: 'dark',
        },
        grid: {
            borderColor: '#ccc', // Grid color in light gray
            strokeDashArray: 2
        },
        legend: {
            position: 'bottom',
            fontSize: '14px',
            labels: {
                colors: '#fff' // Legend text in white
            }
        },
        plotOptions: {
            radar: {
                polygons: {
                    strokeColor: '#e8e8e8',
                    fill: {
                        colors: ['#343A3F', '#fff']
                    }
                }
            }
        }
    };

    // Check structure of the options in the console to debug

    var emotionanalysiscompany2chart = new ApexCharts(document.querySelector("#emotionanalysiscompany2"), emotionanalysiscompany2options);
    emotionanalysiscompany2chart.render();
}

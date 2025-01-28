function populateSentimentsByMedia2(data) {
    var sentimentsmediaoptions2 = {
        series: data.Zain.series,
        chart: {
            type: 'bar',
            height: 400,
            stacked: true,
            toolbar: {
                show: true
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '25%',
                // endingShape: 'rounded'
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px',
                fontWeight: 'bold',
                colors: ['#fff']
            }
        },
        grid: {
            show: false,
        },
        // stroke: {
        //     show: true,
        //     width: 1,
        //     colors: ['#fff']
        // },
        xaxis: {
            categories: data.Zain.categories,
            title: {
                text: 'Social Media Platforms',
                style: {
                    color: '#FF5733', // Custom color for X-axis title
                    fontSize: '16px',
                    fontWeight: 'bold'
                }
            },
            labels: {
                style: {
                    colors: '#3498db', // Custom color for X-axis labels
                    fontSize: '14px',
                    fontWeight: 'normal'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Feedback Count',
                style: {
                    color: '#FF5733', // Custom color for X-axis title
                    fontSize: '16px',
                    fontWeight: 'bold'
                }
            },
            labels: {
                style: {
                    colors: '#3498db', // Custom color for X-axis labels
                    fontSize: '14px',
                    fontWeight: 'normal'
                }
            },

            min: 0
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        legend: {
            show: false,
            position: 'top',
            horizontalAlign: 'center',
            floating: true,
            offsetY: -25
        }
    };

    var sentimentsmediachart2 = new ApexCharts(document.querySelector("#sentimentsbymediacompany2"), sentimentsmediaoptions2);
    sentimentsmediachart2.render();
}
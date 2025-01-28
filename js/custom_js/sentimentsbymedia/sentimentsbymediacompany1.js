function populateSentimentsByMedia1(data) {
    var sentimentsmediaoptions1 = {
        series: data.company1.series,
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
        // stroke: {
        //     show: true,
        //     width: 1,
        //     colors: ['#fff']
        // },
        xaxis: {
            categories: data.company1.categories,
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

    var sentimentsmediachart1 = new ApexCharts(document.querySelector("#sentimentsbymediacompany1"), sentimentsmediaoptions1);
    sentimentsmediachart1.render();
}

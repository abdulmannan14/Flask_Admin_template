function populateNegativetiveMentionChart(data) {
    const negativedummyData = {
        categories: data.categories,
        series: data.series
    };

    // Define chart options
    const negativeoptions = {

        chart: {
            type: 'area',
            height: 350,
            stacked: false,
            toolbar: {
                show: false // Hides the chart toolbar
            },
            background: '#343A3F' // Match reference chart's background
        },
        series: negativedummyData.series,
        xaxis: {
            categories: negativedummyData.categories,
            title: {
                // text: 'Months',
                style: {
                    color: '#ACB5BD' // Match the reference chart's axis label color
                }
            },
            labels: {
                style: {
                    colors: '#ACB5BD', // X-axis labels color
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ACB5BD', // Y-axis labels color
                    fontSize: '12px'
                }
            }
        },
        colors: ['#d71111', '#48BCA2', '#6C47B4'], // Updated to reference chart colors
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'solid',
            opacity: 1 // Match reference chart's transparency
        },
        grid: {
            show: false,
            borderColor: '#212529', // Match reference chart grid color
            strokeDashArray: 0 // Solid lines for the grid
        },
        tooltip: {
            shared: true,
            intersect: false,
            theme: 'dark' // Black modal for tooltip
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: {
                colors: '#ACB5BD' // Legend text color
            }
        },
        title: {
            text: 'Negative Mentions',
            align: 'left',
            style: {
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#ffffff' // Title color
            }
        }
    };

    // Render the chart
    const negativechart = new ApexCharts(document.querySelector("#negativementions"), negativeoptions);
    negativechart.render();
}
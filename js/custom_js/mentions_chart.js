function populateMentionsChart(data) {
    const dummyData = {
        // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        categories: data.categories,
        // series: [
        //     {
        //         name: "company1",
        //         data: [4500, 4700, 4100, 5200, 5300, 6000]
        //     },
        //     {
        //         name: "company2",
        //         data: [2000, 2300, 2100, 2500, 2700, 2900]
        //     },
        //     {
        //         name: "company3",
        //         data: [1000, 1300, 1100, 1500, 1700, 1900]
        //     }
        // ]
        series: data.series
    };

    const options = {
        chart: {
            type: 'area',
            height: 350,
            stacked: true,
            toolbar: {
                show: false // Hides the chart toolbar
            },
            background: '#343A3F' // Match reference chart's background
        },
        series: dummyData.series,
        xaxis: {
            categories: dummyData.categories,
            title: {
                text: 'Months',
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
        colors: ['#6C47B4', '#48BCA2', '#2374F2'], // Updated to reference chart colors
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
            text: 'Volume of Mentions',
            align: 'left',
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#ffffff' // Title color
            }
        }
    };

    // Render the chart
    const chart = new ApexCharts(document.querySelector("#volumeofmentions"), options);
    chart.render();
}

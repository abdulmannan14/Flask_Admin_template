function populateLanguageAnalysis1(data) {
    var sentimentsbylanguageoptions1 = {
        series: data.series[0].data, // Data for languages
        chart: {
            type: 'pie',
            height: 350
        },
        labels: data.labels, // Labels for each slice
        title: {
            // text: 'Languages Used',
            style: {
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#333'
            }
        },
        legend: {
            position: 'bottom', // Position of the legend
            fontSize: '10px',
            // color: '#ffffff',
            // change the font color
            labels: {
                colors: '#ffffff', // Change the font color
                useSeriesColors: false // Use the same color as the slice
            },
        },

        colors: ['#ead12b', '#c93838', '#3ab93a', '#FEAF1A'], // Custom colors for the segments
        tooltip: {
            y: {
                formatter: function (value) {
                    return value + " %"; // Add percentage symbol
                }
            }
        },
        // legend: {
        //     show: false // Disables the legend
        // }

    };

    var sentimentbylangchart1 = new ApexCharts(document.querySelector("#sentimentsbylanguagecompany1"), sentimentsbylanguageoptions1);
    sentimentbylangchart1.render();
}
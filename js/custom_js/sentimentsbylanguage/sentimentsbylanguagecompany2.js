function populateLanguageAnalysis2(data) {
    var sentimentsbylanguageoptions2 = {
        series: data.series[1].data, // Data for languages
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
        // legend: {
        //     position: 'bottom', // Position of the legend
        //     fontSize: '14px'
        // },
        tooltip: {
            y: {
                formatter: function (value) {
                    return value + " %"; // Add percentage symbol
                }
            }
        },
        colors: ['#6C47B4', '#46BCA2', '#2473F2', '#FEAF1A'], // Custom colors for the segments

    };

    var sentimentbylangchart2 = new ApexCharts(document.querySelector("#sentimentsbylanguagecompany2"), sentimentsbylanguageoptions2);
    sentimentbylangchart2.render();
}

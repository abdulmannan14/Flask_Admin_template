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

    var sentimentbylangchart1 = new ApexCharts(document.querySelector("#sentimentsbylanguagecompany1"), sentimentsbylanguageoptions1);
    sentimentbylangchart1.render();
}
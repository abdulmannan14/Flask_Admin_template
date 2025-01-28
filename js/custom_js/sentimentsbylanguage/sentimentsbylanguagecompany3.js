function populateLanguageAnalysis3(data) {
    var sentimentsbylanguageoptions3 = {
        series: data.series[2].data, // Data for languages
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

    var sentimentbylangchart3 = new ApexCharts(document.querySelector("#sentimentsbylanguagecompany3"), sentimentsbylanguageoptions3);
    sentimentbylangchart3.render();
}
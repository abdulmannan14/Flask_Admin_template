var emotionoptions3 = {
    chart: {
        height: 280,
        type: "radialBar",
    },
    series: [67, 84, 97, 61],
    colors: ['#2473F2', '#46BCA2', '#6C47B4', '#F4B400'], // Set specific colors for each bar

    plotOptions: {
        radialBar: {
            dataLabels: {
                total: {
                    show: true,
                    label: 'TOTALS',
                    color: '#46BCA2', // Optional: Set color for the "TOTAL" label
                    fontSize: '16px', // Optional: Customize the font size
                    fontWeight: 'bold',

                }
            }
        }
    },
    labels: ['TEAM A', 'TEAM B', 'TEAM C', 'TEAM D'],
    tooltip: {
        enabled: true, // Enable tooltips
        theme: 'dark', // Set dark theme for the tooltip
        y: {
            formatter: function (val) {
                return `${val}%`; // Customize the display of values in the tooltip
            }
        }
    }

};

new ApexCharts(document.querySelector("#emotionsbarChartWidgetcompany3"), emotionoptions3).render();

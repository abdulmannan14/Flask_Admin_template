function populatesentimentsdistributioncompany2(data) {
    var options2 = {
        chart: {
            height: 280,
            type: "radialBar",
        },
        series: [data],
        colors: ["#2473F2"],
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: '#ffffff',
                    startAngle: -90,
                    endAngle: 90,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        fontSize: "30px",
                        show: true,
                        color: "#46BCA2",
                        fontWeight: 'bold',
                    }
                }
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                gradientToColors: ["#6C47B4"],
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: "butt"
        },
        labels: ["Progress"]
    };

    new ApexCharts(document.querySelector("#barChartWidgetcompany2"), options2).render();
}

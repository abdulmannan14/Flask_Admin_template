function populateworldmap2(data) {
    am5.ready(function () {

        // Create root element
        var root = am5.Root.new("topcountriescompany2");

        // Set animated theme
        root.setThemes([am5themes_Animated.new(root)]);

        // Create a map chart
        var chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: "rotateX",
                panY: "translateY",
                projection: am5map.geoMercator() // Mercator projection
            })
        );

        // Create a polygon series for the world map
        var polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_worldLow
            })
        );

        // Define highlighted countries using ISO country codes
        var highlightedCountries = data; // Add more if needed

        // Style polygons (countries)
        polygonSeries.mapPolygons.template.setAll({
            tooltipText: "{name}", // Show country name on hover
            fill: am5.color("#6C757D"), // Default country color (gray)
            stroke: am5.color("#FFFFFF"), // Border color
            strokeWidth: 0.5
        });

        // Highlight selected countries
        polygonSeries.events.on("datavalidated", function () {
            polygonSeries.mapPolygons.each(function (polygon) {
                if (highlightedCountries.includes(polygon.dataItem.get("id"))) {
                    polygon.set("fill", am5.color("#FF5733")); // Highlight color
                }
            });
        });

        // Enable zoom controls
        chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

        // Animate the map on load
        polygonSeries.appear(1000, 100);

    });
}
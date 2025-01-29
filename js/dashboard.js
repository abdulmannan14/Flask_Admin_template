// Fetch data from the API
async function fetchData() {
    try {
        const response = await fetch("http://127.0.0.1:5000/get-data");
        const data = await response.json();
        console.log("this is repsonse====", data)
        // Pass data to individual chart files
        populateTableRecords(data.general_stats); // Example for table
        populateMentionsChart(data.volume_of_mentions);
        populateReachChart(data.reach); // Example for reach
        populatesentimentsdistributioncompany1(data.sentiments_distribution.STC); // Example for emotion
        populatesentimentsdistributioncompany2(data.sentiments_distribution.Zain); // Example for emotion
        populatesentimentsdistributioncompany3(data.sentiments_distribution.Ooredoo); // Example for emotion
        populatePositiveMentionChart(data.positive_mentions_chart);
        populateNegativetiveMentionChart(data.negative_mentions_chart);
        populateSentimentsByMedia1(data.sentiments_by_media);
        populateSentimentsByMedia2(data.sentiments_by_media);
        populateSentimentsByMedia3(data.sentiments_by_media);
        populateLanguageAnalysis1(data.language_analysis);
        populateLanguageAnalysis2(data.language_analysis);
        populateLanguageAnalysis3(data.language_analysis);
        populateEmotionChartAnalysis1(data.emotion_chart_analysis);
        populateEmotionChartAnalysis2(data.emotion_chart_analysis);
        populateEmotionChartAnalysis3(data.emotion_chart_analysis);
        populateBestTimeToPost1(data.best_time_to_post)
        populateBestTimeToPost2(data.best_time_to_post)
        populateBestTimeToPost3(data.best_time_to_post)
        populateworldmap1(data.top_countries.STC)
        populateworldmap2(data.top_countries.Zain)
        populateworldmap3(data.top_countries.Ooredoo)

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call fetchData on page load
window.onload = fetchData;

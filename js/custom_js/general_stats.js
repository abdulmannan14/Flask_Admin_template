// Data provided
function populateTableRecords(data) {
    const tracked_keywords_count = data.tracked_keywords_count
    const reach_sum = data.reach_sum
    const social_interactions_sum = data.social_interactions_sum
    const sentiment_counts = {
        "positive": data.sentiment_counts.positive,
        "negative": data.sentiment_counts.negative
    };

    console.log("====1===")

    // Function to populate the table
    function populateTable() {
        // Company rows (company1, company2, company3)
        const companies = ["STC", "Zain", "Ooredoo"];
        console.log("====2===")
        // Loop through each company and update the table
        companies.forEach(company => {
            const companyRow = document.querySelector(`#${company}_row`);

            // Update tracked mentions (Company #)
            companyRow.querySelector('.tracked_mentions').textContent = tracked_keywords_count[company];

            // Update reach
            companyRow.querySelector('.reach').textContent = reach_sum[company];

            // Update social interactions
            companyRow.querySelector('.social_interactions').textContent = social_interactions_sum[company];

            // Update positive mentions
            companyRow.querySelector('.positive_mentions').textContent = sentiment_counts["positive"][company];

            // Update negative mentions
            companyRow.querySelector('.negative_mentions').textContent = sentiment_counts["negative"][company];
        });
    }

    // Run the function when the page loads
    populateTable();
}


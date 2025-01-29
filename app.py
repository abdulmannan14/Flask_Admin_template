from flask import Flask, jsonify
import json
from collections import defaultdict
from datetime import datetime
from flask_cors import CORS  # Import CORS
import pandas as pd
import pycountry

app = Flask(__name__)
CORS(app)

substring_mapping = {
    "zain": "Zain",
    "ooredo": "Ooredoo",
    "stc": "STC"
}


# Function to process the JSON data
def group_tracked_keywords(json_data):
    for entry in json_data:
        if "TRACKED KEYWORD" in entry:
            tracked_keyword = entry["TRACKED KEYWORD"].lower()
            for substring, group_name in substring_mapping.items():
                if substring in tracked_keyword:
                    # Replace the tracked keyword with the group name
                    entry["TRACKED KEYWORD"] = group_name
                    break
    return json_data


# Sample function to process the JSON data
def process_data():
    with open("aggregated.json", "r") as file:
        data = json.load(file)
        # print("data length is ====", len(data))
        # Example of data processing: filtering or aggregating
        # processed_data = {
        #     "total_items": len(data),
        #     "categories": list(set(item["category"] for item in data)),
        #     "counts_per_category": {
        #         category: sum(1 for item in data if item["category"] == category)
        #         for category in set(item["category"] for item in data)
        #     },
        # }
    return data


def get_general_stats(data):
    tracked_keywords_count = {"STC": 0, "Zain": 0, "Ooredoo": 0}
    reach_sum = {"STC": 0, "Zain": 0, "Ooredoo": 0}
    social_interactions_sum = {"STC": 0, "Zain": 0, "Ooredoo": 0}
    sentiment_counts = {
        "positive": {"STC": 0, "Zain": 0, "Ooredoo": 0},
        "negative": {"STC": 0, "Zain": 0, "Ooredoo": 0},
        "neutral": {"STC": 0, "Zain": 0, "Ooredoo": 0}
    }

    # Process the data
    for record in data:
        keyword = record["TRACKED KEYWORD"]
        sentiment = record["SENTIMENT"]

        # Count records with tracked keywords
        if keyword in tracked_keywords_count:
            tracked_keywords_count[keyword] += 1

            # Sum REACH
            try:
                reach_sum[keyword] += record.get("REACH", 0)
            except:
                pass

            # Sum SOCIAL MEDIA INTERACTIONS
            try:
                social_interactions_sum[keyword] += record.get("SOCIAL MEDIA INTERACTIONS", 0)
            except:
                pass

            # Count SENTIMENT
            if sentiment in sentiment_counts:
                sentiment_counts[sentiment][keyword] += 1

    # Print results
    # print("Total Records with TRACKED KEYWORD:")
    # print(tracked_keywords_count)
    # print("\nSum of REACH:")
    # print(reach_sum)
    # print("\nSum of SOCIAL MEDIA INTERACTIONS:")
    # print(social_interactions_sum)
    # print("\nSum of SENTIMENT (positive):")
    # print(sentiment_counts["positive"])
    # print("\nSum of SENTIMENT (negative):")
    # print(sentiment_counts["negative"])
    # print("\nSum of SENTIMENT (neutral):")
    # print(sentiment_counts["neutral"])
    return {
        "tracked_keywords_count": tracked_keywords_count,
        "reach_sum": reach_sum,
        "social_interactions_sum": social_interactions_sum,
        "sentiment_counts": sentiment_counts
    }


def get_volume_of_mentions(data):
    # Initialize a nested dictionary to hold the volume by date
    volume_by_date = defaultdict(lambda: {"STC": 0, "Zain": 0, "Ooredoo": 0})

    # Process the data
    for record in data:
        keyword = record["TRACKED KEYWORD"]
        date = record["DATE"]

        # Extract the date (ignoring the time portion)
        try:
            formatted_date = datetime.strptime(date, "%Y-%m-%d %H:%M").strftime("%Y-%m-%d")
        except:
            pass

        # Increment the count for the respective company on the specific date
        if keyword in volume_by_date[formatted_date]:
            volume_by_date[formatted_date][keyword] += 1

    # Convert defaultdict to a regular dictionary for processing
    volume_by_date = dict(volume_by_date)

    # Prepare the data for the chart
    categories = sorted(volume_by_date.keys())  # Sorted dates
    series = [
        {
            "name": "STC",
            "data": [volume_by_date[date]["STC"] for date in categories]
        },
        {
            "name": "Zain",
            "data": [volume_by_date[date]["Zain"] for date in categories]
        },
        {
            "name": "Ooredoo",
            "data": [volume_by_date[date]["Ooredoo"] for date in categories]
        }
    ]

    # Chart-ready data
    chart_data = {
        "categories": categories,
        "series": series
    }

    # Print the result
    # print(chart_data)
    return chart_data


def get_reach(data):
    # Initialize a nested dictionary to hold the reach by date
    reach_by_date = defaultdict(lambda: {"STC": 0, "Zain": 0, "Ooredoo": 0})

    # Process the data
    for record in data:
        keyword = record["TRACKED KEYWORD"]
        date = record["DATE"]

        # Extract the date (ignoring the time portion)
        try:
            formatted_date = datetime.strptime(date, "%Y-%m-%d %H:%M").strftime("%Y-%m-%d")
        except:
            pass

        # Increment the reach for the respective company on the specific date
        if keyword in reach_by_date[formatted_date]:
            try:
                reach_by_date[formatted_date][keyword] += record.get("REACH", 0)
            except:
                pass

    # Convert defaultdict to a regular dictionary for processing
    reach_by_date = dict(reach_by_date)

    # Prepare the data for the chart
    categories = sorted(reach_by_date.keys())  # Sorted dates
    series = [
        {
            "name": "STC",
            "data": [reach_by_date[date]["STC"] for date in categories]
        },
        {
            "name": "Zain",
            "data": [reach_by_date[date]["Zain"] for date in categories]
        },
        {
            "name": "Ooredoo",
            "data": [reach_by_date[date]["Ooredoo"] for date in categories]
        }
    ]

    # Chart-ready data
    chart_data = {
        "categories": categories,
        "series": series
    }

    # Print the result
    # print(chart_data)
    return chart_data


def get_sentiments_distribution(data):
    sentiment_counts = defaultdict(lambda: {"positive": 0, "negative": 0})

    for record in data:
        keyword = record["TRACKED KEYWORD"]
        sentiment = record["SENTIMENT"]

        # Only consider positive and negative sentiments
        if sentiment in ["positive", "negative"]:
            sentiment_counts[keyword][sentiment] += 1

    # Calculate the percentage of positive sentiment for each company
    positive_percentages = {}
    for company, counts in sentiment_counts.items():
        positive = counts["positive"]
        negative = counts["negative"]
        total = positive + negative

        # Avoid division by zero
        if total > 0:
            positive_percentage = (positive / total) * 100
            positive_percentages[company] = round(positive_percentage, 2)  # Rounded to 2 decimal places

    # Print the result
    # print(positive_percentages)
    return positive_percentages


def get_positive_mentions_chart_data(data, sentiment_type):
    """
        Get the chart data for positive mentions based on specific dates.

        Args:
        - data (list): The list of dictionaries containing the data.
        - sentiment_type (str): The sentiment type to filter (e.g., 'positive').

        Returns:
        - dict: Chart data with categories as dates and series as mention counts for each company.
        """
    # Prepare a dictionary to store sentiment counts by date for each company
    sentiment_data = defaultdict(lambda: defaultdict(int))  # {date: {company: count}}

    # Process each entry in the data
    for entry in data:
        company = entry.get("TRACKED KEYWORD", "Unknown")
        sentiment = entry.get("SENTIMENT", "").lower()
        date_str = entry.get("DATE")

        # Parse date and use it as the key
        if date_str:
            try:
                date_obj = datetime.strptime(date_str, "%Y-%m-%d %H:%M")
            except:
                pass
            date_key = date_obj.strftime("%Y-%m-%d")  # Format as YYYY-MM-DD

            # Update the corresponding sentiment count
            if sentiment == sentiment_type.lower():  # Match the sentiment type
                sentiment_data[date_key][company] += 1

    # Prepare output in the desired format
    result = {
        "categories": sorted(sentiment_data.keys()),  # Sorted list of dates
        "series": []
    }

    # Process series data
    companies = set(
        company for date in sentiment_data for company in sentiment_data[date]
    )  # Get all unique companies

    for company in companies:
        company_counts = [
            sentiment_data[date].get(company, 0) for date in result["categories"]
        ]  # Get counts for each date
        result["series"].append({
            "name": f"{company} ({sentiment_type})",
            "data": company_counts
        })

    return result


def get_negative_mentions_chart_data(data, sentiment_type):
    """
            Get the chart data for positive mentions based on specific dates.

            Args:
            - data (list): The list of dictionaries containing the data.
            - sentiment_type (str): The sentiment type to filter (e.g., 'positive').

            Returns:
            - dict: Chart data with categories as dates and series as mention counts for each company.
            """
    # Prepare a dictionary to store sentiment counts by date for each company
    sentiment_data = defaultdict(lambda: defaultdict(int))  # {date: {company: count}}

    # Process each entry in the data
    for entry in data:
        company = entry.get("TRACKED KEYWORD", "Unknown")
        sentiment = entry.get("SENTIMENT", "").lower()
        date_str = entry.get("DATE")

        # Parse date and use it as the key
        if date_str:
            try:
                date_obj = datetime.strptime(date_str, "%Y-%m-%d %H:%M")
            except:
                pass
            date_key = date_obj.strftime("%Y-%m-%d")  # Format as YYYY-MM-DD

            # Update the corresponding sentiment count
            if sentiment == sentiment_type.lower():  # Match the sentiment type
                sentiment_data[date_key][company] += 1

    # Prepare output in the desired format
    result = {
        "categories": sorted(sentiment_data.keys()),  # Sorted list of dates
        "series": []
    }

    # Process series data
    companies = set(
        company for date in sentiment_data for company in sentiment_data[date]
    )  # Get all unique companies

    for company in companies:
        company_counts = [
            sentiment_data[date].get(company, 0) for date in result["categories"]
        ]  # Get counts for each date
        result["series"].append({
            "name": f"{company} ({sentiment_type})",
            "data": company_counts
        })

    return result


def get_emotion_chart_analysis(data):
    # Define the emotion types to track
    emotions = ['Love', 'Joy', 'Sadness', 'Surprise', 'Anger', 'Fear', 'Disgust']

    # Prepare a dictionary to store emotion counts by company
    emotion_data = defaultdict(lambda: defaultdict(int))  # {company: {emotion: count}}

    # Process each entry in the data
    for entry in data:
        company = entry.get("TRACKED KEYWORD", "Unknown")
        emotion = entry.get("EMOTION", None)

        # Update the emotion count if it is valid
        if emotion and emotion in emotions:
            emotion_data[company][emotion] += 1

    # Prepare output in the desired format
    result = {
        "categories": emotions,  # Emotion types as categories
        "series": []
    }

    for company, counts in emotion_data.items():
        # Create the data array for this company, ensuring all emotions are included
        emotion_counts = [counts.get(emotion, 0) for emotion in emotions]
        result["series"].append({
            "name": company,
            "data": emotion_counts
        })

    return result


def get_language_analysis(data):
    # Prepare a dictionary to store sentiment counts by language for each company
    language_data = defaultdict(lambda: defaultdict(int))  # {company: {language: count}}

    # Process each entry in the data
    for entry in data:
        company = entry.get("TRACKED KEYWORD", "Unknown")
        language = entry.get("LANGUAGE", None)

        # Update the language count if it is valid
        if language:
            language_data[company][language] += 1

    # Prepare output in the desired format
    result = {
        "labels": [],  # All unique languages across all companies
        "series": []
    }

    # Collect all unique languages across all companies
    all_languages = set()
    for companies in language_data.values():
        all_languages.update(companies.keys())
    result["labels"] = sorted(all_languages)  # Sort languages for consistency

    # Build the series data
    for company, counts in language_data.items():
        # Create the data array for this company, ensuring all languages are included
        language_counts = [counts.get(language, 0) for language in result["labels"]]
        result["series"].append({
            "name": company,
            "data": language_counts
        })

    return result


def get_sentiments_by_media(data):
    """
        Calculate the percentage of sentiments (positive, negative, neutral) for each social media platform
        and each company.

        Args:
        - data (list): The list of dictionaries containing the data.

        Returns:
        - dict: Chart data with categories as platforms and series for each sentiment type.
        """
    # Prepare a nested dictionary to store sentiment counts by platform for each company
    platform_sentiment_data = defaultdict(lambda: defaultdict(lambda: defaultdict(int)))
    # {company: {platform: {sentiment: count}}}

    # Process each entry in the data
    for entry in data:
        company = entry.get("TRACKED KEYWORD", "Unknown")
        platform = entry.get("SOURCE", None)
        sentiment = entry.get("SENTIMENT", "").lower()

        # Update the sentiment count for the company and platform if both are valid
        if company and platform and sentiment in ["positive", "negative", "neutral"]:
            platform_sentiment_data[company][platform][sentiment] += 1

    # Prepare output in the desired format
    result = {}
    for company, platforms in platform_sentiment_data.items():
        # Get all unique platforms for this company
        all_platforms = sorted(platforms.keys())

        # Initialize series for each sentiment type
        sentiment_series = {
            "Positive": [0] * len(all_platforms),
            "Negative": [0] * len(all_platforms),
            "Neutral": [0] * len(all_platforms),
        }

        # Calculate sentiment percentages for each platform
        for i, platform in enumerate(all_platforms):
            total_records = sum(platforms[platform].values())  # Total sentiments for this platform
            if total_records > 0:
                sentiment_series["Positive"][i] = int((platforms[platform]["positive"] / total_records) * 100)
                sentiment_series["Negative"][i] = int((platforms[platform]["negative"] / total_records) * 100)
                sentiment_series["Neutral"][i] = int((platforms[platform]["neutral"] / total_records) * 100)

        # Format the result for this company
        result[company] = {
            "categories": all_platforms,
            "series": [
                {"name": "Positive", "data": sentiment_series["Positive"]},
                {"name": "Negative", "data": sentiment_series["Negative"]},
                {"name": "Neutral", "data": sentiment_series["Neutral"]},
            ]
        }

    return result


def get_best_time_to_post(data):
    """
    Calculate the best time to post for each company based on the number of records
    grouped by day of the week and time intervals.

    Args:
    - data (list): The list of dictionaries containing the data.

    Returns:
    - dict: Chart data with days of the week and corresponding time slots for each company.
    """
    # Define time intervals (every 3 hours)
    time_intervals = ["12:00AM", "03:00AM", "06:00AM", "09:00AM", "12:00PM", "03:00PM", "06:00PM", "09:00PM"]
    time_ranges = [(0, 3), (3, 6), (6, 9), (9, 12), (12, 15), (15, 18), (18, 21), (21, 24)]

    # Prepare a nested dictionary to store counts by day and time slot for each company
    time_data = defaultdict(lambda: defaultdict(lambda: [0] * len(time_intervals)))
    # {company: {day: [counts for each time slot]}}

    # Process each entry in the data
    for entry in data:
        company = entry.get("TRACKED KEYWORD", "Unknown")
        date_str = entry.get("DATE")

        # Parse the date to extract day of the week and time
        if date_str:
            try:
                date_obj = datetime.strptime(date_str, "%Y-%m-%d %H:%M")
            except:
                pass
            day_of_week = date_obj.strftime("%A").lower()  # Get day name (e.g., Monday)
            hour = date_obj.hour

            # Determine the time slot index based on the hour
            for i, (start, end) in enumerate(time_ranges):
                if start <= hour < end:
                    time_data[company][day_of_week][i] += 1
                    break

    # Prepare output in the desired format
    result = {}
    for company, days in time_data.items():
        result[company] = []

        for day, counts in days.items():
            result[company].append({
                "name": day,
                "data": [{"x": time_intervals[i], "y": counts[i]} for i in range(len(time_intervals))]
            })

    return result


def get_top_countries(data):
    """
        Extracts the list of unique country codes for each company.

        Args:
        - data (list): The list of dictionaries containing the data.

        Returns:
        - dict: Country codes for each company in the format {company: [country_codes]}
        """
    company_countries = defaultdict(set)  # Use set to avoid duplicate country codes

    for entry in data:
        company = entry.get("TRACKED KEYWORD", "Unknown")
        country_name = entry.get("COUNTRY")

        if country_name:
            # Convert country name to country code
            try:
                country_code = pycountry.countries.lookup(country_name).alpha_2
            except LookupError:
                country_code = "Unknown"

            # Store the country code
            if country_code != "Unknown":
                company_countries[company].add(country_code)

    # Convert sets to lists for the final output
    return {company: list(countries) for company, countries in company_countries.items()}


# API endpoint to send processed data
@app.route("/get-data", methods=["GET"])
def get_data():
    processed_data = process_data()
    initial_mapping = group_tracked_keywords(processed_data)
    # print("initial mapping= ==", initial_mapping)
    general_stats = get_general_stats(initial_mapping)
    # print("these are gneral stat---", general_stats)
    volume_of_mentions = get_volume_of_mentions(initial_mapping)
    reach = get_reach(initial_mapping)
    sentiments_distribution = get_sentiments_distribution(initial_mapping)
    positive_mentions_chart = get_positive_mentions_chart_data(initial_mapping, 'positive')
    negative_mentions_chart = get_negative_mentions_chart_data(initial_mapping, 'negative')
    emotion_chart_analysis = get_emotion_chart_analysis(initial_mapping)
    language_analysis = get_language_analysis(initial_mapping)
    sentiments_by_media = get_sentiments_by_media(initial_mapping)
    best_time_to_post = get_best_time_to_post(initial_mapping)
    top_countries = get_top_countries(initial_mapping)

    return jsonify({
        "general_stats": general_stats,
        "volume_of_mentions": volume_of_mentions,
        "reach": reach,
        "sentiments_distribution": sentiments_distribution,
        "positive_mentions_chart": positive_mentions_chart,
        "negative_mentions_chart": negative_mentions_chart,
        "emotion_chart_analysis": emotion_chart_analysis,
        "language_analysis": language_analysis,
        "sentiments_by_media": sentiments_by_media,
        "best_time_to_post": best_time_to_post,
        "top_countries": top_countries
    })


if __name__ == "__main__":
    app.run(debug=True)

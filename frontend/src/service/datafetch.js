// service/datafetch.js

import axios from "axios";

export const getAlldata = async() => {
    try {
        const response = await axios.get("app/getlist");
        return response.data.result;
    } catch (error) {
        throw new Error("Error fetching data");
    }
};
export const getFilteredData = async(searchQuery) => {
    try {
        // If there are no filter parameters, return all data
        if (Object.keys(searchQuery).length === 0) {
            const response = await axios.get("app/getsearch");
            return response.data.result;
        } else {
            const filter = {};
            // List of fields for which we want to perform partial matching
            const partialMatchFields = [
                "likelihood",
                "title",
                "source",
                "pestle",
                "relevance",
                "country",
                "published",
                "added",
                "impact",
                "start_year",
                "region",
                "url",
                "insight",
                "topic",
                "sector",
                "intensity",
                "end_year",
            ];

            // Loop through the searchQuery parameters and handle partial matching for specific fields
            Object.keys(searchQuery).forEach((filterKey) => {
                if (partialMatchFields.includes(filterKey)) {
                    // For fields in the partialMatchFields list, perform case-insensitive partial matching using regular expression
                    filter[filterKey] = new RegExp(searchQuery[filterKey]);
                } else {
                    // For other fields, exact matching
                    filter[filterKey] = searchQuery[filterKey];
                }
            });

            const response = await axios.get("app/getsearch", {
                params: filter,
            });
            return response.data.result;
        }
    } catch (error) {
        throw new Error("Error fetching data");
    }
};
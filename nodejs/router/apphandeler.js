const express = require('express');
const mongoose = require('mongoose');
const Data = require('../schema/datas');
const router = express.Router();

router.get('/getlist', async(req, res) => {
    try {
        const data = await Data.find({});
        res.status(200).json({
            result: data,
            message: 'Data were fetched successfully',
        });
    } catch (err) {
        res.status(400).json({
            error: 'Data cannot find',
        });
    }
});

router.get('/getsearch', async(req, res) => {
    try {
        // If there are no filter parameters, return all data
        if (Object.keys(req.query).length === 0) {
            const data = await Data.find({});
            res.status(200).json({
                result: data,
                message: 'Data were fetched successfully',
            });
        } else {
            const filter = {};
            // List of fields for which we want to perform partial matching
            const partialMatchFields = ['likelihood', 'title', 'source', 'pestle', 'relevance', 'country', 'published', 'added', 'impact', 'start_year', 'region', 'url', 'insight', 'topic', 'sector', 'intensity', 'end_year'];

            // Loop through the query parameters and handle partial matching for specific fields
            Object.keys(req.query).forEach((filterKey) => {
                if (partialMatchFields.includes(filterKey)) {
                    // For fields in the partialMatchFields list, perform case-insensitive partial matching using regular expression
                    filter[filterKey] = new RegExp(req.query[filterKey], 'i');
                } else {
                    // For other fields, exact matching
                    filter[filterKey] = req.query[filterKey];
                }
            });

            const data = await Data.find(filter);
            res.status(200).json({
                result: data,
                message: 'Data were fetched successfully',
            });
        }
    } catch (err) {
        res.status(400).json({
            error: 'Data cannot be found',
        });
    }
});

module.exports = router;
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

app.get("/search", async (req, res) => {
    try {
        const searchQuery = req.query.query;
        if (!searchQuery) {
            return res.status(400).json({ error: "Missing search query" });
        }

        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${GOOGLE_API_KEY}`;
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
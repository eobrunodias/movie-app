import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/news", async (req, res) => {
  try {
    const API_BASE_URL = process.env.API_BASE_URL;
    const API_KEY = process.env.API_KEY;

    if (!API_BASE_URL || !API_KEY) {
      return res
        .status(500)
        .json({ error: "API_KEY or API_BASE_URL not configured " });
    }

    const response = await axios.get(
      `${API_BASE_URL}/search?q=example&lang=en&country=us&max=10&apikey=${API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetch the news" });
  }
});

app.listen(PORT, () => console.log(`Server on in port: ${PORT}`));

export default app;

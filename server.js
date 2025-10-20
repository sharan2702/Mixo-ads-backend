import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import generateAdCopyRoutes from "./routes/generateAdCopy.js";
import createCampaignRoutes from "./routes/createCampaign.js";
import batchCreateAdsRoutes from "./routes/batchCreateAds.js";
import fetchAnalyticsRoutes from "./routes/fetchAnalytics.js";
import connectAccountRoutes from "./routes/connectAccount.js";
const app = express();
app.use(express.json());
app.use("/generate-ad-copy", generateAdCopyRoutes);
app.use("/create-campaign", createCampaignRoutes);
app.use("/batch-create-ads", batchCreateAdsRoutes);
app.use("/fetch-analytics", fetchAnalyticsRoutes);
app.use("/connect-account", connectAccountRoutes);

const PORT = process.env.PORT || 3000;
console.log("OPENAI_API_KEY loaded:", process.env.OPENAI_API_KEY ? "YES" : "NO");

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

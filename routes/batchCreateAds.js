import express from "express";
import crypto from "crypto";

const router = express.Router();

// In-memory storage
const adsStore = new Map();
const batchIds = new Map();

// Simple per-platform rate limiter (max 10 ads per batch)
const MAX_ADS_PER_BATCH = 10;

router.post("/", (req, res) => {
  const { platform, account_id, campaign_id, ads, batch_id } = req.body;

  if (!platform || !account_id || !campaign_id || !ads || !Array.isArray(ads)) {
    return res.status(400).json({ error: "Missing or invalid fields" });
  }

  if (ads.length > MAX_ADS_PER_BATCH) {
    return res.status(400).json({ error: `Max ${MAX_ADS_PER_BATCH} ads per batch` });
  }

  // Check idempotency
  if (batch_id && batchIds.has(batch_id)) {
    console.log(`♻️ Returning existing batch for batch_id: ${batch_id}`);
    return res.json(batchIds.get(batch_id));
  }

  const createdAds = ads.map((ad, idx) => {
    const ad_id = `ad_${crypto.randomBytes(3).toString("hex")}`;
    const status = "created";

    const adData = {
      ad_id,
      headline: ad.headline,
      description: ad.description,
      status,
    };

    adsStore.set(ad_id, adData);
    return adData;
  });

  const response = { status: "success", ads: createdAds };

  if (batch_id) batchIds.set(batch_id, response);

  console.log(`[BATCH CREATE ADS] Platform: ${platform}, Campaign: ${campaign_id}, Ads: ${ads.length}`);

  res.json(response);
});

export default router;

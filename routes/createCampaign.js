import express from "express";
import crypto from "crypto";

const router = express.Router();

// In-memory storage for campaigns and idempotency
const campaigns = new Map();
const idempotencyKeys = new Map();

// POST /create-campaign
router.post("/", (req, res) => {
  const { platform, account_id, campaign_name, objective, budget, idempotency_key } = req.body;

  if (!platform || !account_id || !campaign_name || !objective || !budget) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Check idempotency
  if (idempotency_key && idempotencyKeys.has(idempotency_key)) {
    return res.json(idempotencyKeys.get(idempotency_key));
  }

  // Simulate token refresh (just mock)
  const access_token = crypto.randomBytes(16).toString("hex");

  // Create campaign
  const campaign_id = "cmp_" + crypto.randomBytes(4).toString("hex");
  const created_at = new Date().toISOString();

  const campaignData = {
    status: "success",
    campaign_id,
    created_at,
    platform,
    account_id,
    campaign_name,
    objective,
    budget,
    access_token,
  };

  // Store in memory
  if (idempotency_key) idempotencyKeys.set(idempotency_key, campaignData);
  campaigns.set(campaign_id, campaignData);

  console.log(`[CREATE CAMPAIGN] ${platform} - ${campaign_name}`);

  return res.json(campaignData);
});

export default router;

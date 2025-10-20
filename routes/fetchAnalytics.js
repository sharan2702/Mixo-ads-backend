import express from "express";

const router = express.Router();

// Mock analytics generator
function generateAnalytics() {
  const impressions = Math.floor(Math.random() * 10000 + 1000);
  const clicks = Math.floor(impressions * (Math.random() * 0.1)); // CTR up to 10%
  const spend = parseFloat((Math.random() * 500 + 50).toFixed(2));
  const ctr = parseFloat((clicks / impressions).toFixed(4));
  const cpc = parseFloat((spend / (clicks || 1)).toFixed(2)); // avoid division by zero

  return { spend, impressions, clicks, ctr, cpc };
}

// GET /fetch-analytics?platform=meta&account_id=acc_123
router.get("/", (req, res) => {
  const { platform, account_id } = req.query;

  if (!platform || !account_id) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  const analytics = generateAnalytics();
  console.log(`[FETCH ANALYTICS] Platform: ${platform}, Account: ${account_id}`);
  res.json(analytics);
});

export default router;

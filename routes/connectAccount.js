import express from "express";
import { saveToken } from "../tokenStore.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { platform, account_id } = req.body;

  if (!platform || !account_id)
    return res.status(400).json({ error: "platform and account_id required" });

  const now = Date.now();
  const tokenData = {
    status: "connected",
    access_token: `access_${account_id}_${now}`,
    refresh_token: `refresh_${account_id}_${now}`,
    expires_in: 120,
    expiryTime: now + 120 * 1000,
    platform
  };

  saveToken(account_id, tokenData);
  console.log(`✅ Account connected: ${account_id} on ${platform}`);

  res.json(tokenData);
});

export default router;

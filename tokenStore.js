const tokenStore = new Map();

export function saveToken(accountId, tokenData) {
  tokenStore.set(accountId, tokenData);
}

export function getToken(accountId) {
  return tokenStore.get(accountId);
}

export function refreshTokenIfExpired(accountId) {
  const token = tokenStore.get(accountId);
  if (!token) return null;

  const now = Date.now();
  if (now >= token.expiryTime) {
    const newToken = {
      ...token,
      access_token: `access_${accountId}_${now}`,
      expiryTime: now + 120 * 1000
    };
    tokenStore.set(accountId, newToken);
    console.log(`♻️ Token refreshed for ${accountId}`);
    return newToken;
  }
  return token;
}

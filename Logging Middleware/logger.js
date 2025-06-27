
const BASE_URL = "http://20.244.56.144/evaluation-service";
export async function initApp(clientID, clientSecret) {
  console.log("Authenticating via logger...");

  try {
    const authResponse = await fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyName: "Srishti Corp", clientID, clientSecret }),
    });

    if (!authResponse.ok) {
      throw new Error(`Auth Failed - ${authResponse.status}`);
    }

    const authData = await authResponse.json();
    const token = authData.access_token;
    console.log("Auth Success | Token:", token);

    await logEvent("Authentication Success", token);

    return token; 
  } catch (error) {
    console.error("Auth/Logging failed via logger.js:", error.message);
    return null;
  }
}

export async function logEvent(message, token) {
  try {
    await fetch(`${BASE_URL}/log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        message,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
}

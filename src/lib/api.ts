// A file to hold all API calls to the ESP32 hub.

const API_KEY = "be398f18-675b-4642-8f77-d60297d7de88";

function getBaseUrl() {
  if (typeof window === "undefined") {
    return "";
  }
  const ipAddress = localStorage.getItem("esp32-ip");
  if (!ipAddress) {
    throw new Error("ESP32 IP address not set. Please connect first.");
  }
  return `http://${ipAddress}:8000`;
}

async function makeApiRequest(endpoint: string, options: RequestInit = {}) {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/${API_KEY}/${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    // Handle cases where response might be empty
    const responseText = await response.text();
    try {
        return JSON.parse(responseText);
    } catch (e) {
        return responseText; // Return as plain text if not JSON
    }
}


// Device Management
export const updateDevice = (data: { deviceMac: string; deviceId: string }) =>
  makeApiRequest("device_update", {
    method: "POST",
    body: JSON.stringify(data),
  });

// Add other API functions here as needed

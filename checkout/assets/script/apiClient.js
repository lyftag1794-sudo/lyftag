const BASE_URL = "http://127.0.0.1:5001/lyftag-4b64b/asia-south1/api";

const apiClient = async (endPoint, options = {}) => {
  try {
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const headers = {
      ...defaultHeaders,
      ...options.headers,
    };

    const config = {
      method: options.method || "POST",
      headers: headers,
      ...options,
    };

    const response = await fetch(`${BASE_URL}${endPoint}`, config);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `HTTP Error: ${response.status}`,
        error: data.error || null,
        statusCode: response.status,
      };
    }

    return {
      success: true,
      data: data,
      statusCode: response.status,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Failed to connect to server",
      error: error.toString(),
    };
  }
};

export default apiClient;

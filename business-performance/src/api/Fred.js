const FRED_API_KEY = process.env.REACT_APP_FRED_API_KEY;
const FRED_API_BASE_URL = 'https://api.stlouisfed.org/fred/';
const CORS_PROXY = 'https://api.allorigins.win/raw?url='; // TODO development CORS proxy

/**
 * Utility function to fetch data from the FRED API.
 * @param {string} endpoint - API endpoint (e.g., "series", "series/observations").
 * @param {object} params - Query parameters as an object.
 * @returns {Promise<object>} - Parsed JSON response.
 */
async function fetchFredData(endpoint, params = {}) {
  // Append API key and default file type
  params.api_key = FRED_API_KEY;
  params.file_type = "json";

  // Convert params object to query string
  const queryString = new URLSearchParams(params).toString();
  const apiUrl = `${FRED_API_BASE_URL}${endpoint}?${queryString}`;
  const proxiedUrl = `${CORS_PROXY}${encodeURIComponent(apiUrl)}`; // TODO development only

  try {
    const response = await fetch(proxiedUrl);
    if (!response.ok) {
      throw new Error(`FRED API Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("FRED API Request Failed:", error);
    return null; // Return null in case of an error
  }
}

/**
 * Fetch metadata for a given FRED series.
 * @param {string} seriesId - The ID of the FRED series (e.g., "GDP").
 * @returns {Promise<object|null>} - Series metadata or null on error.
 */
export async function FredSeriesData(seriesId) {
  return fetchFredData("series", { series_id: seriesId });
}

/**
 * Fetch observations (historical data points) for a FRED series.
 * @param {string} seriesId - The ID of the FRED series (e.g., "GDP").
 * @param {string} observationStart - Start date (YYYY-MM-DD).
 * @param {string} observationEnd - End date (YYYY-MM-DD).
 * @param {string} frequency - Data frequency ("m" for monthly, "q" for quarterly, etc.).
 * @returns {Promise<object|null>} - Series observations or null on error.
 */
export async function FredSeriesObservations(seriesId, observationStart, observationEnd, frequency) {
  return fetchFredData("series/observations", {
    series_id: seriesId,
    observation_start: observationStart,
    observation_end: observationEnd,
    frequency: frequency,
  });
}

/**
 * Returns the appropriate date format for the given frequency.
 */
export function getDateFormatByFrequency(frequency) {
  switch (frequency) {
    case 'd': return 'MMM D, YYYY';  // "Jan 15, 2023"
    case 'w': return 'MMM D, YYYY';  // "Jan 15, 2023"
    case 'bw': return 'MMM D, YYYY'; // "Jan 15, 2023"
    case 'm': return 'MMM YYYY';     // "Jan 2023"
    case 'q': return '[Q]Q YYYY';    // "Q1 2023"
    case 'sa': return 'YYYY';        // "2023"
    case 'a': return 'YYYY';         // "2023"
    default: return 'MMM YYYY';      // Default fallback
  }
}

/**
 * Returns a suitable tick step based on frequency.
 */
export function getTickStepByFrequency(frequency) {
  switch (frequency) {
    case 'd': return 30;  // Show tick every ~30 days
    case 'w': return 4;   // Show tick every ~4 weeks
    case 'bw': return 8;  // Show tick every ~8 weeks
    case 'm': return 3;   // Show tick every 3 months
    case 'q': return 2;   // Show tick every 2 quarters
    case 'sa': return 1;  // Show tick every semiannual period
    case 'a': return 1;   // Show tick every year
    default: return 3;    // Default fallback
  }
}


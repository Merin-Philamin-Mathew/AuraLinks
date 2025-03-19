import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASEURL;


const OPENWEATHERAPI_BASEURL = import.meta.env.VITE_OPENWEATHERAPI_BASEURL;
const METABLUEAPI_BASEURL = import.meta.env.VITE_METABLUE_BASEURL;

export const OPENWEATHER_Instance = axios.create({
    baseURL:OPENWEATHERAPI_BASEURL,
})

export const METABLUE_Instance = axios.create({
    baseURL:METABLUEAPI_BASEURL,
})

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        // 'X-CSRFToken': 'PkML0am6vBm0nFcGB3bByTuqFjAlL5Vv', // Include the CSRF token
    },
});

api.interceptors.request.use(async (config) => {
    // Get CSRF token if needed
    if (!config.headers['X-CSRFToken']) {
        const response = await axios.get(`${BASE_URL}api/auth/csrf/`, { withCredentials: true });
        config.headers['X-CSRFToken'] = response.data.csrfToken;
    }
    return config;
});


export { BASE_URL, api };

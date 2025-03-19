const OPENWEATHERAPI_ID = import.meta.env.VITE_OPENWEATHERAPI_ID;
const METABLUEAPI_ID = import.meta.env.VITE_METABLUE_API_ID;
const BASE_URL = import.meta.env.VITE_BASEURL;

export const WEATHER_URLS = {
    weather: (lat,lon) => `/weather/?lat=${lat}&lon=${lon}&appid=${OPENWEATHERAPI_ID}`,
    forecast: (lat,lon,count) => `/forecast/?lat=${lat}&lon=${lon}&cnt=${count}&appid=${OPENWEATHERAPI_ID}`,
}

export const AUTH_URLS = {
    google_login: `${BASE_URL}api/accounts/google/login/?process=login&next=/api/auth/callback/`,
}

export const CHAT_URLS = {
    send_message: '/api/chat/current/',
    conversations: '/api/chat/conversations/',
    conversation_messages: (id) => `/api/chat/conversations/${id}/messages/`,
    send_conversation_message: (id) => `/api/chat/conversations/${id}/send_message/`,
    delete_all_conversations: '/api/chat/conversations/delete_all/',
    rename_conversation: (id) => `/api/chat/conversations/${id}/rename/`,
    delete_conversation: (id) => `/api/chat/conversations/${id}/`,
}
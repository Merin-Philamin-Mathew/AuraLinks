import { api } from "@/config/apis/axios";

export const urlShortenerApi = {
    getShortUrls: async () => {
        try {
            const response = await api.get(`api/s/urls/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching short URLs:', error);
            throw error;
        }
    },

    // Create a new short URL
    createShortUrl: async (urlData) => {
        try {
            const response = await api.post(`api/s/urls/`, urlData);
            return response.data;
        } catch (error) {
            console.error('Error creating short URL:', error);
            throw error;
        }
    },

    // Delete a short URL
    deleteShortUrl: async (id) => {
        try {
            await api.delete(`api/s/urls/${id}/`);
            return true;
        } catch (error) {
            console.error('Error deleting short URL:', error);
            throw error;
        }
    },

    // Get analytics for a specific short URL
    getUrlAnalytics: async (id) => {
        try {
            const response = await api.get(`api/s/urls/${id}/analytics/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching analytics:', error);
            throw error;
        }
    }
};
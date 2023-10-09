import { axiosInstance } from "../axiosInstance";

const CONFIG = {
    apiKey: 'be8c6a4c47c8e04774909a893e4c64fe',
}

export async function getTopTracksByCountry(country) {
    try {
        const response = await axiosInstance.get('', {
            params:{
                method: 'geo.gettoptracks',
                country: country,
                api_key: CONFIG.apiKey,
                format: 'json'
            }
        });
        return response.data.tracks.track;
    } catch (error) {
        console.log("Error fetching tracks", error);
        return[];
    }
}

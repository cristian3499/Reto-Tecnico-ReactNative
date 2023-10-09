import { useState, useEffect } from "react";
import { getTopTracksByCountry } from "../api/services/lastFm/lastFmService";

const useTopTracks = (country = 'mexico') => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTopTracksByCountry(country).then(tracksData => {
            setTracks(tracksData);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
        });
    }, [country]);

    return { tracks, loading };
}

export default useTopTracks;

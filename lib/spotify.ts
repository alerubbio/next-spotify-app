// lib/spotify.ts
import { useSession } from 'next-auth/react';
import axios from 'axios';


const useSpotify = () => {
  const { data: session } = useSession();

  const makeRequest = async (endpoint: string, config?: any) => {
    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new Error('No access token available');
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.get(`https://api.spotify.com/v1${endpoint}`, {
      ...config,
      headers,
    });

    return response.data;
  };

  return {
    getCurrentUserProfile: () => makeRequest('/me'),
    getUserSavedTracks: (limit: number) => makeRequest(`/me/tracks?limit=${limit}`),
    getUserTopTracks: () => makeRequest('/me/top/tracks'),
    getUserPlayLists: (limit: number, offset: number) =>
      makeRequest(`/me/playlists?limit=${limit}&offset=${offset}`),
    getPlaylist: (playlistId: string) => makeRequest(`/playlists/${playlistId}`),
    getPlaylistTracks: (playlistId: string) =>
      makeRequest(`/playlists/${playlistId}/tracks`),
    getTrackAudioFeatures: (trackId: string) => makeRequest(`/audio-features/${trackId}`),
  };
};

export default useSpotify;
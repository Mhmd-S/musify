import { api } from "@config/axiosConfig";
import errorHandler, { ErrorResponse } from "@request/errorHandler";
import { MusicGenerationParams, MusicGenerationResponse } from "./types";

export const generateMusic = async ({
  snapshots,
  duration,
  type,
  style
}: MusicGenerationParams): Promise<string> => {
  try {
    const formData = new FormData();
    
    snapshots.forEach((snapshot, index) => {
      const byteCharacters = atob(snapshot.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      
      formData.append(`snapshots`, blob, `snapshot_${index}.jpg`);
    });

    formData.append("duration", duration);
    formData.append("type", type);
    formData.append("style", style);

    const response = await api.request<MusicGenerationResponse>({
      method: "POST",
      url: `dream/generate-music`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });

    return response.data.data;
  } catch (error) {
    return errorHandler(error as ErrorResponse);
  }
};

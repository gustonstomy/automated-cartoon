import { getAudioUrl } from "google-tts-api";

/**
 * Generate an audio URL for the given text using Google TTS API
 */
export function generateAudioUrl(text: string): string {
  // Split text into smaller chunks if needed (google-tts-api handles this internally for getAudioUrl but good to know)
  // For this simple implementation, we'll assume short dialogue lines

  return getAudioUrl(text, {
    lang: "en",
    slow: false,
    host: "https://translate.google.com",
  });
}

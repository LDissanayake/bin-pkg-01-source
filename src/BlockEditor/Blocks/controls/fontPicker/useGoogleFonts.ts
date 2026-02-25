// useGoogleFonts.ts
import { useEffect, useState } from "react";
import fontsData from "./fonts.json";

export type GoogleFont = {
  label: string;
  variants: string[];
  category: string;
};

export const useGoogleFonts = () => {
  const [googleFonts, setGoogleFonts] = useState<Record<string, GoogleFont>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setGoogleFonts(fontsData as Record<string, GoogleFont>);
    } catch (e) {
      console.error("Error loading local fonts.json:", e);
      setError("Failed to load fonts");
    } finally {
      setLoading(false);
    }
  }, []);

  return { googleFonts, loading, error };
};

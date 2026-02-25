import React from "react";
import { Select, MultiSelect, Loader } from "@mantine/core";
import { useGoogleFonts } from "./useGoogleFonts";

type FontValue = [string, string, string[]];

interface Props {
  value: FontValue;
  onChange: (font: FontValue) => void;
}

const transformVariants = (
  variants: string[]
): { value: string; label: string }[] => {
  return variants.map((v) => ({
    value: v,
    label: v
      .replace("italic", " Italic")
      .replace("regular", "400"),
  }));
};

function FontPicker({ value, onChange }: Props) {
  const { googleFonts, loading, error } = useGoogleFonts();

  // -----------------------------
  // Font family options
  // -----------------------------
  const fontOptions = React.useMemo(
    () =>
      Object.keys(googleFonts).map((family) => ({
        value: family,
        label: `${family} (${googleFonts[family].category})`,
      })),
    [googleFonts]
  );

  // -----------------------------
  // Current value (safe defaults)
  // -----------------------------
  const [family = "", category = "", variants = []] = value || [];

  const currentFont = family ? googleFonts[family] : undefined;

  // -----------------------------
  // Variant options
  // -----------------------------
  const variantOptions = React.useMemo(
    () =>
      currentFont
        ? transformVariants(currentFont.variants)
        : [],
    [currentFont]
  );

  // -----------------------------
  // 🔒 Sanitize variants (CRITICAL)
  // -----------------------------
  const safeVariants = React.useMemo(() => {
    if (!currentFont) return [];
    const allowed = new Set(currentFont.variants);
    return variants.filter((v) => allowed.has(v));
  }, [variants, currentFont]);

  // -----------------------------
  // Handlers
  // -----------------------------
  const handleFamilyChange = (newFamily: string | null) => {
    if (!newFamily) return;

    const font = googleFonts[newFamily];
    if (!font) return;

    const defaultVariant =
      font.variants.includes("regular")
        ? "regular"
        : font.variants[0];

    onChange([newFamily, font.category, [defaultVariant]]);
  };

  const handleVariantChange = (newVariants: string[]) => {
    if (!currentFont) return;
    onChange([family, category, newVariants]);
  };

  // -----------------------------
  // Loading / Error states
  // -----------------------------
  if (loading) return <Loader size="sm" />;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Font Family */}
      <Select
        searchable
        placeholder="Select font"
        data={fontOptions}
        value={family || null}
        onChange={handleFamilyChange}
        nothingFoundMessage="No fonts found"
        clearable={false}
        size={'xs'}
      />

      {/* Variants */}
      <MultiSelect
        disabled={!currentFont}
        placeholder="Select variants"
        data={variantOptions}
        value={safeVariants}
        onChange={handleVariantChange}
        searchable
        nothingFoundMessage="No variants"
        size={'xs'}
      />
    </div>
  );
}

export default FontPicker;

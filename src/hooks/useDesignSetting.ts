import { useEffect, useState } from 'react';

type Serializer<T> = {
  parse: (v: string) => T;
  stringify: (v: T) => string;
};

const defaultSerializer: Serializer<any> = {
  parse: JSON.parse,
  stringify: JSON.stringify,
};

export function useDesignSetting<T>(
  designId: string | null,
  key: string,
  defaultValue: T,
  serializer: Serializer<T> = defaultSerializer
) {
  const [value, setValue] = useState<T>(defaultValue);

  // load when design changes
  useEffect(() => {
    if (!designId) return;

    const raw = localStorage.getItem(`${key}_${designId}`);
    setValue(raw ? serializer.parse(raw) : defaultValue);
  }, [designId, key]);

  // save when value changes
  useEffect(() => {
    if (!designId) return;

    localStorage.setItem(
      `${key}_${designId}`,
      serializer.stringify(value)
    );
  }, [value, designId, key]);

  return [value, setValue] as const;
}

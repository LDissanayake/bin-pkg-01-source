import React, { ReactElement, useEffect, useRef, useState } from 'react';
import * as styles from './DragNumberInput.module.css';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { NumberInput, Popover } from '@mantine/core';

interface UnitOption {
  value: string;
  label: string;
  keyword?: boolean; // 👈 NEW
}

interface DragNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  icon: string | ReactElement;
  units?: UnitOption[];
  defaultUnit?: string;
  min?: number;
  max?: number;
  allowNegative?: boolean;
  step?: number;
  placeholder?: string;
}

const DragNumberInput = ({
  value: initialValue,
  onChange,
  icon,
  units,
  defaultUnit = "",
  min,
  max,
  allowNegative = false,
  step = 1,
  placeholder,
}: DragNumberInputProps) => {

  const parseValue = (
    v: string | number | null | undefined,
    defaultUnit = ""
  ) => {
    if (v === null || v === undefined) {
      return { number: NaN, unit: defaultUnit };
    }

    const value = String(v).trim();

    // ✅ keyword-only value (auto, fit-content, etc.)
    if (!value.match(/\d/)) {
      return { number: NaN, unit: value };
    }

    const match = value.match(/^(-?\d*\.?\d+)([a-z%]*)$/i);
    if (match) {
      return {
        number: parseFloat(match[1]),
        unit: match[2] || defaultUnit,
      };
    }

    return { number: NaN, unit: defaultUnit };
  };

  const { number: initialNumber, unit: initialUnit } = parseValue(initialValue);

  const [value, setValue] = useState<number | undefined>(
    isNaN(initialNumber) ? undefined : initialNumber
  );

  const [unit, setUnit] = useState(() => {
    const validUnits = units?.map((u) => u.value);
    if (validUnits?.includes(initialUnit)) return initialUnit;
    return defaultUnit;
  });

  const isKeywordUnit = units?.find(u => u.value === unit)?.keyword;

  const [isDragging, setIsDragging] = useState(false);
  const [dragDir, setDragDir] = useState<"left" | "right" | null>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const [unitOpen, setUnitOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  useEffect(() => {
    if (firstRender) return;

    // ✅ keyword-only emit
    if (isKeywordUnit) {
      onChange(unit);
      return;
    }

    if (value === undefined || isNaN(value)) {
      onChange("");
    } else {
      onChange(`${value}${unit}`);
    }
  }, [value, unit]);

  const clampValue = (num: number) => {
    let result = num;
    if (!allowNegative) result = Math.max(0, result);
    if (min !== undefined) result = Math.max(min, result);
    if (max !== undefined) result = Math.min(max, result);
    return result;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isKeywordUnit) return; // 🚫 disable drag for keywords

    e.preventDefault();
    iconRef.current?.requestPointerLock();
    setIsDragging(true);

    const handleMouseMove = (event: MouseEvent) => {
      const delta = event.movementX;
      if (!delta) return;

      setDragDir(delta > 0 ? "right" : "left");

      setValue((v) => {
        const next = (v ?? 0) + delta * step;
        return clampValue(parseFloat(next.toFixed(4)));
      });
    };

    const handleMouseUp = () => {
      document.exitPointerLock();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      setIsDragging(false);
      setDragDir(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleManualChange = (val: number | string) => {
    if (isKeywordUnit) return;

    if (val === "" || val === null) {
      setValue(undefined);
      return;
    }

    const num = Number(val);
    if (!isNaN(num)) {
      setValue(clampValue(num));
    }
  };

  const currentLabel =
    units?.find((u) => u.value === unit)?.label || unit || "";

  return (
    <div className={styles.dragNumberInput}>
      <div
        ref={iconRef}
        onMouseDown={handleMouseDown}
        className={styles.dragNumberInput_icon_wrap}
      >
        <span className={styles.dragNumberInput_icon} data-dragging={isDragging}>
          {icon}
        </span>
        <span
          className={styles.dragNumberInput_ball}
          data-dragging={isDragging}
          data-dragging-direction={dragDir}
        />
      </div>

      <div className={styles.dragNumberInput_wrap}>
        <NumberInput
          variant="unstyled"
          size="xs"
          value={isKeywordUnit ? "" : value ?? ""}
          onChange={handleManualChange}
          disabled={isKeywordUnit}
          suffix={currentLabel}
          placeholder={isKeywordUnit ? unit : placeholder}
        />

        {units && units.length > 1 && (
          <Popover
            position="bottom"
            opened={unitOpen}
            closeOnClickOutside
            closeOnEscape
          >
            <Popover.Target>
              <button
                type="button"
                className={styles.dragNumberInput_unitTrigger}
                onClick={() => setUnitOpen(v => !v)}
              >
                <CaretDownIcon />
              </button>
            </Popover.Target>

            <Popover.Dropdown style={{ padding: 0 }}>
              <div className={styles.dragNumberInput_unitOverlay}>
                {units.map((u) => (
                  <button
                    key={u.value}
                    className={styles.dragNumberInput_unitItem}
                    data-active={u.value === unit}
                    onClick={() => {
                      setUnit(u.value);
                      if (u.keyword) setValue(undefined);
                      setUnitOpen(false);
                    }}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </Popover.Dropdown>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default DragNumberInput;

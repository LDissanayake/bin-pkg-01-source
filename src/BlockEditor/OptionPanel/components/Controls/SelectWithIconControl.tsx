import React, { ReactElement, useEffect, useRef, useState } from 'react';
import * as styles from './SelectWithIconControl.module.css';
import {Select} from '@mantine/core';


interface controlProps {
  value: string;
  onChange: (value: string) => void;
  icon: string | ReactElement;
  data: any,
  placeholder?: string
}

const control = ({
  value: initialValue,
  onChange,
  icon,
  data,
  placeholder
}: controlProps) => {


  const [value, setValue] = useState<any>(initialValue);

  const iconRef = useRef<HTMLDivElement>(null);

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  useEffect(() => {
    if (firstRender) { return }
    onChange(value);
  }, [value]);

  return (
    <div className={styles.control}>
      <div
        ref={iconRef}
        className={styles.control_icon_wrap}
      >
        <span className={styles.control_icon}>
          {icon}
        </span>
      </div>

      <div className={styles.control_wrap}>
        <Select
          variant="unstyled"
          size="xs"
          radius="xs"
          placeholder={placeholder || 'Select'}
          data={data}
          onChange={setValue}
          value={value}
        />
      </div>
    </div>
  );
};

export default control;
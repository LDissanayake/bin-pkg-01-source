import React, { } from 'react';
import TransformSection from './Sections/TransformSection';
import SizeSection from './Sections/SizeSection';


interface SectionProps {
  type: 'size' | 'transform',
}

const sectionMap: Record<string, JSX.Element> = {
  transform: <TransformSection />,
  size: <SizeSection />,
};

function Section({ type }: SectionProps) {
  return sectionMap[type] ?? null;
}

export default Section
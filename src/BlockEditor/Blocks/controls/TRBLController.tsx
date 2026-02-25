import React, { useCallback } from 'react';

/**
 * TRBLController - A standalone React component for CSS positioning.
 */

export type TRBLSide = 'T' | 'R' | 'B' | 'L';

export interface TRBLControllerProps {
  value?: TRBLSide[];
  onChange?: (activeEdges: TRBLSide[]) => void;
  size?: number;
}

export const TRBLController: React.FC<TRBLControllerProps> = ({
  value = [],
  onChange,
  size = 120,
}) => {
  const isT = value.includes('T');
  const isR = value.includes('R');
  const isB = value.includes('B');
  const isL = value.includes('L');

  const handleToggle = useCallback(
    (points: TRBLSide[]) => {
      let newValue: TRBLSide[];

      const allActive = points.every(p => value.includes(p));

      if (allActive) {
        newValue = value.filter(p => !points.includes(p));
      } else {
        newValue = Array.from(new Set([...value, ...points]));
      }

      onChange?.(newValue);
    },
    [value, onChange]
  );

  const styles = {
    container: {
      position: 'relative',
      width: size,
      height: size,
      backgroundColor: '#141414',
      borderRadius: '8px',
      border: '1px solid #252525',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      userSelect: 'none',
    } satisfies React.CSSProperties,

    boundary: {
      position: 'absolute',
      inset: '12px',
      border: '1px dashed #333',
      borderRadius: '2px',
      opacity: 0.3,
      pointerEvents: 'none',
    } satisfies React.CSSProperties,

    previewBox: {
      position: 'relative',
      width: '35%',
      height: '35%',
      backgroundColor: '#222',
      border: '1px solid #3D3D3D',
      borderRadius: '2px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      zIndex: 10,
    } satisfies React.CSSProperties,

    dot: (active: boolean): React.CSSProperties => ({
      position: 'absolute',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: active ? '#4F46E5' : '#555',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 30,
      outline: 'none',
      boxShadow: active
        ? '0 0 8px #4F46E5, inset 0 0 0 1px rgba(255,255,255,0.2)'
        : 'none',
      transform: active ? 'scale(1.3)' : 'scale(1)',
    }),

    tether: (orientation: TRBLSide): React.CSSProperties => ({
      position: 'absolute',
      backgroundColor: '#4F46E5',
      opacity: 0.4,
      zIndex: 5,
      ...(orientation === 'T' && {
        top: 0,
        bottom: '50%',
        left: '50%',
        width: '1px',
        borderLeft: '1px dashed currentColor',
        transform: 'translateX(-50%)',
      }),
      ...(orientation === 'B' && {
        bottom: 0,
        top: '50%',
        left: '50%',
        width: '1px',
        borderLeft: '1px dashed currentColor',
        transform: 'translateX(-50%)',
      }),
      ...(orientation === 'L' && {
        left: 0,
        right: '50%',
        top: '50%',
        height: '1px',
        borderTop: '1px dashed currentColor',
        transform: 'translateY(-50%)',
      }),
      ...(orientation === 'R' && {
        right: 0,
        left: '50%',
        top: '50%',
        height: '1px',
        borderTop: '1px dashed currentColor',
        transform: 'translateY(-50%)',
      }),
    }),

    edgeHighlight: (side: TRBLSide): React.CSSProperties => ({
      position: 'absolute',
      backgroundColor: '#4F46E5',
      zIndex: 20,
      ...(side === 'T' && { top: -1, left: 0, right: 0, height: '2px' }),
      ...(side === 'B' && { bottom: -1, left: 0, right: 0, height: '2px' }),
      ...(side === 'L' && { left: -1, top: 0, bottom: 0, width: '2px' }),
      ...(side === 'R' && { right: -1, top: 0, bottom: 0, width: '2px' }),
    }),
  };

  return (
    <div style={styles.container}>
      <div style={styles.boundary} />

      <div style={{ position: 'absolute', inset: '12px', pointerEvents: 'none' }}>
        {isT && <div style={styles.tether('T')} />}
        {isR && <div style={styles.tether('R')} />}
        {isB && <div style={styles.tether('B')} />}
        {isL && <div style={styles.tether('L')} />}
      </div>

      <div style={styles.previewBox}>
        {isT && <div style={styles.edgeHighlight('T')} />}
        {isR && <div style={styles.edgeHighlight('R')} />}
        {isB && <div style={styles.edgeHighlight('B')} />}
        {isL && <div style={styles.edgeHighlight('L')} />}

        <button style={{ ...styles.dot(isT && isL), top: -3, left: -3 }} onClick={() => handleToggle(['T', 'L'])} />
        <button style={{ ...styles.dot(isT && isR), top: -3, right: -3 }} onClick={() => handleToggle(['T', 'R'])} />
        <button style={{ ...styles.dot(isB && isL), bottom: -3, left: -3 }} onClick={() => handleToggle(['B', 'L'])} />
        <button style={{ ...styles.dot(isB && isR), bottom: -3, right: -3 }} onClick={() => handleToggle(['B', 'R'])} />

        <button style={{ ...styles.dot(isT && !isL && !isR), top: -3, left: '50%', transform: `translateX(-50%) ${isT && !isL && !isR ? 'scale(1.3)' : 'scale(1)'}` }} onClick={() => handleToggle(['T'])} />
        <button style={{ ...styles.dot(isB && !isL && !isR), bottom: -3, left: '50%', transform: `translateX(-50%) ${isB && !isL && !isR ? 'scale(1.3)' : 'scale(1)'}` }} onClick={() => handleToggle(['B'])} />
        <button style={{ ...styles.dot(isL && !isT && !isB), left: -3, top: '50%', transform: `translateY(-50%) ${isL && !isT && !isB ? 'scale(1.3)' : 'scale(1)'}` }} onClick={() => handleToggle(['L'])} />
        <button style={{ ...styles.dot(isR && !isT && !isB), right: -3, top: '50%', transform: `translateY(-50%) ${isR && !isT && !isB ? 'scale(1.3)' : 'scale(1)'}` }} onClick={() => handleToggle(['R'])} />
      </div>
    </div>
  );
};

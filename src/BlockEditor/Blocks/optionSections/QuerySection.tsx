import { IconChevronCompactDown, IconChevronDown } from '@tabler/icons-react';
import React, { useState, useRef, useEffect } from 'react';
import { UnstyledButton } from '@mantine/core';
import * as styles from './QuerySection.module.css';

/**
 * Tabler Icon Components (Inline SVGs)
 * These match the @tabler/icons-react style.
 */
const IconEdit = ({ size = 16, stroke = 2, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" />
    </svg>
);

const IconSettings = ({ size = 16, stroke = 2, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37a1.724 1.724 0 0 0 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    </svg>
);

const IconPulse = ({ size = 16, stroke = 2, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 12h4l3 8l4 -16l3 8h4" />
    </svg>
);

const IconX = ({ size = 16, stroke = 2, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 6l-12 12" /><path d="M6 6l12 12" />
    </svg>
);

const IconLayersIntersect = ({ size = 16, stroke = 2, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M8 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" /><path d="M4 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
    </svg>
);

const IconClick = ({ size = 16, stroke = 2, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 12l3 0" /><path d="M12 3l0 3" /><path d="M7.8 7.8l-2.2 -2.2" /><path d="M16.2 7.8l2.2 -2.2" /><path d="M7.8 16.2l-2.2 2.2" /><path d="M12 12l9 3l-4 2l-2 4l-3 -9" />
    </svg>
);

const IconInfoCircle = ({ size = 16, stroke = 2, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" />
    </svg>
);

/**
 * Compact Sidebar Container Visualizer
 * Desktop First | Standalone | Optimized for vertical density.
 * Now using Tabler-style custom icons.
 */
const QuerySection = () => {
    const [breakpoints, setBreakpoints] = useState([480, 768, 1024]);
    const [inputValue, setInputValue] = useState('');
    const [containerId, setContainerId] = useState('text-wrapper');
    const [simWidth, setSimWidth] = useState(1200);
    const [isResizing, setIsResizing] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [expand, setExpand] = useState(false);

    const visualizerRef = useRef(null);

    const brand = {
        primary: 'rgb(153, 177, 210)',
        primaryAlpha: 'rgba(153, 177, 210, 0.08)',
        primaryAlphaStrong: 'rgba(153, 177, 210, 0.25)',
        primaryGlow: '0 0 10px rgba(153, 177, 210, 0.4)',
    };

    const colors = {
        bg: '#0d0d0d',
        card: '#111',
        accent: brand.primary,
        text: '#d1d1d1',
        textMuted: '#555',
        border: 'rgba(255, 255, 255, 0.04)',
        input: '#0a0a0a',
    };

    const sidebarContentWidth = 245;
    const maxBp = breakpoints.length > 0 ? Math.max(...breakpoints) : 0;
    const simulatedFullRange = Math.max(1280, maxBp + 120);
    const scaleRatio = sidebarContentWidth / simulatedFullRange;

    const addBreakpoint = (e) => {
        if (e.key === 'Enter' || e.type === 'blur') {
            const val = parseInt(inputValue);
            if (!isNaN(val) && !breakpoints.includes(val)) {
                setBreakpoints([...breakpoints, val].sort((a, b) => a - b));
                setInputValue('');
            }
        }
    };

    const removeBreakpoint = (val) => {
        setBreakpoints(breakpoints.filter(bp => bp !== val));
    };

    const startResizing = (e) => {
        setIsResizing(true);
        e.preventDefault();
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing || !visualizerRef.current) return;
            const rect = visualizerRef.current.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const calculatedSimWidth = Math.max(20, mouseX / scaleRatio);
            setSimWidth(Math.min(calculatedSimWidth, simulatedFullRange));
        };
        const handleMouseUp = () => setIsResizing(false);
        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'ew-resize';
        } else {
            document.body.style.cursor = 'default';
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, scaleRatio, simulatedFullRange]);

    const activeBreakpoint = [...breakpoints].sort((a, b) => a - b).find(bp => simWidth <= bp) || 0;

    return (
        <div style={{
            width: '100%',
            color: colors.text,
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
        }} className="compact-scroll">
            <style>{`
        .compact-scroll::-webkit-scrollbar { width: 3px; }
        .compact-scroll::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .pulse { animation: pulse 2.5s ease-in-out infinite; }
      `}</style>

            {/* Tiny Header */}
            <div style={{
                padding: '8px',
                borderBottom: `1px solid var(--border-c)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                        fontSize: '9px',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 12 9">
                            <g id="Rectangle_4769" data-name="Rectangle 4769" fill="none" stroke="currentColor" stroke-width="1">
                                <rect width="12" height="9" rx="2" stroke="none" />
                                <rect x="0.5" y="0.5" width="11" height="8" rx="1.5" fill="none" />
                            </g>
                            <rect id="Rectangle_4771" data-name="Rectangle 4771" width="1" height="5" transform="translate(3 2)" fill="currentColor" />
                            <rect id="Rectangle_4772" data-name="Rectangle 4772" width="1" height="5" transform="translate(8 2)" fill="currentColor" />
                        </svg>

                        Breakpoints
                    </span>
                </div>
                <UnstyledButton
                    className={styles.dropBtn}
                    data-expand={expand}
                    onClick={() => setExpand(!expand)}
                >
                    <IconChevronDown size="70%" />
                </UnstyledButton>
            </div>
            {expand && <div style={{ paddingBottom: 8, borderBottom: '1px solid var(--border-c)', }}>
                {/* Simulator Display */}
                <div style={{ padding: '12px 8px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '9px', fontWeight: 'bold', opacity: .5 }}>@{containerId}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#34d399', fontSize: '10px', fontFamily: 'monospace' }}>
                            <IconPulse size={10} className="pulse" />
                            {Math.round(simWidth)}px
                        </div>
                    </div>

                    <div ref={visualizerRef} style={{
                        position: 'relative',
                        height: '80px',
                        width: '100%',
                        backgroundColor: '#050505',
                        borderRadius: '6px',
                        border: `1px solid var(--border-c)`,
                        overflow: 'hidden'
                    }}>
                        {/* Active Area */}
                        <div style={{
                            height: '100%',
                            width: `${simWidth * scaleRatio}px`,
                            background: `linear-gradient(to right, ${brand.primaryAlpha}, rgba(0,0,0,0))`,
                            borderRight: `1.5px solid ${activeBreakpoint ? brand.primary : 'rgba(255,255,255,0.06)'}`,
                            position: 'relative',
                            transition: isResizing ? 'none' : 'width(0.15s ease-out)'
                        }}>
                            {/* Handle */}
                            <div
                                onMouseDown={startResizing}
                                style={{
                                    position: 'absolute',
                                    right: '-6px',
                                    top: '0',
                                    bottom: '0',
                                    width: '12px',
                                    cursor: 'ew-resize',
                                    zIndex: 20
                                }}
                            >
                                <div style={{
                                    margin: '20px auto',
                                    width: '3px',
                                    height: '40px',
                                    backgroundColor: brand.primary,
                                    borderRadius: '10px',
                                    boxShadow: brand.primaryGlow
                                }} />
                            </div>
                        </div>

                        {/* Markers */}
                        {breakpoints.map((bp) => (
                            <div
                                key={bp}
                                style={{
                                    position: 'absolute',
                                    top: '0',
                                    bottom: '0',
                                    left: `${bp * scaleRatio}px`,
                                    pointerEvents: 'none'
                                }}
                            >
                                <div style={{
                                    height: '100%',
                                    borderLeft: `1px dashed ${simWidth <= bp ? brand.primaryAlphaStrong : 'rgba(255,255,255,0.03)'}`
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '4px',
                                    left: '3px',
                                    fontSize: '8px',
                                    fontWeight: 'bold',
                                    color: simWidth <= bp ? brand.primary : colors.textMuted,
                                    opacity: simWidth <= bp ? 1 : 0.4
                                }}>
                                    {bp}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tighter Controls */}
                <div style={{ padding: '0 8px 8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'stretch', gap: 4 }}>

                        {/* Status Line - Always Visible */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: brand.primaryAlpha,
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: `1px solid ${brand.primaryAlphaStrong}`,
                            flex: 1
                        }}>
                            <span style={{ fontSize: '9px', fontWeight: 'bold', color: brand.primary, textTransform: 'uppercase' }}>Current Query</span>
                            <span style={{ fontSize: '10px', color: brand.primary, fontFamily: 'monospace' }}>
                                {activeBreakpoint > 0 ? `max-width: ${activeBreakpoint}px` : 'base desktop'}
                            </span>

                        </div>
                        <div
                            onClick={() => setShowOptions(!showOptions)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                cursor: 'pointer',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                backgroundColor: showOptions ? brand.primaryAlphaStrong : 'transparent',
                                transition: 'all 0.2s',
                                border: `1px solid ${showOptions ? brand.primaryAlphaStrong : 'transparent'}`
                            }}
                        >
                            <IconEdit size={12} style={{ color: showOptions ? brand.primary : 'inherit' }} />
                        </div>
                    </div>

                    {/* Toggleable Options Section */}
                    {showOptions && (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '14px',
                            padding: '12px 0',
                            borderBottom: `1px solid ${colors.border}`,
                            animation: 'fadeIn 0.2s ease-out'
                        }}>
                            <style>{`
              @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>

                            {/* ID Input */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{ fontSize: '8px', fontWeight: 'bold', color: colors.textMuted, textTransform: 'uppercase' }}>Container Identifier</span>
                                <input
                                    style={{
                                        width: '100%',
                                        backgroundColor: colors.input,
                                        border: `1px solid ${colors.border}`,
                                        borderRadius: '4px',
                                        padding: '6px 10px',
                                        fontSize: '11px',
                                        color: colors.text,
                                        outline: 'none'
                                    }}
                                    value={containerId}
                                    onChange={(e) => setContainerId(e.target.value)}
                                    placeholder="e.g. wrapper"
                                />
                            </div>

                            {/* Breakpoints Tags Area */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center' }}>
                                    <label style={{ fontSize: '8px', fontWeight: 'bold', color: colors.textMuted, textTransform: 'uppercase' }}>Edit Breakpoints (px)</label>
                                    <IconClick size={10} style={{ color: colors.textMuted }} />
                                </div>
                                <div style={{
                                    backgroundColor: colors.input,
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: '6px',
                                    padding: '8px',
                                    minHeight: '70px',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '6px',
                                    alignContent: 'flex-start'
                                }}>
                                    {breakpoints.map((bp) => (
                                        <div
                                            key={bp}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                padding: '3px 6px',
                                                borderRadius: '4px',
                                                fontSize: '11px',
                                                border: `1px solid ${simWidth <= bp ? brand.primaryAlphaStrong : colors.border}`,
                                                backgroundColor: simWidth <= bp ? brand.primaryAlpha : '#151515',
                                                color: simWidth <= bp ? brand.primary : colors.textMuted
                                            }}
                                        >
                                            <span style={{ fontWeight: '600' }}>{bp}</span>
                                            <IconX
                                                size={10}
                                                style={{ cursor: 'pointer', opacity: 0.5 }}
                                                onClick={() => removeBreakpoint(bp)}
                                            />
                                        </div>
                                    ))}
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={addBreakpoint}
                                        placeholder="+"
                                        style={{
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            outline: 'none',
                                            fontSize: '10px',
                                            color: colors.textMuted,
                                            width: '30px',
                                            padding: '2px'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            }
        </div>
    );
};

export default QuerySection;
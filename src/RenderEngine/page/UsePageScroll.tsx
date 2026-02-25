import React, { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import { cancelFrame, frame } from 'framer-motion';
import { usePage } from './PageContext';

import {
    PlaneGeometry
} from 'three';

type Rect = {
    width: number;
    height: number;
    top: number;
    left: number;
};

type UsePageScrollProps = {
    track: React.RefObject<HTMLElement>;
    children: (rect: Rect | null) => React.ReactNode;
};

const UsePageScroll = ({ track, children }: UsePageScrollProps) => {

    const { isAnimatingRef } = usePage();

    const [rect, setRect] = useState<Rect | null>({});
    const meshRef = useRef();
    // const rect = useRef({});
    // console.log(meshRef);

    // useEffect(() => {
    //     if (!track.current) return;

    //     const observer = new IntersectionObserver(([entry]) => {
    //          const update = () => {
    //         if (track.current && meshRef.current) {
    //             const clientWidth = document.documentElement.clientWidth;
    //             const clientHeight = document.documentElement.clientHeight;

    //             const r = track.current.getBoundingClientRect();
    //             const x = r.left + r.width / 2 - clientWidth / 2;
    //             const y = -(r.top + r.height / 2 - clientHeight / 2);
    //             const z = 0;

    //             meshRef.current.position.set(x, y, z);

    //         }
    //     };

    //     update();
    //     }, {
    //         root: null,
    //         threshold: 0,
    //     });

    //     observer.observe(track.current);
    //     return () => observer.disconnect();
    // }, []);



    useEffect(() => {
        const update = ({ timestamp }: { timestamp: number }) => {
            if (isAnimatingRef.current) {
                const update = () => {
                    if (track.current && meshRef.current) {
                        const clientWidth = document.documentElement.clientWidth;
                        const clientHeight = document.documentElement.clientHeight;

                        const r = track.current.getBoundingClientRect();
                        const x = r.left + r.width / 2 - clientWidth / 2;
                        const y = -(r.top + r.height / 2 - clientHeight / 2);
                        const z = 0;
                        meshRef.current.position.set(x, y, z);
                        const geometry = new PlaneGeometry(r.width, r.height);
                        meshRef.current.geometry.dispose(); // clean up old geometry
                        meshRef.current.geometry = geometry;


                    }
                };
               
                update();
            }
        }

        frame.update(update, true)
        return () => cancelFrame(update)
    }, [])

    useLenis((lenis) => {
        const update = () => {
            if (track.current && meshRef.current) {
                const clientWidth = document.documentElement.clientWidth;
                const clientHeight = document.documentElement.clientHeight;

                const r = track.current.getBoundingClientRect();
                const x = r.left + r.width / 2 - clientWidth / 2;
                const y = -(r.top + r.height / 2 - clientHeight / 2);
                const z = 0;

                meshRef.current.position.set(x, y, z);


            }
        };

        update();
    });

    // const lenis = useLenis((lenis) => {
    //     // called every scroll
    //     // console.log(lenis,'aaa');
    //     const update = () => {
    //         if (track.current) {
    //             const r = track.current.getBoundingClientRect();
    //             setRect({
    //                 width: r.width,
    //                 height: r.height,
    //                 top: r.top,
    //                 left: r.left,
    //             });
    //         }
    //     };

    //     update();
    // })



    useEffect(() => {
        const update = () => {
            if (track.current) {
                const r = track.current.getBoundingClientRect();
                setRect({
                    width: r.width,
                    height: r.height,
                    top: r.top,
                    left: r.left,
                });
            }
        };

        update();
    }, [track]);

    return <>{children({ rect, meshRef })}</>;
};

export default UsePageScroll;

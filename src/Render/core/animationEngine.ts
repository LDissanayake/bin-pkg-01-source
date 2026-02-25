// --- 2. ENGINE LOGIC (Resolver & Conductor) ---

export const Resolver = {
  getSensors: (el, targetContainerEl, themeOverride) => {
    if (!el) return { isDark: false, bp: 9999, containerWidth: 9999 };
    const style = getComputedStyle(el);
    const containerWidth = targetContainerEl ? targetContainerEl.offsetWidth : document.body.offsetWidth;
    
    return {
      isDark: themeOverride ? (themeOverride === 'd') : (style.getPropertyValue('--is-dark').trim() === "1"),
      bp: containerWidth,
      containerWidth: containerWidth
    };
  },
  resolve: (propData, sensors) => {
    if (!propData) return undefined;
    let res = propData.value;
    // Theme Resolution
    if (res && typeof res === 'object' && ('l' in res || 'd' in res)) {
      res = sensors.isDark ? (res.d || res.l) : (res.l || res.d);
    }
    // Breakpoint Resolution (Point and Down)
    if (propData.m) {
      const sortedPts = Object.keys(propData.m).map(Number).sort((a, b) => a - b);
      for (const pt of sortedPts) {
        if (sensors.bp <= pt) {
          const over = propData.m[pt];
          res = (typeof over === 'object' && over !== null && 'v' in over) ? over.v : over;
          break;
        }
      }
    }
    return res;
  }
};

const elementAnimations = new WeakMap();

const Conductor = {
  animate: (el, timeline, sensors) => {
    if (!el || !timeline) return;

    // 1. ATOMIC RESET (The Kill Switch)
    // Get existing metadata or initialize
    const meta = elementAnimations.get(el) || { version: 0, timeouts: [] };
    
    // Increment version immediately to invalidate any pending setTimeouts from previous calls
    const vTag = meta.version + 1;
    
    // Clear the physical browser timeouts to stop them from even firing
    meta.timeouts.forEach(t => clearTimeout(t));
    
    // Create the new active state for this specific animation reign
    const active = {
      version: vTag,
      timeouts: []
    };
    
    // Save back to WeakMap immediately so the next call (even if it's in 1ms) sees the new version
    elementAnimations.set(el, active);

    const propMap = { 
        bg: 'bgc', blur: 'f-blur', x: 'tx', y: 'ty', z: 'tz', 
        skx: 'skx', sky: 'sky', gray: 'f-gray', sat: 'f-sat', 
        bright: 'f-bright', contrast: 'f-contrast' 
    };

    const discreteProps = ['dp', 'fd', 'jc', 'ai', 'gtc', 'gtr'];
    
    const animatableTimeline = {};
    const discreteTimelineMap = new Map();

    // 2. TIMELINE COMPILATION
    Object.entries(timeline).forEach(([prop, steps]) => {
      const key = propMap[prop] || prop;
      const isDiscrete = discreteProps.includes(prop);
      let delayAcc = 0;

      steps.forEach(step => {
        let v = step.v;
        let du = step.du, e = step.e, de = step.de || 0;

        // Resolve Theme
        if (v && typeof v === 'object' && ('l' in v || 'd' in v)) {
          v = sensors.isDark ? (v.d || v.l) : (v.l || v.d);
        }

        // Resolve Responsive
        if (step.m) {
          const sortedPts = Object.keys(step.m).map(Number).sort((a, b) => a - b);
          for (const pt of sortedPts) {
            if (sensors.bp <= pt) {
              const over = step.m[pt];
              if (typeof over === 'object' && over !== null) {
                if ('v' in over) v = over.v;
                if ('du' in over) du = over.du;
                if ('e' in over) e = over.e;
                if ('de' in over) de = over.de;
              } else { v = over; }
              break;
            }
          }
        }

        const startAt = delayAcc + de;

        if (isDiscrete) {
          if (!discreteTimelineMap.has(startAt)) {
            discreteTimelineMap.set(startAt, { props: {}, du: du || 600, e: e || 'ease' });
          }
          const batch = discreteTimelineMap.get(startAt);
          batch.props[key] = v;
        } else {
          animatableTimeline[key] = animatableTimeline[key] || [];
          animatableTimeline[key].push({ v, du, e, startAt });
        }
        
        delayAcc += ((du || 600) + de);
      });
    });

    // 3. EXECUTION WITH VERSION GUARDS
    
    // Process Animatable Properties
    Object.entries(animatableTimeline).forEach(([key, frames]) => {
      frames.forEach(frame => {
        const id = setTimeout(() => {
          // Double Guard: Verify if this is still the active animation run
          const latest = elementAnimations.get(el);
          if (!latest || latest.version !== vTag) return;

          el.style.setProperty(`--${key}`, String(frame.v));
          if (frame.du) el.style.setProperty(`--${key}-du`, `${frame.du}ms`);
          if (frame.e) el.style.setProperty(`--${key}-e`, frame.e);
        }, frame.startAt);
        active.timeouts.push(id);
      });
    });

    // Process Discrete Properties (Batched FLIP)
    discreteTimelineMap.forEach((batch, startAt) => {
      const id = setTimeout(() => {
        // Double Guard
        const latest = elementAnimations.get(el);
        if (!latest || latest.version !== vTag) return;

        // --- FLIP PHASE: FIRST ---
        const children = Array.from(el.children).filter(c => c instanceof HTMLElement);
        const firstRects = children.map(c => c.getBoundingClientRect());

        // Apply layout changes
        Object.entries(batch.props).forEach(([k, val]) => {
          el.style.setProperty(`--${k}`, String(val));
        });

        // --- FLIP PHASE: INVERT ---
        requestAnimationFrame(() => {
          // Inner Version Guard for async RAF
          const rafLatest = elementAnimations.get(el);
          if (!rafLatest || rafLatest.version !== vTag) return;

          const lastRects = children.map(c => c.getBoundingClientRect());

          children.forEach((child, i) => {
            const dx = firstRects[i].left - lastRects[i].left;
            const dy = firstRects[i].top - lastRects[i].top;

            if (dx !== 0 || dy !== 0) {
              child.style.setProperty('--fx-du', '0ms');
              child.style.setProperty('--fy-du', '0ms');
              child.style.setProperty('--fx', `${dx}px`);
              child.style.setProperty('--fy', `${dy}px`);
              child.offsetHeight; // Force layout sync
            }
          });

          // --- FLIP PHASE: PLAY ---
          requestAnimationFrame(() => {
             // Second Inner Guard
            const rafLatest2 = elementAnimations.get(el);
            if (!rafLatest2 || rafLatest2.version !== vTag) return;

            children.forEach((child) => {
              child.style.setProperty('--fx-du', `${batch.du}ms`);
              child.style.setProperty('--fy-du', `${batch.du}ms`);
              child.style.setProperty('--fx-e', batch.e);
              child.style.setProperty('--fy-e', batch.e);
              child.style.setProperty('--fx', '0px');
              child.style.setProperty('--fy', '0px');
            });
          });
        });
      }, startAt);
      active.timeouts.push(id);
    });
  },
};

// const Conductor = {
//   animate: (el, timeline, sensors) => {
//     if (!el || !timeline) return;

//     const existing = elementAnimations.get(el) || {};
//     const active = {
//       timeouts: existing.timeouts || [],
//       version: (existing.version || 0) + 1,
//     };
    
//     active.timeouts.forEach(t => clearTimeout(t));
//     active.timeouts = [];
//     elementAnimations.set(el, active);

//     const propMap = { 
//         bg: 'bgc', blur: 'f-blur', x: 'tx', y: 'ty', z: 'tz', 
//         skx: 'skx', sky: 'sky', gray: 'f-gray', sat: 'f-sat', 
//         bright: 'f-bright', contrast: 'f-contrast' 
//     };

//     const discreteProps = ['dp', 'fd', 'jc', 'ai', 'gtc', 'gtr'];
    
//     // Split timeline into Animatable vs Discrete (Layout)
//     const animatableTimeline = {};
//     const discreteTimelineMap = new Map(); // timestamp -> { props: { key: val }, du, e }

//     Object.entries(timeline).forEach(([prop, steps]) => {
//       const key = propMap[prop] || prop;
//       const isDiscrete = discreteProps.includes(prop);
//       let delayAcc = 0;

//       steps.forEach(step => {
//         let v = step.v;
//         let du = step.du, e = step.e, de = step.de || 0;

//         // Resolve Theme
//         if (v && typeof v === 'object' && ('l' in v || 'd' in v)) {
//           v = sensors.isDark ? (v.d || v.l) : (v.l || v.d);
//         }

//         // Resolve Responsive
//         if (step.m) {
//           const sortedPts = Object.keys(step.m).map(Number).sort((a, b) => a - b);
//           for (const pt of sortedPts) {
//             if (sensors.bp <= pt) {
//               const over = step.m[pt];
//               if (typeof over === 'object' && over !== null) {
//                 if ('v' in over) v = over.v;
//                 if ('du' in over) du = over.du;
//                 if ('e' in over) e = over.e;
//                 if ('de' in over) de = over.de;
//               } else { v = over; }
//               break;
//             }
//           }
//         }

//         const startAt = delayAcc + de;

//         if (isDiscrete) {
//           // Add to Batched Discrete Map
//           if (!discreteTimelineMap.has(startAt)) {
//             discreteTimelineMap.set(startAt, { props: {}, du: du || 600, e: e || 'ease' });
//           }
//           const batch = discreteTimelineMap.get(startAt);
//           batch.props[key] = v;
//         } else {
//           // Add to Standard Animatable Timeline
//           animatableTimeline[key] = animatableTimeline[key] || [];
//           animatableTimeline[key].push({ v, du, e, startAt });
//         }
        
//         delayAcc += ((du || 600) + de);
//       });
//     });

//     const vTag = active.version;

//     // 1. Process Animatable Properties (Smooth Houdini Interpolation)
//     Object.entries(animatableTimeline).forEach(([key, frames]) => {
//       frames.forEach(frame => {
//         const id = setTimeout(() => {
//           const latest = elementAnimations.get(el);
//           if (!latest || latest.version !== vTag) return;
//           el.style.setProperty(`--${key}`, String(frame.v));
//           if (frame.du) el.style.setProperty(`--${key}-du`, `${frame.du}ms`);
//           if (frame.e) el.style.setProperty(`--${key}-e`, frame.e);
//         }, frame.startAt);
//         active.timeouts.push(id);
//       });
//     });

//     // 2. Process Discrete Properties (Batched FLIP Animation)
//     discreteTimelineMap.forEach((batch, startAt) => {
//       const id = setTimeout(() => {
//         const latest = elementAnimations.get(el);
//         if (!latest || latest.version !== vTag) return;

//         // --- FLIP PHASE: FIRST ---
//         const children = Array.from(el.children).filter(c => c instanceof HTMLElement);
//         const firstRects = children.map(c => c.getBoundingClientRect());

//         // Apply all layout changes in this batch
//         Object.entries(batch.props).forEach(([k, val]) => {
//           el.style.setProperty(`--${k}`, String(val));
//         });

//         // --- FLIP PHASE: INVERT ---
//         requestAnimationFrame(() => {
//           const lastRects = children.map(c => c.getBoundingClientRect());

//           children.forEach((child, i) => {
//             const dx = firstRects[i].left - lastRects[i].left;
//             const dy = firstRects[i].top - lastRects[i].top;

//             if (dx !== 0 || dy !== 0) {
//               child.style.setProperty('--fx-du', '0ms');
//               child.style.setProperty('--fy-du', '0ms');
//               child.style.setProperty('--fx', `${dx}px`);
//               child.style.setProperty('--fy', `${dy}px`);
//               child.offsetHeight; // Force sync
//             }
//           });

//           // --- FLIP PHASE: PLAY ---
//           requestAnimationFrame(() => {
//             children.forEach((child) => {
//               child.style.setProperty('--fx-du', `${batch.du}ms`);
//               child.style.setProperty('--fy-du', `${batch.du}ms`);
//               child.style.setProperty('--fx-e', batch.e);
//               child.style.setProperty('--fy-e', batch.e);
//               child.style.setProperty('--fx', '0px');
//               child.style.setProperty('--fy', '0px');
//             });
//           });
//         });
//       }, startAt);
//       active.timeouts.push(id);
//     });
//   },
// };

// const Conductor = {
//   animate: (el, timeline, sensors) => {
//     if (!el || !timeline) return;
//     const active = elementAnimations.get(el) || { timeouts: [], version: 0 };
//     active.timeouts.forEach(t => clearTimeout(t));
//     active.timeouts = [];
//     active.version++;
//     elementAnimations.set(el, active);

//     const propMap = { 
//         bg: 'bgc', blur: 'f-blur', x: 'tx', y: 'ty', z: 'tz', 
//         skx: 'skx', sky: 'sky', gray: 'f-gray', sat: 'f-sat', 
//         bright: 'f-bright', contrast: 'f-contrast' 
//     };

//     Object.entries(timeline).forEach(([prop, steps]) => {
//       const key = propMap[prop] || prop;
//       let delayAcc = 0;
//       steps.forEach(step => {
//         let v = step.v;
//         let du = step.du, e = step.e, de = step.de || 0;

//         if (v && typeof v === 'object' && ('l' in v || 'd' in v)) {
//           v = sensors.isDark ? (v.d || v.l) : (v.l || v.d);
//         }

//         if (step.m) {
//           const sortedPts = Object.keys(step.m).map(Number).sort((a, b) => a - b);
//           for (const pt of sortedPts) {
//             if (sensors.bp <= pt) {
//               const over = step.m[pt];
//               if (typeof over === 'object' && over !== null) {
//                 if ('v' in over) v = over.v;
//                 if ('du' in over) du = override.du;
//                 if ('e' in over) e = override.e;
//                 if ('de' in over) de = override.de;
//               } else { v = over; }
//               break;
//             }
//           }
//         }

//         const startAt = delayAcc + de;
//         const vTag = active.version;
//         const id = setTimeout(() => {
//           const latest = elementAnimations.get(el);
//           if (!latest || latest.version !== vTag) return;
//           el.style.setProperty(`--${key}`, String(v));
//           if (du) el.style.setProperty(`--${key}-du`, `${du}ms`);
//           if (e) el.style.setProperty(`--${key}-e`, e);
//         }, startAt);

//         active.timeouts.push(id);
//         delayAcc += ((du || 600) + de);
//       });
//     });
//   }
// };

export default Conductor
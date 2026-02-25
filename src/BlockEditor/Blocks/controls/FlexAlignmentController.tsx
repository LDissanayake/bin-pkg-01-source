import {
  IconArrowDown,
  IconArrowRight,
  IconArrowsHorizontal,
  IconArrowsVertical,
  IconGridDots,
  IconReorder,
} from '@tabler/icons-react';
import React from 'react';
import * as styles from './FlexAlignmentController.module.css';

/* ===================== TYPES ===================== */

type FlexShortKey = 'fd' | 'jc' | 'ai' | 'wr' | 'gp';

interface FlexAlignmentControllerProps {
  getValue: (key: FlexShortKey) => string | undefined;
  onChange: (data: { property:FlexShortKey, value: string}) => void;
}


/* ===================== COMPONENT ===================== */

const FlexAlignmentController: React.FC<FlexAlignmentControllerProps> = ({
  getValue,
  onChange,
}) => {
  /* ---------- READ VALUES ---------- */

  const flexProps = {
    flexDirection: getValue('fd') || 'row',
    justifyContent: getValue('jc') || 'center',
    alignItems: getValue('ai') || 'center',
    wrap: getValue('wr') || 'nowrap',
    gap: getValue('gp') || '0px',
  };

  /* ---------- UPDATE ---------- */

  const updateProp = (key: FlexShortKey, value: string) => {
    onChange({property:key, value});
  };

  const toggleReverse = () => {
    const isReverse = flexProps.flexDirection.includes('reverse');
    const base = isReverse
      ? flexProps.flexDirection.split('-')[0]
      : flexProps.flexDirection;

    updateProp('fd', isReverse ? base : `${base}-reverse`);
  };

  /* -------------------- MOVED FROM MainBox -------------------- */

  const isRow = flexProps.flexDirection.startsWith('row');
  const isReverse = flexProps.flexDirection.includes('reverse');
  const baseDirection = flexProps.flexDirection.split('-')[0];

  const isDistributing = ['space-between', 'space-around', 'space-evenly'].includes(
    flexProps.justifyContent
  );

  const mapIndex = (i: number) => (isReverse ? 2 - i : i);

  const isPointActive = (r: number, c: number) => {
    const jc = flexProps.justifyContent;
    const ai = flexProps.alignItems;

    const main = isRow ? c : r;
    const cross = isRow ? r : c;

    const mainIndex = mapIndex(main);
    const crossIndex = cross;

    const jcMatch =
      isDistributing ||
      (jc === 'flex-start' && mainIndex === 0) ||
      (jc === 'center' && mainIndex === 1) ||
      (jc === 'flex-end' && mainIndex === 2);

    const aiMatch =
      ai === 'stretch' ||
      (ai === 'flex-start' && crossIndex === 0) ||
      (ai === 'center' && crossIndex === 1) ||
      (ai === 'flex-end' && crossIndex === 2);

    return jcMatch && aiMatch;
  };

  const handleMatrixClick = (r: number, c: number) => {
    const vals = ['flex-start', 'center', 'flex-end'];

    const main = isRow ? c : r;
    const cross = isRow ? r : c;

    updateProp('jc', vals[mapIndex(main)]);

    if (flexProps.alignItems !== 'stretch') {
      updateProp('ai', vals[cross]);
    }
  };

  const gridRange = [0, 1, 2];

    const DistributionIcon = ({ type }) => {
    const isColumn = !isRow;

    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          transform: isColumn ? 'rotate(90deg)' : 'none',
          transition: 'transform 0.3s',
        }}
      >
        {type === 'space-between' && (
          <>
            <path d="M3 5v14M21 5v14" opacity="0.4" />
            <rect x="9" y="8" width="6" height="8" rx="1" fill="currentColor" stroke="none" />
          </>
        )}
        {type === 'space-around' && (
          <>
            <path d="M6 5v14M18 5v14" opacity="0.4" />
            <rect x="10" y="8" width="4" height="8" rx="1" fill="currentColor" stroke="none" />
          </>
        )}

        {type === 'space-evenly' && (
          <path d="M5 5v14M12 5v14M19 5v14" />
        )}
      </svg>
    );
  };

  /* ------------------------------------------------------------ */

  return (
    <div className={styles.sidebarContent}>
      <div className={styles.dualHeader}>
        {/* Context */}
        <div className={styles.contextBox}>
          <div className={styles.boxHeader}>
            <span className={styles.boxLabel}>Context</span>

            <div className={styles.directionControls}>
              <button
                onClick={() => updateProp('fd', 'row')}
                className={`${styles.dirBtn} ${
                  baseDirection === 'row' ? styles.active : ''
                }`}
              >
                <IconArrowRight size={16} stroke={1.5} />
              </button>

              <button
                onClick={() => updateProp('fd', 'column')}
                className={`${styles.dirBtn} ${
                  baseDirection === 'column' ? styles.active : ''
                }`}
              >
                <IconArrowDown size={16} />
              </button>

              <button
                onClick={toggleReverse}
                className={`${styles.dirBtn} ${isReverse ? styles.active : ''}`}
                style={{ transform: `scaleX(-1) rotate(${isRow ? 0 : '-90deg'})` }}
              >
                <IconReorder size={16} />
              </button>
            </div>
          </div>

          <div className={styles.contextMiniView}>
            <div
              className={styles.miniViewport}
              style={{
                display: 'flex',
                flexDirection: flexProps.flexDirection,
                justifyContent: flexProps.justifyContent,
                alignItems: flexProps.alignItems,
                gap: 2,
              }}
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`${styles.miniItem} ${
                    flexProps.alignItems === 'stretch'
                      ? styles.isStretched
                      : styles.isCircle
                  }`}
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alignment */}
        <div className={styles.alignmentWrapper}>
          <div className={styles.alignmentBox}>
            <div className={styles.boxHeader}>
              <span className={styles.boxLabel}>
                {isDistributing ? 'Cross-Axis' : 'Alignment'}
              </span>

              <div className={styles.headerActions}>
                {isDistributing && (
                  <button
                    onClick={() => updateProp('jc', 'center')}
                    className={`${styles.actionBtn} ${styles.actionBtn_lg}`}
                  >
                    <IconGridDots size={14} />
                  </button>
                )}

                <button
                  onClick={() =>
                    updateProp(
                      'ai',
                      flexProps.alignItems === 'stretch'
                        ? 'center'
                        : 'stretch'
                    )
                  }
                  className={`${styles.actionBtn} ${styles.actionBtn_lg} ${
                    flexProps.alignItems === 'stretch' ? styles.active : ''
                  }`}
                >
                  {isRow ? <IconArrowsVertical /> : <IconArrowsHorizontal />}
                </button>
              </div>
            </div>

            <div
              className={`${styles.matrixGrid} ${
                isDistributing
                  ? isRow
                    ? styles.distRow
                    : styles.distCol
                  : styles.standardGrid
              }`}
            >
              {isDistributing
                ? gridRange.map((idx) => {
                    const active =
                      flexProps.alignItems ===
                        ['flex-start', 'center', 'flex-end'][idx] ||
                      flexProps.alignItems === 'stretch';

                    const isStretch = flexProps.alignItems === 'stretch';

                    return (
                      <div
                        key={idx}
                        onClick={() =>
                          updateProp(
                            'ai',
                            isStretch
                              ? 'stretch'
                              : ['flex-start', 'center', 'flex-end'][idx]
                          )
                        }
                        className={styles.cell}
                      >
                        <div
                          className={`${styles.indicator} ${
                            active ? styles.active : ''
                          } ${
                            isStretch
                              ? isRow
                                ? styles.barV
                                : styles.barH
                              : styles.dot
                          }`}
                        />
                      </div>
                    );
                  })
                : gridRange.map((r) =>
                    gridRange.map((c) => {
                      const active = isPointActive(r, c);
                      const isStretch = flexProps.alignItems === 'stretch';

                      return (
                        <div
                          key={`${r}-${c}`}
                          onClick={() => handleMatrixClick(r, c)}
                          className={styles.cell}
                        >
                          <div
                            className={`${styles.indicator} ${
                              active ? styles.active : ''
                            } ${
                              isStretch
                                ? isRow
                                  ? styles.barV
                                  : styles.barH
                                : styles.dot
                            }`}
                          />
                        </div>
                      );
                    })
                  )}
            </div>
          </div>
        </div>
      </div>
            <div className={styles.distributionSection}>
        {/* <span className={styles.sectionLabel}>Distribution</span> */}
        <div className={styles.distributionRow}>
          {['space-between', 'space-around', 'space-evenly'].map((mode, index, arr) => (
            <React.Fragment key={mode}>
              <button
                onClick={() => updateProp('jc', mode)}
                className={`${styles.distBtn} ${flexProps.justifyContent === mode ? styles.active : ''
                  }`}
              >
                <DistributionIcon type={mode} />
              </button>

              {index !== arr.length - 1 && (
                <div className={styles.distBtn_sep} />
              )}
            </React.Fragment>
          ))}

        </div>
      </div>
    </div>
  );
};

export default FlexAlignmentController;






















// modify this code dont change other parts just add ts and get value and onchange from props


// import {
//   IconArrowDown,
//   IconArrowRight,
//   IconArrowsHorizontal,
//   IconArrowsVertical,
//   IconGrid3x3,
//   IconGridDots,
//   IconReorder,
// } from '@tabler/icons-react';
// import React, { useState } from 'react';
// import * as styles from './FlexAlignmentController.module.css';



// const FlexAlignmentController = () => {
//   const [flexProps, setFlexProps] = useState({
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     wrap: 'nowrap',
//   });

//   const updateProp = (key, value) => {
//     setFlexProps((prev) => ({ ...prev, [key]: value }));
//   };

//   const toggleReverse = () => {
//     const isReverse = flexProps.flexDirection.includes('reverse');
//     const base = isReverse
//       ? flexProps.flexDirection.split('-')[0]
//       : flexProps.flexDirection;
//     updateProp('flexDirection', isReverse ? base : `${base}-reverse`);
//   };

//   /* -------------------- MOVED FROM MainBox -------------------- */

//   const isRow = flexProps.flexDirection.startsWith('row');
//   const isDistributing = ['space-between', 'space-around', 'space-evenly'].includes(
//     flexProps.justifyContent
//   );

//   const isPointActive = (r, c) => {
//     const jc = flexProps.justifyContent;
//     const ai = flexProps.alignItems;

//     const main = isRow ? c : r;
//     const cross = isRow ? r : c;

//     const mainIndex = mapIndex(main); // reverse ONLY main axis
//     const crossIndex = cross;         // NEVER reverse cross axis

//     const jcMatch =
//       isDistributing ||
//       (jc === 'flex-start' && mainIndex === 0) ||
//       (jc === 'center' && mainIndex === 1) ||
//       (jc === 'flex-end' && mainIndex === 2);

//     const aiMatch =
//       ai === 'stretch' ||
//       (ai === 'flex-start' && crossIndex === 0) ||
//       (ai === 'center' && crossIndex === 1) ||
//       (ai === 'flex-end' && crossIndex === 2);

//     return jcMatch && aiMatch;
//   };


//   const handleMatrixClick = (r, c) => {
//     const vals = ['flex-start', 'center', 'flex-end'];

//     const main = isRow ? c : r;
//     const cross = isRow ? r : c;

//     updateProp('justifyContent', vals[mapIndex(main)]);

//     if (flexProps.alignItems !== 'stretch') {
//       updateProp('alignItems', vals[cross]);
//     }
//   };


//   const DistributionIcon = ({ type }) => {
//     const isColumn = !isRow;

//     return (
//       <svg
//         width="16"
//         height="16"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         style={{
//           transform: isColumn ? 'rotate(90deg)' : 'none',
//           transition: 'transform 0.3s',
//         }}
//       >
//         {type === 'space-between' && (
//           <>
//             <path d="M3 5v14M21 5v14" opacity="0.4" />
//             <rect x="9" y="8" width="6" height="8" rx="1" fill="currentColor" stroke="none" />
//           </>
//         )}
//         {type === 'space-around' && (
//           <>
//             <path d="M6 5v14M18 5v14" opacity="0.4" />
//             <rect x="10" y="8" width="4" height="8" rx="1" fill="currentColor" stroke="none" />
//           </>
//         )}

//         {type === 'space-evenly' && (
//           <path d="M5 5v14M12 5v14M19 5v14" />
//         )}
//       </svg>
//     );
//   };

//   const isReverse = flexProps.flexDirection.includes('reverse');
//   const baseDirection = flexProps.flexDirection.split('-')[0]; // row | column
//   // const gridRange = isReverse ? [2, 1, 0] : [0, 1, 2];
//   const gridRange = [0, 1, 2];

//   const mapIndex = (i) => (isReverse ? 2 - i : i);



//   /* ------------------------------------------------------------ */

//   return (
//     <div className={styles.sidebarContent}>
//       <div className={styles.dualHeader}>
//         {/* Context */}
//         <div className={styles.contextBox}>
//           <div className={styles.boxHeader}>
//             <span className={styles.boxLabel}>Context</span>

//             <div className={styles.directionControls}>
//               <button
//                 onClick={() => updateProp('flexDirection', 'row')}
//                 className={`${styles.dirBtn} ${baseDirection === 'row'
//                   ? styles.active
//                   : ''
//                   }`}
//               >
//                 <IconArrowRight size={16} stroke={1.5} />
//               </button>

//               <button
//                 onClick={() => updateProp('flexDirection', 'column')}
//                 className={`${styles.dirBtn} ${baseDirection === 'column'
//                   ? styles.active
//                   : ''
//                   }`}
//               >
//                 <IconArrowDown size={16} />
//               </button>

//               <button
//                 onClick={toggleReverse}
//                 className={`${styles.dirBtn} ${flexProps.flexDirection.includes('reverse') ? styles.active : ''
//                   }`}
//                 style={{ transform: `scaleX(-1) rotate(${isRow ? 0 : '-90deg'})` }}
//               >
//                 <IconReorder size={16} />
//               </button>
//             </div>
//           </div>

//           <div className={styles.contextMiniView}>
//             <div
//               className={styles.miniViewport}
//               style={{
//                 display: 'flex',
//                 flexDirection: flexProps.flexDirection,
//                 justifyContent: flexProps.justifyContent,
//                 alignItems: flexProps.alignItems,
//                 gap: '3px',
//               }}
//             >
//               {[1, 2, 3].map((i) => (
//                 <div
//                   key={i}
//                   className={`${styles.miniItem} ${flexProps.alignItems === 'stretch'
//                     ? styles.isStretched
//                     : styles.isCircle
//                     }`}
//                 >
//                   {i}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Alignment */}
//         <div className={styles.alignmentWrapper}>
//           <div className={styles.alignmentBox}>
//             <div className={styles.boxHeader}>
//               <span className={styles.boxLabel}>
//                 {isDistributing ? 'Cross-Axis' : 'Alignment'}
//               </span>

//               <div className={styles.headerActions}>
//                 {isDistributing && (
//                   <button
//                     onClick={() => updateProp('justifyContent', 'center')}
//                     className={`${styles.actionBtn} ${styles.actionBtn_lg}`}
//                   >
//                     <IconGridDots size={14} />
//                   </button>
//                 )}

//                 <button
//                   onClick={() =>
//                     updateProp(
//                       'alignItems',
//                       flexProps.alignItems === 'stretch' ? 'center' : 'stretch'
//                     )
//                   }
//                   className={`${styles.actionBtn} ${styles.actionBtn_lg} ${flexProps.alignItems === 'stretch' ? styles.active : ''
//                     }`}
//                 >
//                   {isRow ? (
//                     <IconArrowsVertical />
//                   ) : (
//                     <IconArrowsHorizontal />
//                   )}

//                 </button>
//               </div>
//             </div>

//             <div
//               className={`${styles.matrixGrid} ${isDistributing
//                 ? isRow
//                   ? styles.distRow
//                   : styles.distCol
//                 : styles.standardGrid
//                 }`}
//             >
//               {isDistributing
//                 ? gridRange.map((idx) => {

//                   const active =
//                     flexProps.alignItems ===
//                     ['flex-start', 'center', 'flex-end'][idx] ||
//                     flexProps.alignItems === 'stretch';

//                   const isStretch = flexProps.alignItems === 'stretch';

//                   return (
//                     <div
//                       key={idx}
//                       onClick={() =>
//                         updateProp(
//                           'alignItems',
//                           isStretch
//                             ? 'stretch'
//                             : ['flex-start', 'center', 'flex-end'][idx]
//                         )
//                       }
//                       className={styles.cell}
//                     >
//                       <div
//                         className={`${styles.indicator} ${active ? styles.active : ''
//                           } ${isStretch
//                             ? isRow
//                               ? styles.barV
//                               : styles.barH
//                             : styles.dot
//                           }`}
//                       />
//                     </div>
//                   );
//                 })
//                 : gridRange.map((r) =>
//                   gridRange.map((c) => {
//                     const active = isPointActive(r, c);
//                     const isStretch = flexProps.alignItems === 'stretch';

//                     return (
//                       <div
//                         key={`${r}-${c}`}
//                         onClick={() => handleMatrixClick(r, c)}
//                         className={styles.cell}
//                       >
//                         <div
//                           className={`${styles.indicator} ${active ? styles.active : ''
//                             } ${isStretch
//                               ? isRow
//                                 ? styles.barV
//                                 : styles.barH
//                               : styles.dot
//                             }`}
//                         />
//                       </div>
//                     );
//                   })
//                 )
//               }
//             </div>
//           </div>
//         </div>

//       </div>

//       <div className={styles.distributionSection}>
//         {/* <span className={styles.sectionLabel}>Distribution</span> */}
//         <div className={styles.distributionRow}>
//           {['space-between', 'space-around', 'space-evenly'].map((mode, index, arr) => (
//             <React.Fragment key={mode}>
//               <button
//                 onClick={() => updateProp('justifyContent', mode)}
//                 className={`${styles.distBtn} ${flexProps.justifyContent === mode ? styles.active : ''
//                   }`}
//               >
//                 <DistributionIcon type={mode} />
//               </button>

//               {index !== arr.length - 1 && (
//                 <div className={styles.distBtn_sep} />
//               )}
//             </React.Fragment>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlexAlignmentController;

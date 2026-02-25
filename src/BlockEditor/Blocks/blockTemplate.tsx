import { SectionDataType } from "../../backup/BlockEditor/OptionPanel/components/sectionData";

// Define types for props and settings
export type GeneralProperties<T> =
    string
    | Responsive<T>
    | ResponsiveColorMode<T>
    | NonResponsiveColorMode<T>;

export type BlockStyleValue = GeneralProperties<string | string[]>;

export interface Responsive<T> {
    default: T;
    medium?: T;
    mobile?: T;
}

export interface ResponsiveColorMode<T> {
    default: {
        l: T;
        d: T;
    };
    medium?: {
        l: T;
        d: T;
    };
    mobile?: {
        l: T;
        d: T;
    };
}

export interface NonResponsiveColorMode<T> {
    l: T;
    d: T;
}

export type DeviceKey = "d" | "m" | "s"; // Default, Medium, Small

export interface PropertyValue {
    vs: string;
    value: any;
    m?: any
}

export interface DesignProperty {
    [propertyName: string]: PropertyValue;
}

// export interface DesignTypes {
//     st?: DesignProperty,
//     an?: DesignProperty
// }

export interface BlockDesign {
    [key: string]: DesignProperty; // 'base', or any custom block key
}

export interface VariantSetting {
  id: string;      // variant id

  in?: string;     // initial (base only)
  en?: string;     // on enter
  lv?: string;     // on leave
  ex?: string;     // on exit
  rt?: string;     // return variant

  ev?: any[];      // interaction / click events

  [key: string]: any;
}


export interface Transition {
    tl: number[]; // Timeline (keyframe percentages)
    du: number; // Duration
    de: number; // Delay
    ty: 'e' | 's', // ease | spring
    bz?: string // Bezier curve for easing
    sp?: 't' | 'p', // time | physics
    bo?: number // bounce
    st?: number, // stiffness 
    da?: number, // damping
    ma?: number, // mass
    fm?: {
        pr?: string,
        du?: string,
        de?: string
    }
}

/**
 * Represents an animated property value with animated values and transition settings.
 * 
 * @type {AnimatedPropertyValue}
 * @tuple
 * @property {any[]} [0] - Array of animated values.
 * @property {Transition} [1] - Transition settings for animations.
 */
export type AnimatedPropertyValue = [
    any[],
    Transition
];

export interface AnimatedPropertyData {
    vs: string, // value source 
    var?: string // variable
    de: { // devices
        [device in DeviceKey]?: {
            value: AnimatedPropertyValue
        }
    }
}

export interface AnimatedProperty {
    [propertyName: string]: AnimatedPropertyData;
}

export interface BlockAnimation {
    from: string,
    to: string,
    properties: AnimatedProperty
}

export interface BlockProps {
    content?: any[];
    design?: string;
    variants?: VariantSetting[];
    animation?: {
        [id: string]: BlockAnimation
    };
    options?: string;
    gridLayoutMap?: {
        [variant: string]: {
            [id: string]: DesignProperty
        }
    }
    [key: string]: any
}

export interface OptionSection {
    label: string;
    component: React.ComponentType<any>;
    condition?: string;
}

/**
 * d: delete | m: move r: rename | i: insert
 */
export type LockMode = "d" | "dm" | "dmr" | "dmri";


export interface BlockConfig {
    title: string;
    icon: JSX.Element;
    cats: string[];
    type: string;
    layoutType?: 'grid' | 'flex' | 'block'
    rootAllow: boolean;
    children: boolean;
    childCats?: string[];
    limitInParent?: number,
    props: BlockProps;
    options?: SectionDataType;
    designSections: string[] | null;
    optionSections?: OptionSection[];
    preset?: string | null;
    lock?: LockMode;
}

// Define a block class to handle adding tabs, sections, controls, and props
export class Block {
    title: string;
    icon: JSX.Element;
    cats: string[];
    type: string;
    rootAllow: boolean;
    layoutType?: 'grid' | 'flex' | 'block'
    children: boolean;
    childCats: string[] | undefined;
    limitInParent?: number | null;
    props: BlockProps;
    designSections: string[] | null;
    optionSections?: OptionSection[] | null;
    options?: SectionDataType;
    preset?: string | null;
    lock?: LockMode | null;

    constructor(config: BlockConfig) {
        this.title = config.title;
        this.icon = config.icon;
        this.cats = config.cats;
        this.type = config.type;
        this.rootAllow = config.rootAllow;
        this.layoutType = config.layoutType;
        this.children = config.children;
        this.childCats = config.childCats;
        this.props = config.props;
        this.options = config.options || [];
        this.designSections = config.designSections || null;
        this.optionSections = config.optionSections || null;
        this.preset = config.preset || null;
        this.lock = config.lock || null;
        this.limitInParent = config.limitInParent || null;
    }
}



const blockStructure = {
    id: 'io984r',
    design: {
        base: {
            st: {
                w: {
                    vs: 'm',
                    value: '100px',
                    modifiers: {
                        lg: '200px',
                        sm: '160px',
                        '@lg': '300px'
                    }
                },
                x: {
                    vs: 'f',
                    value: 'calc(var(--base-x) + var(--dx) * var(--progress))',
                    modifiers: {
                        lg: 'calc(var(--base-x) + var(--dx) * var(--progress) * 2)',
                    }
                }
            },
            an: {
                x: { vs: 'm', value: '20px' }
            },
        },
    },
    animation: {
        bg: [
            { value: 'teal', duration: 500, delay: 0, easing: 'ease-out' },
            { value: 'red', duration: 500, delay: 0, easing: 'ease-in' },
            { value: 'lime', duration: 500, delay: 0, easing: 'ease-out' }
        ]
    }
}
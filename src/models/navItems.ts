
export interface NavItem {
    id: number;
    displayName?: string;
    fullName?: string;
    disabled?: boolean;
    iconName?: string;
    svgIcon?: string;
    route?: string;
    children?: NavItem[];
    active : boolean;
}


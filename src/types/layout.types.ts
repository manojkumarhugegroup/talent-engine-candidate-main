export interface MenuItem {
    title: string;
    icon?: string
    url?: string;
    badge?: number;
    subitems?: MenuItem[];
}

export interface AppSidebarProps {
    items?: MenuItem[]; // Make items optional
}
"use client";
import {
    LucideIcon,
    Utensils,
    ScrollText
} from "lucide-react";
import SidebarItem from "./item";


interface ISidebarItem {
    name: string;
    path: string;
    icon: LucideIcon;
}


const items: ISidebarItem[] = [
    {
        name: "Salad maker",
        path: "/salad-maker",
        icon: Utensils,
    },
    {
        name: "Recipe",
        path: "/recipe",
        icon: ScrollText,
    },
]

const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-10 p-4">
            <div className="flex flex-col space-y-10 w-full">
                <h1 className="text-base text-center cursor-pointer font-bold text-#012738 border-b border-gray-100 pb-4 w-full"
                    style={{
                        fontSize: '30px',
                        color: '#012738'
                    }}>
                    SALADMAKER<span style={{ color: '#F8B602' }}>.</span>
                </h1>
                <div className="flex flex-col space-y-2">
                    {items.map((item, index) => (
                        <SidebarItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Sidebar
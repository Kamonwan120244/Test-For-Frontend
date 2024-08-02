"use client";
import { useMemo, useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";


interface ISidebarItem {
    name: string;
    path: string;
    icon: LucideIcon;
}

const SidebarItem = ({ item }: { item: ISidebarItem }) => {
    const { name, icon: Icon, path } = item;
    const router = useRouter();
    const pathname = usePathname();

    const onClick = () => {
        router.push(path);
    };

    const isActive = useMemo(() => {
        return path === pathname;
    }, [path, pathname]);


    return (
        <>
            <div
                className={`flex items-center p-3 rounded-lg cursor-pointer justify-between
                ${isActive ? 'bg-[#F8B602] text-white' : 'hover:bg-sidebar-background text-[#A098AE]'}
            `}
                onClick={onClick}
            >
                <div className="flex items-center space-x-2">
                    <Icon size={20} />
                    <p className="text-sm font-semibold">{name}</p>
                </div>
            </div>
        </>
    );
};

export default SidebarItem;
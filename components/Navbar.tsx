"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkMode from "@/components/Darkmode";
import { CardWithForm } from "@/components/Account";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

type AccountActionType = "login" | "signup" | "contact";

const accountActions: { title: string; type: AccountActionType }[] = [
    {
        title: "Login",
        type: "login",
    },
    {
        title: "Sign up",
        type: "signup",
    },
    {
        title: "Contact us",
        type: "contact",
    },
];

const Modal = ({
    isOpen,
    onClose,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) => {
    const modalVariants = {
        hidden: { opacity: 0, y: "-10%" },
        visible: { opacity: 1, y: "0%" },
        exit: { opacity: 0, y: "-10%" },
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
                className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[400px] p-6"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <button
                    className="absolute top-2 right-1 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                    onClick={onClose}
                >
                    <CloseIcon />
                </button>
                {children}
            </motion.div>
        </div>
    );
};

const NavigationMenuDemo = () => {
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [activeType, setActiveType] = React.useState<AccountActionType | null>(null);

    const openModal = (type: AccountActionType) => {
        setActiveType(type);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setActiveType(null);
    };

    const renderCard = () => {
        if (!activeType) return null;
        return <CardWithForm type={activeType} onClose={closeModal} />;
    };

    return (
        <>
            <nav className="flex items-center justify-between bg-blue-500 text-white shadow-md p-3 dark:bg-gray-800 dark:text-gray-100">
                {/* Left Side - Logo or App Name */}
                <div className="flex-1"></div>

                {/* Center - App Title */}
                <div className="text-3xl font-bold flex-1 text-center">Text Analyzer</div>

                {/* Right Side - Account and Theme */}
                <div className="flex items-center space-x-4 flex-1 justify-end">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="flex items-center space-x-1">
                                    <AccountCircleIcon className="text-black dark:text-gray-300" />
                                    <span className="text-black dark:text-white">My Account</span>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="absolute right-0 left-auto">
                                    <ul className="grid grid-cols-1 gap-3 p-4 w-[200px]">
                                        {accountActions.map((component) => (
                                            <ListItem
                                                className="hover:bg-[#e9f4fc] dark:hover:text-black text-sm font-medium shadow-sm"
                                                key={component.title}
                                                title={component.title}
                                                onClick={() => openModal(component.type)}
                                            />
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <DarkMode />
                </div>
            </nav>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {renderCard()}
            </Modal>
        </>
    );
};

const ListItem = React.forwardRef<
    React.ElementRef<"button">,
    React.ComponentPropsWithoutRef<"button"> & { title: string }
>(({ className, title, ...props }, ref) => {
    return (
        <li>
            <button
                ref={ref}
                className={cn(
                    "block w-full text-left select-none rounded-md p-3 text-sm font-medium leading-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    className
                )}
                {...props}
            >
                {title}
            </button>
        </li>
    );
});
ListItem.displayName = "ListItem";

export default NavigationMenuDemo;

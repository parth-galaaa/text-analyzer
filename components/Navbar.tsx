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

const accountActions = [
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

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[400px] p-6">
				<button
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
					onClick={onClose}
				>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};

const NavigationMenuDemo: React.FC = () => {
	const [isModalOpen, setModalOpen] = React.useState(false);
	const [activeType, setActiveType] = React.useState<string | null>(null);

	const openModal = (type: string) => {
		setActiveType(type);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setActiveType(null);
	};

	const renderCard = () => {
		switch (activeType) {
			case "login":
				return <CardWithForm type="login" />;
			case "signup":
				return <CardWithForm type="signup" />;
			case "contact":
				return <CardWithForm type="contact" />;
			default:
				return null;
		}
	};

	return (
		<>
			<nav className="flex items-center justify-between bg-blue-500 text-white shadow-md p-3 dark:bg-gray-800 dark:text-gray-100">
				{/* Left Side - Logo or App Name */}
				<div className="flex-1"></div>

				{/* Center - App Title */}
				<div className="text-2xl font-bold flex-1 text-center">Text Analyzer</div>

				{/*Right Side - Account and Theme */}
				<div className="flex items-center space-x-6 flex-1 justify-end">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="flex items-center space-x-1">
									<AccountCircleIcon className="text-black dark:text-gray-300" />
									<span className="text-black dark:text-white">My Account</span>
								</NavigationMenuTrigger>
								<NavigationMenuContent className="absolute right-0 left-auto">
									<ul className="grid grid-cols-1 gap-3 p-4 w-[200px]">
										{accountActions.map((action) => (
											<li key={action.title}>
												<button
													className="w-full rounded-lg hover:bg-[#e9f4fc] dark:hover:text-black"
													onClick={() => openModal(action.type)}
												>
													{action.title}
												</button>
											</li>
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

export default NavigationMenuDemo;

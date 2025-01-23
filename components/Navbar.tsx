"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkMode from "@/components/Darkmode";

const accountActions = [
	{
		title: "Login",
		href: "https://vt-one.gfxltd.com/Barcode.html",
	},
	{
		title: "Sign up",
		href: "https://vinportal.gfxltd.com/",
	},
	{
		title: "Contact us",
		href: "https://vpic.nhtsa.dot.gov/decoder/",
	},
];

const NavigationMenuDemo: React.FC = () => {
	return (
		<nav className="flex items-center justify-between bg-blue-500 text-white shadow-md p-3 dark:bg-gray-800 dark:text-gray-100">
			{/* Left Side - Logo or App Name */}
			<div className="text-2xl font-bold">Text Analyzer</div>

			{/* Right Side - My Account and Dark Mode */}
			<div className="flex items-center space-x-4">
				{/* My Account */}
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger className="flex items-center space-x-1">
								<AccountCircleIcon className="text-black dark:text-gray-300" />
								<span className="text-black dark:text-white">My Account</span>
							</NavigationMenuTrigger>
							<NavigationMenuContent className="absolute right-0 left-auto">
								<ul className="grid grid-cols-1 gap-3 p-4 w-[200px]">
									<li>
										{accountActions.map((component) => (
											<ListItem className="hover:bg-[#e9f4fc]"
												key={component.title}
												title={component.title}
												href={component.href}
											/>
										))}
									</li>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				{/* Dark Mode Toggle */}
				<DarkMode />
			</div>
		</nav>
	);
};

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";

export default NavigationMenuDemo;

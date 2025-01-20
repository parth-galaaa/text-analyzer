"use client";
import * as React from "react";
import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
	return (
		<nav className="flex items-center justify-between bg-blue-500 text-white shadow-md p-3">
			<div className="text-2xl font-bold">Text Analyzer</div>
			<NavigationMenu>
				<NavigationMenuList className="flex">
					{["Features", "Services", "Login", "Sign up"].map((item) => (
						<NavigationMenuItem key={item}>
							<Link
								href="#"
								className="text-lg hover:font-bold text-off-white font-medium hover:shadow-md"
							>
								{item}
							</Link>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</nav>
	);
};

export default Navbar;

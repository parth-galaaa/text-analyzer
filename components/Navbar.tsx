"use client";
import * as React from "react"
import Link from "next/link"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"

const Navbar = () => {
	return (
		<div className="flex w-full comtainer flex-wrap items-center justify-between mx-auto px-2 py-2 bg-soft-blue shadow-lg">
			<NavigationMenu className="ml-4">
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link href="#" className="text-md hover:font-bold text-off-white font-medium hover:shadow-md">Features</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="#" className="text-md hover:font-bold text-off-white font-medium hover:shadow-md">Services</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="#" className="text-md hover:font-bold text-off-white font-medium hover:shadow-md">Login</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="#" className="text-md hover:font-bold text-off-white font-medium hover:shadow-md">Sign up</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};

export default Navbar;
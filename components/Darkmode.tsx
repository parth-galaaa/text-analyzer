import React from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const DarkModeToggle = () => {
	const [isDarkMode, setIsDarkMode] = React.useState(false);

	React.useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDarkMode]);

	return (
		<button
			onClick={() => setIsDarkMode(!isDarkMode)}
			className="p-2 rounded-md text-black dark:bg-gray-700 dark:text-gray-100"
		>
			{isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
		</button>
	);
};

export default DarkModeToggle;

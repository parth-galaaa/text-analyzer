"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Loader2, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";

const TabsComponent = () => {
	const [inputs, setInputs] = useState({
		summarize: "",
		paraphrase: "",
		sentiment: "",
		translate: "",
	});
	const [outputs, setOutputs] = useState({
		summarize: "",
		paraphrase: "",
		sentiment: "",
		translate: "",
	});
	const [enabledTab, setEnabledTab] = useState<"summarize" | "paraphrase" | "sentiment" | "translate" | null>(null);
	const maxWords = 150;

	const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

	const handleAction = async (tab: keyof typeof inputs) => {
		setEnabledTab(tab);
		try {
			const response = await fetch("http://127.0.0.1:5328/api/textanalyze", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					text: inputs[tab],
					action: tab, // Send the tab name as the action type
					source_lang: "en", // Only needed for translation
					target_lang: "fr"
				}),
			});
			if (!response.ok) throw new Error("Failed to fetch the response");
			const data = await response.json();
			setOutputs((prev) => ({ ...prev, [tab]: data.output }));
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while processing the request");
		}
	};

	return (
		<div className="flex flex-col p-10 dark:bg-gray-900 dark:text-gray-200">
			<Tabs defaultValue="summarize">
				<TabsList className="grid w-full grid-cols-4 text-white dark:text-gray-400">
					{["summarize", "paraphrase", "sentiment", "translate"].map((tab) => (
						<TabsTrigger
							key={tab}
							value={tab}
							className="text-xl font-semibold p-4 hover:shadow-md hover:bg-light-blue hover:text-gray-600 rounded-lg transition duration-300 dark:hover:bg-gray-700 dark:hover:text-gray-200"
							onClick={() => setEnabledTab(null)}
						>
							{tab.charAt(0).toUpperCase() + tab.slice(1)}
						</TabsTrigger>
					))}
				</TabsList>

				{(["summarize", "paraphrase", "sentiment", "translate"] as const).map((tab) => (
					<TabsContent key={tab} value={tab}>
						<div className="grid grid-cols-[1fr_1px_1fr] gap-4 items-stretch">
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
								className="relative w-full bg-gray-50 rounded-lg shadow-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
								<Textarea
									value={inputs[tab]}
									onChange={(e) => setInputs((prev) => ({ ...prev, [tab]: e.target.value }))}
									placeholder={`Enter text to ${tab}...`}
									className="w-full p-4 bg-white border-none focus:ring-0 dark:placeholder-gray-400 dark:text-gray-200"
									style={{ fontSize: "16px", height: "60vh", overflowY: "auto" }}
								/>
								<div className="relative w-full p-3 bg-white rounded-lg flex justify-between items-center dark:bg-gray-800">
									<p className={`font-medium ${countWords(inputs[tab]) > maxWords ? "text-red-500" : "text-black dark:text-gray-200"}`}>
										{countWords(inputs[tab])}/{maxWords} Words
									</p>
									<button
										className={`bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 dark:bg-blue-600 ${countWords(inputs[tab]) > maxWords ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
										onClick={() => handleAction(tab)}
										disabled={countWords(inputs[tab]) > maxWords}
									>
										{tab.charAt(0).toUpperCase() + tab.slice(1)}
									</button>
								</div>
							</motion.div>
							<div className="w-px bg-gray-300 dark:bg-gray-700"></div>
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
								className="relative w-full bg-gray-50 rounded-lg shadow-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
								<Textarea
									value={outputs[tab]}
									placeholder="Output:"
									className="w-full p-4 bg-white border-none focus:ring-0 dark:placeholder-gray-400 dark:text-gray-200"
									disabled={enabledTab !== tab}
									style={{ fontSize: "16px", height: "60vh", overflow: "auto" }}
								/>
								<div className="relative w-full p-3 bg-white rounded-lg flex justify-between items-center dark:bg-gray-800">
									<Button
										variant="ghost"
										size="icon"
										onClick={() => navigator.clipboard.writeText(outputs[tab] || inputs[tab])}
									>
										<Clipboard className="w-4 h-4" />
									</Button>
								</div>
							</motion.div>
						</div>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};

export default TabsComponent;

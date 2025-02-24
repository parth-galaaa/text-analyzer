"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import FileUploadIcon from '@mui/icons-material/FileUpload';
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
									style={{ fontSize: "18px", height: "60vh", overflowY: "auto" }}
								/>
								<div className="relative w-full p-3 bg-white rounded-lg flex justify-between items-center dark:bg-gray-800">
									{/* Left-aligned word count and first two buttons */}
									<div className="flex items-center space-x-3">
										<p
											className={`font-medium ${countWords(inputs[tab]) > maxWords
												? "text-red-500"
												: "text-black dark:text-gray-200"
												}`}
										>
											{countWords(inputs[tab])}/{maxWords} Words
										</p>
										<Button
											variant="ghost"
											size="icon"
											onClick={async () => {
												try {
													const text = await navigator.clipboard.readText(); // Read from clipboard
													setInputs((prev) => ({ ...prev, [tab]: text })); // Set text in active tab
												} catch (err) {
													console.error("Clipboard read failed:", err);
													alert("Failed to paste text. Please allow clipboard access.");
												}
											}}
										>
											<ContentPasteIcon />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => {
												const input = document.createElement("input");
												input.type = "file";
												input.accept = "text/plain"; // Accept only text files
												input.onchange = async (event) => {
													const file = (event.target as HTMLInputElement).files?.[0];
													if (file) {
														const reader = new FileReader();
														reader.onload = (e) => {
															setInputs((prev) => ({ ...prev, [tab]: e.target?.result as string }));
														};
														reader.readAsText(file);
													}
												};
												input.click(); // Trigger file picker
											}}
										>
											<FileUploadIcon />
										</Button>
									</div>
									{/* Right-aligned action button */}
									<button
										className={`bg-[#10538A] text-white py-2 px-4 rounded-lg shadow-md transition duration-300 dark:bg-blue-600 ${countWords(inputs[tab]) > maxWords ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
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
									style={{ fontSize: "18px", height: "60vh", overflow: "auto" }}
								/>
								<div className="relative w-full p-3 bg-white rounded-lg flex justify-between items-center dark:bg-gray-800">
									<Button
										variant="ghost"
										size="icon"
										onClick={() => navigator.clipboard.writeText(outputs[tab] || inputs[tab])}
									>
										<ContentCopyIcon />
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

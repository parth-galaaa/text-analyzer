"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Button } from "@/components/ui/button";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import DeleteAlertDialog from "@/components/alertbox";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


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
	const [targetLanguage, setTargetLanguage] = useState("");

	const languages = [
		{ code: "en", name: "English" },
		{ code: "fr", name: "French" },
		{ code: "de", name: "German" },
		{ code: "es", name: "Spanish" },
		{ code: "ru", name: "Russian" },
		{ code: "ar", name: "Arabic" },
		{ code: "it", name: "Italian" },
		{ code: "nl", name: "Dutch" },
		{ code: "hi", name: "Hindi" },
		{ code: "zh", name: "Chinese (Simplified)" },
		{ code: "cs", name: "Czech" },
		{ code: "fi", name: "Finnish" },
		{ code: "hu", name: "Hungarian" },
		{ code: "sv", name: "Swedish" },
		{ code: "el", name: "Greek" }
	];

	const maxWords = 250;
	const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
	const [loadingTab, setLoadingTab] = useState<"summarize" | "paraphrase" | "sentiment" | "translate" | null>(null);
	const handleAction = async (tab: keyof typeof inputs) => {
		setEnabledTab(tab);
		setLoadingTab(tab);

		try {
			const response = await fetch("http://127.0.0.1:5328/api/textanalyze", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					text: inputs[tab],
					action: tab,
					source_lang: "en",
					target_lang: "fr"
				}),
			});

			if (!response.ok) throw new Error("Failed to fetch the response");
			const data = await response.json();
			setOutputs((prev) => ({ ...prev, [tab]: data.output }));
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while processing the request");
		} finally {
			setLoadingTab(null);
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
							className="text-xl font-semibold p-4 hover:shadow-md hover:bg-gray-200 hover:text-gray-600 rounded-lg transition duration-300 dark:hover:bg-gray-700 dark:hover:text-gray-200"
							onClick={() => setEnabledTab(tab as "summarize" | "paraphrase" | "sentiment" | "translate")}
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
									className="w-full p-4 bg-white border-none focus:ring-0 dark:placeholder-black dark:text-black"
									style={{ fontSize: "18px", height: "60vh", overflowY: "auto" }}
								/>
								<div className="relative w-full p-3 bg-white rounded-lg flex justify-between items-center dark:bg-gray-800">
									{/* Left-aligned word count and first two buttons */}
									<div className="flex items-center">
										{/* Word Count - Slightly separated but natural */}
										<p
											className={`font-medium ${countWords(inputs[tab]) > maxWords ? "text-red-500" : "text-black dark:text-gray-200"
												}`}
										>
											{countWords(inputs[tab])}/{maxWords} Words
										</p>

										{/* Divider That Actually Looks Good */}
										<div className="mx-2 h-6 w-px bg-gray-600 opacity-50"></div>

										{/* Buttons Stay Compact and Clean */}
										<Button
											variant="ghost"
											size="icon"
											className="hover:bg-gray-200 dark:hover:bg-gray-700"
											onClick={async () => {
												try {
													const text = await navigator.clipboard.readText();
													setInputs((prev) => ({ ...prev, [tab]: text }));
												} catch (err) {
													console.error("Clipboard read failed:", err);
													alert("Failed to paste text. Please allow clipboard access.");
												}
											}}
										>
											<ContentPasteIcon className="w-4 h-4" />
										</Button>
										<Button
											variant="ghost"
											className="flex items-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
											onClick={() => {
												const input = document.createElement("input");
												input.type = "file";
												input.accept = "text/plain,application/pdf";
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
												input.click();
											}}
										>
											<span className="text-md">File Upload</span>
											<FileUploadOutlinedIcon className="w-4 h-4" />
										</Button>
									</div>

									{/* Right-aligned action button */}
									<div className="flex items-center">
										{enabledTab === "translate" && (
											<Select onValueChange={setTargetLanguage}>
												<SelectTrigger className="w-[200px] mr-2">
													<SelectValue placeholder="Choose Language" />
												</SelectTrigger>
												<SelectContent>
													{languages.map(({ code, name }) => (
														<SelectItem key={code} value={code}>{name}</SelectItem>
													))}
												</SelectContent>
											</Select>
										)}
										<Button
											className={`bg-[#10538A] text-white py-2 px-4 rounded-lg shadow-md transition duration-300 dark:bg-[#10538A] ${countWords(inputs[tab]) > maxWords ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-700"}`}
											onClick={() => handleAction(tab)}
											disabled={countWords(inputs[tab]) > maxWords}
										>
											{tab.charAt(0).toUpperCase() + tab.slice(1)}
										</Button>
									</div>
								</div>

							</motion.div>
							<div className="w-px bg-gray-300 dark:bg-gray-700"></div>
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
								className="relative w-full bg-gray-50 rounded-lg shadow-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
								<div className="relative">
									{/* Show loading spinner when processing */}
									{loadingTab === tab && (
										<div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
											<CircularProgress />
										</div>
									)}

									{/* Textarea remains unchanged but is disabled while loading */}
									<Textarea
										value={outputs[tab]}
										placeholder="Output:"
										className="w-full p-4 bg-white border-none focus:ring-0 dark:placeholder-black dark:text-black"
										disabled={enabledTab !== tab || loadingTab === tab}
										style={{ fontSize: "18px", height: "60vh", overflow: "auto" }}
									/>
								</div>
								<div className="relative w-full p-3 bg-white rounded-lg flex justify-between items-center dark:bg-gray-800">
									{/* Copy Button */}
									<Button
										variant="ghost"
										size="icon"
										className="hover:bg-gray-200"
										onClick={() => navigator.clipboard.writeText(outputs[tab] || inputs[tab])}
									>
										<ContentCopyIcon className="w-4 h-4" />
									</Button>

									{/* Right-aligned container for Delete & Download buttons */}
									<div className="flex gap-x-2 ml-auto">
										{/* Delete Button */}
										<DeleteAlertDialog
											onDelete={() => {
												setInputs((prev) => ({ ...prev, [tab]: "" }));
												setOutputs((prev) => ({ ...prev, [tab]: "" }));
											}}
										/>

										{/* Download Button */}
										<Button
											variant="ghost"
											size="icon"
											onClick={() => {
												const text = outputs[tab];
												if (!text) {
													alert("No text to download!");
													return;
												}

												const blob = new Blob([text], { type: "text/plain" });
												const url = URL.createObjectURL(blob);

												const a = document.createElement("a");
												a.href = url;
												a.download = `${tab}.txt`;
												document.body.appendChild(a);
												a.click();
												document.body.removeChild(a);
												URL.revokeObjectURL(url);
											}}
										>
											<FileDownloadOutlinedIcon />
										</Button>
									</div>
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

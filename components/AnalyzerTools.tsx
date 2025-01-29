"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const TabsComponent = () => {
	const [summarizerInput, setSummarizerInput] = useState("");
	const [summarizerOutput, setSummarizerOutput] = useState("");
	const [paraphraserInput, setParaphraserInput] = useState("");
	const [paraphraserOutput, setParaphraserOutput] = useState("");
	const [sentimentInput, setSentimentInput] = useState("");
	const [sentimentOutput, setSentimentOutput] = useState("");
	const [translateInput, setTranslateInput] = useState("");
	const [translateOutput, setTranslateOutput] = useState("");
	const [enabledTab, setEnabledTab] = useState<
		"summarizer" | "paraphraser" | "sentiment" | "translate" | null
	>(null);
	const maxWords = 250;

	const countWords = (text: string) => {
		const words = text.trim().split(/\s+/);
		return words[0] === "" ? 0 : words.length;
	};

	const summarizerWordCount = countWords(summarizerInput);
	const paraphraserWordCount = countWords(paraphraserInput);
	const sentimentWordCount = countWords(sentimentInput);
	const translateWordCount = countWords(translateInput);

	const handleSummarize = () => {
		setSummarizerOutput(`Summarized Output: \n${summarizerInput}`);
		setEnabledTab("summarizer");
	};

	const handleParaphrase = () => {
		setParaphraserOutput(`Paraphrased Output: \n${paraphraserInput}`);
		setEnabledTab("paraphraser");
	};

	const handleSentimentAnalysis = () => {
		setSentimentOutput(`Sentiment Output: \n${sentimentInput}`);
		setEnabledTab("sentiment");
	};

	const handleTranslate = () => {
		setTranslateOutput(`Translated Output: \n${translateInput}`);
		setEnabledTab("translate");
	};

	return (
		<div className="flex flex-col p-20 bg-white dark:bg-gray-900 dark:text-gray-200">
			<Tabs defaultValue="summarizer">
				<TabsList className="grid w-full grid-cols-4 text-soft-blue dark:text-gray-400">
					{["summarizer", "paraphraser", "sentiment", "translate"].map((tab) => (
						<TabsTrigger
							key={tab}
							value={tab}
							className="text-lg font-semibold py-2 hover:shadow-md hover:bg-light-blue hover:text-white rounded-lg transition duration-300 dark:hover:bg-gray-700 dark:hover:text-gray-200"
							onClick={() => setEnabledTab(null)}
						>
							{tab.charAt(0).toUpperCase() + tab.slice(1)}
						</TabsTrigger>
					))}
				</TabsList>

				{["summarizer", "paraphraser", "sentiment", "translate"].map((tab) => (
					<TabsContent key={tab} value={tab}>
						<div className="grid grid-cols-[1fr_1px_1fr] gap-4 items-stretch">
							{/* Input Textarea and Word Count */}
							<div className="relative w-full bg-gray-50 rounded-lg shadow-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
								<Textarea
									value={
										tab === "summarizer"
											? summarizerInput
											: tab === "paraphraser"
												? paraphraserInput
												: tab === "sentiment"
													? sentimentInput
													: translateInput
									}
									onChange={(e) =>
										tab === "summarizer"
											? setSummarizerInput(e.target.value)
											: tab === "paraphraser"
												? setParaphraserInput(e.target.value)
												: tab === "sentiment"
													? setSentimentInput(e.target.value)
													: setTranslateInput(e.target.value)
									}
									placeholder={`Enter text to ${tab === "summarizer"
										? "summarize"
										: tab === "paraphraser"
											? "paraphrase"
											: tab === "sentiment"
												? "analyze sentiment"
												: "translate"
										}.`}
									className="w-full p-4 bg-transparent border-none focus:ring-0 dark:placeholder-gray-400 dark:text-gray-200"
									style={{ fontSize: "15px", height: "60vh", overflowY: "auto" }}
								/>
								{/* Word Count */}
								<div className="relative w-full p-3 bg-gray-50 rounded-lg flex justify-between items-center dark:bg-gray-800">
									<p
										className={`font-semibold ${(tab === "summarizer" && summarizerWordCount > maxWords) ||
											(tab === "paraphraser" && paraphraserWordCount > maxWords) ||
											(tab === "sentiment" && sentimentWordCount > maxWords) ||
											(tab === "translate" && translateWordCount > maxWords)
											? "text-red-500"
											: "text-black dark:text-gray-200"
											}`}
									>
										{tab === "summarizer"
											? summarizerWordCount
											: tab === "paraphraser"
												? paraphraserWordCount
												: tab === "sentiment"
													? sentimentWordCount
													: translateWordCount}
										/{maxWords} Words
									</p>
									<button
										className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 dark:bg-blue-600"
										onClick={
											tab === "summarizer"
												? handleSummarize
												: tab === "paraphraser"
													? handleParaphrase
													: tab === "sentiment"
														? handleSentimentAnalysis
														: handleTranslate
										}
									>
										{tab === "summarizer"
											? "Summarize"
											: tab === "paraphraser"
												? "Paraphrase"
												: tab === "sentiment"
													? "Analyze Sentiment"
													: "Translate"}
									</button>
								</div>
							</div>

							{/* Vertical Divider */}
							<div className="w-px bg-gray-300 dark:bg-gray-700"></div>

							{/* Output Textarea */}
							<div className="relative w-full bg-gray-50 rounded-lg shadow-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
								<Textarea
									value={
										tab === "summarizer"
											? summarizerOutput
											: tab === "paraphraser"
												? paraphraserOutput
												: tab === "sentiment"
													? sentimentOutput
													: translateOutput
									}
									placeholder={`${tab.charAt(0).toUpperCase() + tab.slice(1)} text will appear here.`}
									className="w-full p-4 bg-transparent border-none focus:ring-0 dark:placeholder-gray-400 dark:text-gray-200"
									disabled={enabledTab !== tab}
									style={{ fontSize: "15px", height: "60vh", overflow: "auto" }}
								/>
							</div>
						</div>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};

export default TabsComponent;

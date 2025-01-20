"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Typography from '@mui/material/Typography';

const TabsComponent = () => {
	const [summarizerInput, setSummarizerInput] = useState("");
	const [summarizerOutput, setSummarizerOutput] = useState("");
	const [paraphraserInput, setParaphraserInput] = useState("");
	const [paraphraserOutput, setParaphraserOutput] = useState("");
	const [sentimentInput, setSentimentInput] = useState("");
	const [sentimentOutput, setSentimentOutput] = useState("");
	const [enabledTab, setEnabledTab] = useState<"summarizer" | "paraphraser" | "sentiment" | null>(null);
	const maxWords = 250;

	const countWords = (text: string) => {
		const words = text.trim().split(/\s+/); // Split by spaces
		return words[0] === '' ? 0 : words.length; // Return 0 if empty input
	};

	const summarizerWordCount = countWords(summarizerInput);
	const paraphraserWordCount = countWords(paraphraserInput);
	const sentimentWordCount = countWords(sentimentInput);

	const handleSummarize = () => {
		setSummarizerOutput(`**Summarized Output**\n${summarizerInput}`);
		setEnabledTab("summarizer");
	};

	const handleParaphrase = () => {
		setParaphraserOutput(`**Paraphrased Output**\n${paraphraserInput}`);
		setEnabledTab("paraphraser");
	};

	const handleSentimentAnalysis = () => {
		setSentimentOutput(`**Sentiment Output**\n${sentimentInput}`);
		setEnabledTab("sentiment");
	};

	return (
		<div className="flex flex-col p-8">
			<Tabs defaultValue="summarizer">
				<TabsList className="grid w-full grid-cols-3 text-soft-blue mb-4">
					<TabsTrigger
						value="summarizer"
						className="text-lg font-semibold py-2 hover:shadow-md hover:bg-light-blue hover:text-white rounded-lg transition duration-300"
						onClick={() => setEnabledTab(null)}
					>
						Summarizer
					</TabsTrigger>
					<TabsTrigger
						value="paraphraser"
						className="text-lg font-semibold py-2 hover:shadow-md hover:bg-light-blue hover:text-white rounded-lg transition duration-300"
						onClick={() => setEnabledTab(null)}
					>
						Paraphraser
					</TabsTrigger>
					<TabsTrigger
						value="sentiment"
						className="text-lg font-semibold py-2 hover:shadow-md hover:bg-light-blue hover:text-white rounded-lg transition duration-300"
						onClick={() => setEnabledTab(null)}
					>
						Sentiment Analysis
					</TabsTrigger>
				</TabsList>

				<TabsContent value="summarizer">
					<div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
						<div className="relative w-full">
							<Textarea
								value={summarizerInput}
								onChange={(e) => setSummarizerInput(e.target.value)}
								placeholder="Enter text to summarize."
								className="w-full h-64 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
								style={{ fontSize: "15px" }}
							/>
							<Typography
								sx={{
									position: 'absolute',
									bottom: 10,
									right: 20,
									color: summarizerWordCount > maxWords ? 'red' : 'black',
									fontSize: '0.875rem',
									fontWeight: 'semibold',
								}}
							>
								{summarizerWordCount}/{maxWords + " Words"}
							</Typography>
						</div>

						<div className="w-px bg-gray-300 h-full"></div>
						<Textarea
							value={summarizerOutput}
							placeholder="Summarized text will appear here."
							className="w-full h-64 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
							disabled={enabledTab !== "summarizer"}
							style={{ fontSize: "15px" }}
						/>
					</div>
					<button
						className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
						onClick={handleSummarize}
					>
						Summarize
					</button>
				</TabsContent>

				<TabsContent value="paraphraser" className="mt-4">
					<div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
						<div className="relative w-full">
							<Textarea
								value={paraphraserInput}
								onChange={(e) => setParaphraserInput(e.target.value)}
								placeholder="Enter text to paraphrase."
								className="w-full h-64 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
								style={{ fontSize: "15px" }}
							/>
							<Typography
								sx={{
									position: 'absolute',
									bottom: 10,
									right: 20,
									color: paraphraserWordCount > maxWords ? 'red' : 'black',
									fontSize: '0.875rem',
									fontWeight: 'semibold',
								}}
							>
								{paraphraserWordCount}/{maxWords + " Words"}
							</Typography>
						</div>

						<div className="w-px bg-gray-300 h-full"></div>
						<Textarea
							value={paraphraserOutput}
							placeholder="Paraphrased text will appear here."
							className="w-full h-64 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
							disabled={enabledTab !== "paraphraser"}
							style={{ fontSize: "15px" }}
						/>
					</div>
					<button
						className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
						onClick={handleParaphrase}
					>
						Paraphrase
					</button>
				</TabsContent>

				<TabsContent value="sentiment" className="mt-4">
					<div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
						<div className="relative w-full">
							<Textarea
								value={sentimentInput}
								onChange={(e) => setSentimentInput(e.target.value)}
								placeholder="Enter text to analyze sentiment."
								className="w-full h-64 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
								style={{ fontSize: "15px" }}
							/>
							<Typography
								sx={{
									position: 'absolute',
									bottom: 10,
									right: 20,
									color: sentimentWordCount > maxWords ? 'red' : 'black',
									fontSize: '0.875rem',
									fontWeight: 'semibold',
								}}
							>
								{sentimentWordCount}/{maxWords + " Words"}
							</Typography>
						</div>

						<div className="w-px bg-gray-300 h-full"></div>
						<Textarea
							value={sentimentOutput}
							placeholder="Sentiment analysis will appear here."
							className="w-full h-64 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
							disabled={enabledTab !== "sentiment"}
							style={{ fontSize: "15px" }}
						/>
					</div>
					<button
						className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
						onClick={handleSentimentAnalysis}
					>
						Analyze Sentiment
					</button>
				</TabsContent>
			</Tabs>
		</div >
	);
};

export default TabsComponent;

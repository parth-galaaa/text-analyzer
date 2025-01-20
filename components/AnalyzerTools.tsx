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
		const words = text.trim().split(/\s+/);
		return words[0] === '' ? 0 : words.length;
	};

	const summarizerWordCount = countWords(summarizerInput);
	const paraphraserWordCount = countWords(paraphraserInput);
	const sentimentWordCount = countWords(sentimentInput);

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

	return (
		<div className="flex flex-col p-20">
			<Tabs defaultValue="summarizer">
				<TabsList className="grid w-full grid-cols-3 text-soft-blue">
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
					{/* Input and output section */}
					<div className="grid grid-cols-[1fr_10px_1fr] gap-4">
						{/* Input Textarea and Word Count */}
						<div className="relative w-full bg-gray-50 rounded-lg shadow-lg border border-gray-300">
							<div>
								<Textarea
									value={summarizerInput}
									onChange={(e) => setSummarizerInput(e.target.value)}
									placeholder="Enter text to summarize."
									className="w-full p-4 bg-transparent border-none focus:ring-0"
									style={{ fontSize: "15px", height: "60vh", overflowY: "auto" }}
								/>
							</div>
							{/* Word Count */}
							<div
								className="relative w-full p-3 bg-gray-50 rounded-lg flex justify-between items-center"
								style={{
									fontSize: "0.875rem",
									color: summarizerWordCount > maxWords ? 'red' : 'black',
									backgroundColor: '#fff',
								}}
							>
								<p className="font-semibold">
									{summarizerWordCount}/{maxWords} Words
								</p>
								<button
									className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
									onClick={handleSummarize}
								>
									Summarize
								</button>
							</div>
						</div>

						{/* Vertical Divider */}
						<div className="w-px bg-gray-300 h-full"></div>

						{/* Output Textarea */}
						<div className="relative w-full bg-gray-50 rounded-lg shadow-lg border border-gray-300">
							<Textarea
								value={summarizerOutput}
								placeholder="Summarized text will appear here."
								className="w-full p-4 bg-transparent border-none focus:ring-0"
								disabled={enabledTab !== "summarizer"}
								style={{ fontSize: "15px", height: "60vh", overflow: "auto" }}
							/>
							<div
								className="relative w-full p-3 bg-gray-50 rounded-lg flex justify-between items-center"
								style={{
									fontSize: "0.875rem",
									color: summarizerWordCount > maxWords ? 'red' : 'black',
									backgroundColor: '#fff',
								}}
							>
								<button
									className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
									onClick={handleSummarize}
								>
									Placeholder
								</button>
							</div>
						</div>
					</div>

				</TabsContent>

				<TabsContent value="paraphraser">
					{/* Input and output section */}
					<div className="grid grid-cols-[1fr_10px_1fr] gap-4">
						{/* Input Textarea and Word Count */}
						<div className="relative w-full bg-gray-50 rounded-lg shadow-lg border border-gray-300">
							<div>
								<Textarea
									value={paraphraserInput}
									onChange={(e) => setParaphraserInput(e.target.value)}
									placeholder="Enter text to paraphrase."
									className="w-full p-4 bg-transparent border-none focus:ring-0"
									style={{ fontSize: "15px", height: "60vh", overflowY: "auto" }}
								/>
							</div>
							{/* Word Count */}
							<div
								className="relative w-full p-3 bg-gray-50 rounded-lg flex justify-between items-center"
								style={{
									fontSize: "0.875rem",
									color: paraphraserWordCount > maxWords ? 'red' : 'black',
									backgroundColor: '#fff',
								}}
							>
								<p className="font-semibold">
									{paraphraserWordCount}/{maxWords} Words
								</p>
								<button
									className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
									onClick={handleParaphrase}
								>
									Paraphrase
								</button>
							</div>
						</div>

						{/* Vertical Divider */}
						<div className="w-px bg-gray-300 h-full"></div>

						{/* Output Textarea */}
						<div className="relative w-full bg-gray-50 rounded-lg shadow-lg border border-gray-300">
							<Textarea
								value={paraphraserOutput}
								placeholder="Paraphrased text will appear here."
								className="w-full p-4 bg-transparent border-none focus:ring-0"
								disabled={enabledTab !== "paraphraser"}
								style={{ fontSize: "15px", height: "60vh" }}
							/>
							<div
								className="relative w-full p-3 bg-gray-50 rounded-lg flex justify-between items-center"
								style={{
									fontSize: "0.875rem",
									color: paraphraserWordCount > maxWords ? 'red' : 'black',
									backgroundColor: '#fff',
								}}
							>
								<button
									className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
									onClick={handleParaphrase}
								>
									Placeholder
								</button>
							</div>
						</div>
					</div>

				</TabsContent>

				<TabsContent value="sentiment">
					{/* Input and output section */}
					<div className="grid grid-cols-[1fr_10px_1fr] gap-4">
						{/* Input Textarea and Word Count */}
						<div className="relative w-full bg-gray-50 rounded-lg shadow-lg border border-gray-300">
							<div>
								<Textarea
									value={sentimentInput}
									onChange={(e) => setSentimentInput(e.target.value)}
									placeholder="Enter text to analyze sentiment."
									className="w-full p-4 bg-transparent border-none focus:ring-0"
									style={{ fontSize: "15px", height: "60vh", overflowY: "auto" }}
								/>
							</div>
							{/* Word Count */}
							<div
								className="relative w-full p-3 bg-gray-50 rounded-lg flex justify-between items-center"
								style={{
									fontSize: "0.875rem",
									color: sentimentWordCount > maxWords ? 'red' : 'black',
									backgroundColor: '#fff',
								}}
							>
								<p className="font-semibold">
									{sentimentWordCount}/{maxWords} Words
								</p>
								<button
									className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
									onClick={handleSentimentAnalysis}
								>
									Analyze Sentiment
								</button>
							</div>
						</div>

						{/* Vertical Divider */}
						<div className="w-px bg-gray-300 h-full"></div>

						{/* Output Textarea */}
						<div className="relative w-full bg-gray-50 rounded-lg shadow-lg border border-gray-300">
							<Textarea
								value={sentimentOutput}
								placeholder="Sentiment analysis will appear here."
								className="w-full p-4 bg-transparent border-none focus:ring-0"
								disabled={enabledTab !== "sentiment"}
								style={{ fontSize: "15px", height: "60vh" }}
							/>
							<div
								className="relative w-full p-3 bg-gray-50 rounded-lg flex justify-between items-center"
								style={{
									fontSize: "0.875rem",
									color: sentimentWordCount > maxWords ? 'red' : 'black',
									backgroundColor: '#fff',
								}}
							>
								<button
									className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
									onClick={handleSentimentAnalysis}
								>
									Placeholder
								</button>
							</div>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default TabsComponent;

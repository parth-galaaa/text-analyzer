"use client";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const tabs = () => {
	return (
		<div className="flex flex-col p-4">
			<Tabs defaultValue="summarizer">
				<TabsList className="grid w-full grid-cols-3 text-soft-blue mb-2">
					<TabsTrigger value="summarizer" className="text-xl hover:shadow-md hover:bg-light-blue hover:text-white transition-colors duration-300">
						Summarizer
					</TabsTrigger>
					<TabsTrigger value="paraphraser" className="text-xl hover:shadow-md hover:bg-light-blue hover:text-white transition-colors duration-300">
						Paraphraser
					</TabsTrigger>
					<TabsTrigger value="sentiment" className="text-xl hover:shadow-md hover:bg-light-blue hover:text-white transition-colors duration-300">
						Sentiment Analysis
					</TabsTrigger>
				</TabsList>

				{/* Remove gap and padding to ensure no space below the tabs */}
				<TabsContent value="summarizer" className="mt-0">
					<div className="grid w-full grid-cols-[1fr_auto_1fr] gap-4 items-center">
						<Textarea
							placeholder="To summarize, paraphrase or analyze sentiment, enter your text here."
							id="textbox1"
							className="bg-white w-full h-80 shadow-md border border-gray-200"
						/>
						<div className="w-px bg-gray-300 h-full"></div> {/* Vertical Line */}
						<div className="flex flex-col">
							<Textarea
								placeholder="Your output will appear here."
								id="textbox2"
								className="bg-white w-full h-80 shadow-md border border-gray-200"
								disabled
							/>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="paraphraser" className="mt-0">
					<p className="text-soft-blue">Paraphraser tool.</p>
				</TabsContent>
				<TabsContent value="sentiment" className="mt-0">
					<p className="text-soft-blue">Sentiment analysis tool.</p>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default tabs;

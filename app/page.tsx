'use client';

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100 mx-auto">
      <Navbar />
    </main>
  );
}

/*const Page = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');

  const handleRequest = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5328/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the summary');
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the summary');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Text Summarizer</h1>

        <textarea
          rows={10}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4 text-black"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to summarize"
        />

        <button
          onClick={handleRequest}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 ease-in-out"
        >
          Summarize
        </button>

        {summary && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Summary:</h2>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;*/

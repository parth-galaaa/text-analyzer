import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-off-white mx-auto">
      <Navbar />
      <Tabs />
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
};*/

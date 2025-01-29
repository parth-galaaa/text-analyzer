import Navbar from "@/components/Navbar";
import Tabs from "@/components/AnalyzerTools";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-r from-blue-50 via-gray-50 to-blue-100 mx-auto">
      <Navbar />
      <Tabs />
    </main>
  );
}
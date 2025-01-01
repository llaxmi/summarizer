import Upload from "./components/ui/Upload";

export default function PDFSummarizer() {
  return (
    <div className="min-h-screen font-fredoka bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-semibold text-indigo-900 sm:text-6xl">
            PDF Summarizer
          </h1>
          <p className="mt-4 text-lg text-gray-700 sm:mt-6">
            Upload your PDF and get a quick summary in seconds.
          </p>
        </div>
        {/* Ensure consistent rendering for the Upload component */}
        <Upload />
      </div>
    </div>
  );
}

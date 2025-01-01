"use client";
import { FileText, FileUp, Loader2, X } from "lucide-react";
import { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError("Please upload a valid PDF file.");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/summarizer", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to summarize the file.");
      }

      const data = await response.json();
      setSummary(data.summary || "No summary available.");
    } catch (err) {
      console.error(err);
      setError("An error occurred while summarizing the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div className="w-full">
          {!file ? (
            <label
              htmlFor="file-upload"
              className="block w-full px-6 pt-5 pb-6 border-2 border-dashed hover:border-indigo-500 rounded-lg text-center bg-white shadow-md transition-all duration-500 border-indigo-200 cursor-pointer"
            >
              <div className="space-y-1">
                <FileUp className="mx-auto h-12 w-12 text-indigo-500" />
                <p className="text-lg text-gray-600">
                  Upload a file{" "}
                  <span className="text-gray-600">or drag and drop</span>
                </p>
                <p className="text-sm text-gray-500">PDF up to 10MB</p>
              </div>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf"
              />
            </label>
          ) : (
            <div className="flex items-center justify-between bg-indigo-100/80 p-3 rounded-md">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-indigo-500" />
                <span className="text-sm font-medium text-gray-700">
                  {file.name}
                </span>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700 transition"
              >
                <X className="h-5 w-5" color="red" />
              </button>
            </div>
          )}
        </div>

        {error && (
          <p className="text-center text-sm text-red-500 font-semibold">
            {error}
          </p>
        )}

        <div className="text-center">
          <button
            type="submit"
            disabled={!file || loading}
            className={`${
              loading ? "bg-indigo-400" : "bg-indigo-500 hover:bg-indigo-600"
            } text-white px-6 py-3 rounded-md font-medium text-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <>
                <Loader2 className="inline h-5 w-5 animate-spin mr-2" />
                Summarizing...
              </>
            ) : (
              "Summarize PDF"
            )}
          </button>
        </div>
      </form>

      {summary && (
        <div className="mt-8 bg-white rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Summary</h3>
          </div>
          <div className="p-6 text-gray-700">
            <p>{summary}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Upload;

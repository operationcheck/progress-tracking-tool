import { useState } from 'preact/hooks';
import type { ApiResponse } from '../types';

interface FileUploadProps {
  onDataLoad: (data: ApiResponse) => void;
}

export const FileUpload = ({ onDataLoad }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');

  const handleJsonParse = (jsonString: string) => {
    try {
      const jsonData = JSON.parse(jsonString);
      onDataLoad(jsonData);
      setError(null);
      setTextInput('');
    } catch (err) {
      setError('Invalid JSON format. Please check the syntax.');
      console.error('JSON parsing error:', err);
    }
  };

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const jsonString = e.target?.result as string;
      handleJsonParse(jsonString);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        handleFileRead(file);
      } else {
        setError('Please upload a JSON file.');
      }
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      handleJsonParse(textInput.trim());
    }
  };

  const handleTextInputChange = (e: Event) => {
    const textarea = e.target as HTMLTextAreaElement;
    setTextInput(textarea.value);
    if (error) setError(null);
  };

  return (
    <div class="w-full max-w-6xl mx-auto p-6 rounded-lg bg-white border border-slate-300">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload Section */}
        <div>
          <h3 class="text-lg font-medium text-slate-800 mb-4">
            Upload JSON File
          </h3>
          <div
            class={`border-2 border-dashed rounded-lg p-6 text-center transition-colors h-48 flex flex-col justify-center ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-300 hover:border-slate-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div class="space-y-4">
              <div class="flex justify-center">
                <svg
                  class="w-10 h-10 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <p class="text-base font-medium text-slate-800">
                  Drop your JSON file here
                </p>
                <p class="text-sm text-slate-600 mt-1">or click to browse</p>
              </div>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileInput}
                class="hidden"
                id="file-upload"
              />
              <label
                for="file-upload"
                class="inline-flex items-center px-4 py-2 border border-blue-700 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
              >
                Choose File
              </label>
            </div>
          </div>
        </div>

        {/* Text Input Section */}
        <div>
          <h3 class="text-lg font-medium text-slate-800 mb-4">
            Paste JSON Data
          </h3>
          <div class="h-48 flex flex-col">
            <textarea
              value={textInput}
              onInput={handleTextInputChange}
              placeholder="Paste your JSON data here..."
              class="flex-1 w-full px-3 py-2 border-2 border-slate-300 rounded-t-md placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm font-mono resize-none"
            />
            <button
              onClick={handleTextSubmit}
              disabled={!textInput.trim()}
              class="w-full inline-flex justify-center items-center px-4 py-2 border-2 border-blue-700 border-t-0 text-sm font-medium rounded-b-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-slate-400 disabled:cursor-not-allowed disabled:border-slate-300"
            >
              Process JSON Data
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div class="mt-6 p-4 bg-red-50 border border-red-300 rounded-md">
          <p class="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div class="mt-6 text-sm text-slate-700 bg-slate-100 p-4 rounded-md border border-slate-200">
        <p class="font-medium">Expected JSON format:</p>
        <p class="mt-1">
          Upload a JSON file or paste JSON data containing education progress
          information with course details, reports, and grades.
        </p>
      </div>
    </div>
  );
};

import { useState } from 'preact/hooks';
import type { ApiResponse } from '../types';
import { FileUpload } from './FileUpload';
import { DataFetcher } from './DataFetcher';

interface DataInputTabsProps {
  onDataLoad: (data: ApiResponse) => void;
}

export const DataInputTabs = ({ onDataLoad }: DataInputTabsProps) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'fetch'>('upload');

  const tabs = [
    { id: 'upload' as const, label: 'Upload/Paste Data' },
    { id: 'fetch' as const, label: 'Fetch from N-Lobby' },
  ];

  return (
    <div class="w-full max-w-6xl mx-auto">
      {/* Tab Navigation */}
      <div class="flex space-x-1 bg-slate-200 p-1 rounded-lg mb-6 border border-slate-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            class={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white border border-blue-700'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'upload' && <FileUpload onDataLoad={onDataLoad} />}
        {activeTab === 'fetch' && <DataFetcher />}
      </div>
    </div>
  );
};

import { useState } from 'preact/hooks';

export const DataFetcher = () => {
  const [sessionToken, setSessionToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const handleTokenChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    setSessionToken(input.value);
    if (error) setError(null);
    if (copiedCommand) setCopiedCommand(null);
  };

  const getCommand = (platform: 'curl' | 'powershell' | 'python') => {
    const token = sessionToken.trim();
    if (!token) return '';

    const url =
      'https://nlobby.nnn.ed.jp/api/trpc/requiredCourse.getRequiredCourses';

    switch (platform) {
      case 'curl':
        return [
          'curl -X POST "' + url + '" \\',
          '  -H "Authorization: Bearer ' + token + '" \\',
          '  -H "Content-Type: application/json" \\',
          '  --output course_data.json',
        ].join('\n');

      case 'powershell':
        return [
          'Invoke-RestMethod -Uri "' + url + '" \\',
          '  -Method POST \\',
          '  -Headers @{',
          '    "Authorization" = "Bearer ' + token + '"',
          '    "Content-Type" = "application/json"',
          '  } \\',
          '  -OutFile "course_data.json"',
        ].join('\n');

      case 'python':
        return [
          'import requests',
          'import json',
          '',
          'headers = {',
          "    'Authorization': 'Bearer " + token + "',",
          "    'Content-Type': 'application/json'",
          '}',
          '',
          "response = requests.post('" + url + "', headers=headers)",
          "with open('course_data.json', 'w', encoding='utf-8') as f:",
          '    json.dump(response.json(), f, ensure_ascii=False, indent=2)',
        ].join('\n');

      default:
        return '';
    }
  };

  const copyCommand = async (platform: 'curl' | 'powershell' | 'python') => {
    const command = getCommand(platform);
    if (!command) return;

    try {
      await navigator.clipboard.writeText(command);
      setCopiedCommand(platform);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (err) {
      console.error('Failed to copy command:', err);
    }
  };

  const commands = [
    { id: 'curl' as const, name: 'cURL (macOS/Linux)' },
    { id: 'powershell' as const, name: 'PowerShell (Windows)' },
    { id: 'python' as const, name: 'Python Script' },
  ];

  return (
    <div class="space-y-6">
      {/* Recommended Method */}
      <div class="bg-white rounded-lg border border-slate-300 p-6">
        <h3 class="text-lg font-medium text-slate-800 mb-4">
          Recommended: Use Browser Developer Tools
        </h3>

        <div class="p-4 bg-green-50 border border-green-300 rounded-md mb-4">
          <p class="text-sm text-green-800 font-medium">
            <strong>Easiest method:</strong> Get the data directly from your
            browser's Network tab
          </p>
        </div>

        <div class="space-y-4">
          <div class="p-4 bg-blue-50 border border-blue-300 rounded-md">
            <h4 class="text-sm font-medium text-blue-800 mb-3">
              How to get data using Developer Tools:
            </h4>
            <ol class="text-sm text-blue-700 space-y-2 list-decimal list-inside">
              <li>
                Visit{' '}
                <a
                  href="https://nlobby.nnn.ed.jp/auth"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline hover:text-blue-600 font-medium"
                >
                  N-Lobby (https://nlobby.nnn.ed.jp)
                </a>{' '}
                and log in
              </li>
              <li>
                Open browser developer tools (Press{' '}
                <kbd class="bg-blue-200 px-1 rounded">F12</kbd>)
              </li>
              <li>
                Go to the <strong>"Network"</strong> tab
              </li>
              <li>Navigate to your progress/course page in N-Lobby</li>
              <li>
                Look for a request to{' '}
                <code class="bg-blue-100 px-1 rounded text-xs">
                  requiredCourse.getRequiredCourses
                </code>
              </li>
              <li>
                Click on that request and go to the <strong>"Response"</strong>{' '}
                tab
              </li>
              <li>Copy the entire JSON response</li>
              <li>Paste it into the "Upload/Paste Data" tab above</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Alternative CLI Method */}
      <div class="bg-white rounded-lg border border-slate-300 p-6">
        <h3 class="text-lg font-medium text-slate-800 mb-4">
          Alternative: CLI Commands
        </h3>
        <p class="text-sm text-slate-600 mb-4">
          If you prefer using command line tools, follow these steps:
        </p>

        <div class="space-y-4">
          <div>
            <label
              for="session-token"
              class="block text-sm font-medium text-slate-700 mb-2"
            >
              1. First, get your session token from cookies:
            </label>
            <input
              id="session-token"
              type="password"
              value={sessionToken}
              onInput={handleTokenChange}
              placeholder="Paste your __Secure-next-auth.session-token here"
              class="w-full px-3 py-2 border border-slate-300 rounded-md placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm font-mono"
            />
          </div>

          <div class="p-4 bg-slate-50 border border-slate-200 rounded-md">
            <h5 class="text-xs font-medium text-slate-700 mb-2">
              Cookie extraction steps:
            </h5>
            <ol class="text-xs text-slate-600 space-y-1 list-decimal list-inside">
              <li>Go to N-Lobby and open Developer Tools (F12)</li>
              <li>
                Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
              </li>
              <li>
                Find "Cookies" → look for{' '}
                <code class="bg-slate-200 px-1 rounded">
                  __Secure-next-auth.session-token
                </code>
              </li>
              <li>Copy the cookie value</li>
            </ol>
          </div>
        </div>

        {sessionToken.trim() && (
          <div class="mt-6">
            <h4 class="text-sm font-medium text-slate-700 mb-3">
              2. Then run one of these commands:
            </h4>

            <div class="space-y-4">
              {commands.map((cmd) => (
                <div
                  key={cmd.id}
                  class="border border-slate-300 rounded-lg p-4"
                >
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center space-x-2">
                      <h4 class="font-medium text-slate-800">{cmd.name}</h4>
                    </div>
                    <button
                      onClick={() => copyCommand(cmd.id)}
                      class={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
                        copiedCommand === cmd.id
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                      }`}
                    >
                      {copiedCommand === cmd.id ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>

                  <pre class="bg-slate-900 text-green-400 p-3 rounded text-xs overflow-x-auto border border-slate-700">
                    <code>{getCommand(cmd.id)}</code>
                  </pre>
                </div>
              ))}
            </div>

            <div class="mt-4 p-4 bg-amber-50 border border-amber-300 rounded-md">
              <p class="text-sm text-amber-800">
                <strong>After running the command:</strong> A file named{' '}
                <code class="bg-amber-100 px-1 rounded">course_data.json</code>{' '}
                will be saved. Upload this file using the "Upload/Paste Data"
                tab.
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div class="bg-red-50 border border-red-300 rounded-md p-4">
          <p class="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
};

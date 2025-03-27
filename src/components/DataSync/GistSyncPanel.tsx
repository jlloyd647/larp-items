'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { uploadAllStoresToGist, loadAllStoresFromGist  } from '@/lib/gistSync';

const GistSyncPanel = () => {
  const [token, setToken] = useState('');
  const [gistId, setGistId] = useState('');

  const upload = async () => {
    try {
      const id = await uploadAllStoresToGist(token);
      alert(`Upload complete. Gist ID: ${id}`);
      setGistId(id);
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    }
  };

  const load = async () => {
    try {
      const ok = await loadAllStoresFromGist(gistId, token);
      if (ok) {
        alert('Character data restored! Refresh to apply.');
      }
    } catch (err: any) {
      alert(`Load failed: ${err.message}`);
    }
  };

  return (
    <div className="p-4 border rounded-md space-y-3 w-[400px]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">📦 Character Sync (GitHub Gist)</h2>

        {/* Help Dialog Trigger */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">Help</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>How to Backup / Restore Your Data</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm text-left">
              <p>This app lets you securely back up your LARP character data to a private GitHub Gist and restore it later — even from another device.</p>

              <h3 className="font-bold">🔐 What You’ll Need</h3>
              <ul className="list-disc list-inside">
                <li>A GitHub account</li>
                <li>A GitHub token with the <code>gist</code> permission</li>
                <li>A Gist ID (only for restoring)</li>
              </ul>

              <h3 className="font-bold">📤 Backing Up</h3>
              <ol className="list-decimal list-inside">
                <li>Generate a token at <a className="text-blue-600 underline" href="https://github.com/settings/tokens" target="_blank">github.com/settings/tokens</a></li>
                <li>Select the <strong>“gist”</strong> permission</li>
                <li>Copy the token and paste it into this panel</li>
                <li>Click <strong>Upload</strong> to create a private backup</li>
              </ol>

              <h3 className="font-bold">📥 Restoring</h3>
              <ol className="list-decimal list-inside">
                <li>Paste your GitHub token</li>
                <li>Paste the Gist ID</li>
                <li>Click <strong>Restore</strong></li>
                <li>Refresh the page to see changes</li>
              </ol>

              <h3 className="font-bold">🔐 Is it secure?</h3>
              <ul className="list-disc list-inside">
                <li>Yes — Gists are private</li>
                <li>Your data is AES-encrypted with a passphrase</li>
                <li>Only this app can decrypt the content</li>
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <input
        type="text"
        placeholder="GitHub token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="w-full border rounded px-2 py-1"
      />
      <input
        type="text"
        placeholder="Gist ID (for restore)"
        value={gistId}
        onChange={(e) => setGistId(e.target.value)}
        className="w-full border rounded px-2 py-1"
      />
      <div className="flex gap-2">
        <Button onClick={upload}>⬆️ Upload</Button>
        <Button onClick={load} variant="outline">⬇️ Restore</Button>
      </div>
    </div>
  );
};

export default GistSyncPanel;

import React, { useState } from 'react';
import { SHOPIFY_THEME_FILES, ShopifyFile } from '../../data/shopifyThemeCode';
import JSZip from 'jszip';
import {
  X,
  Download,
  Copy,
  Check,
  FileCode,
  FolderTree,
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface ShopifyThemePorterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShopifyThemePorterModal: React.FC<ShopifyThemePorterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFile, setSelectedFile] = useState<ShopifyFile>(SHOPIFY_THEME_FILES[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [isGeneratingZip, setIsGeneratingZip] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'files' | 'instructions'>('files');

  if (!isOpen) return null;

  const filteredFiles = SHOPIFY_THEME_FILES.filter((file) => {
    if (selectedCategory === 'all') return true;
    return file.category === selectedCategory;
  });

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadZip = async () => {
    try {
      setIsGeneratingZip(true);
      // Fetch the pre-built, full Shopify Dawn theme zip which includes layout/theme.liquid and all 353 files
      const response = await fetch('/lm-3d-print-store-dawn-theme.zip');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'lm-3d-print-store-dawn-theme.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        return;
      }

      // Fallback in-memory generation if fetch isn't available
      const zip = new JSZip();
      SHOPIFY_THEME_FILES.forEach((file) => {
        zip.file(file.path, file.content);
      });
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'lm-3d-print-store-dawn-theme.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating theme zip:', err);
    } finally {
      setIsGeneratingZip(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div className="fixed inset-4 sm:inset-6 md:inset-10 bg-[#08080D] border border-[#232334] rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#232334] bg-[#11111A] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00D9FF] to-[#FF00D4] p-0.5 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#08080D] rounded-[10px] flex items-center justify-center text-[#00D9FF]">
                <FileCode className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white font-display">
                  SHOPIFY DAWN THEME PORTER
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/30">
                  Online Store 2.0
                </span>
              </div>
              <p className="text-xs text-[#B8B8C8]">
                Production-ready Dawn files configured to match your L&amp;M 3D Print Store mockup.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#171722] border border-[#232334] rounded-lg p-1 text-xs">
              <button
                onClick={() => setActiveTab('files')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  activeTab === 'files'
                    ? 'bg-[#232334] text-white shadow-xs'
                    : 'text-[#B8B8C8] hover:text-white'
                }`}
              >
                Theme Files ({SHOPIFY_THEME_FILES.length})
              </button>
              <button
                onClick={() => setActiveTab('instructions')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  activeTab === 'instructions'
                    ? 'bg-[#232334] text-white shadow-xs'
                    : 'text-[#B8B8C8] hover:text-white'
                }`}
              >
                Installation Guide
              </button>
            </div>

            {/* 1-Click ZIP Download */}
            <button
              onClick={handleDownloadZip}
              disabled={isGeneratingZip}
              className="px-4 py-2 bg-gradient-to-r from-[#00D9FF] to-[#FF00D4] text-[#08080D] font-extrabold text-xs uppercase tracking-wider rounded-lg hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingZip ? 'PACKAGING ZIP...' : 'DOWNLOAD THEME (.ZIP)'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#B8B8C8] hover:text-white rounded-lg hover:bg-[#171722] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'files' ? (
          <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
            {/* Left Sidebar: File Tree & Categories */}
            <div className="w-full md:w-80 border-r border-[#232334] bg-[#11111A]/50 flex flex-col shrink-0 overflow-y-auto">
              {/* Category Filter Pills */}
              <div className="p-3 border-b border-[#232334] flex gap-1.5 overflow-x-auto text-[11px]">
                {['all', 'layout', 'config', 'assets', 'templates', 'sections', 'snippets'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-md font-semibold capitalize whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#00D9FF] text-[#08080D]'
                        : 'bg-[#171722] text-[#B8B8C8] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* File List */}
              <div className="p-2 divide-y divide-[#232334]/40">
                {filteredFiles.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left p-3 rounded-lg transition-all flex items-start gap-3 cursor-pointer group ${
                      selectedFile.path === file.path
                        ? 'bg-[#171722] border border-[#00D9FF]/40 text-white'
                        : 'hover:bg-[#171722]/60 text-[#B8B8C8]'
                    }`}
                  >
                    <FileCode className={`w-4 h-4 mt-0.5 shrink-0 ${
                      selectedFile.path === file.path ? 'text-[#00D9FF]' : 'text-[#B8B8C8]/60'
                    }`} />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-mono font-bold truncate text-white">
                        {file.path}
                      </div>
                      <div className="text-[11px] text-[#B8B8C8] line-clamp-1 mt-0.5">
                        {file.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Pane: Code Viewer */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#08080D] overflow-hidden">
              {/* File details bar */}
              <div className="p-3 sm:px-6 border-b border-[#232334] bg-[#11111A]/80 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-xs font-mono text-[#00D9FF] font-bold">
                    {selectedFile.path}
                  </div>
                  <div className="text-[11px] text-[#B8B8C8] truncate">
                    {selectedFile.description}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 bg-[#171722] hover:bg-[#232334] border border-[#232334] rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code display with line numbers */}
              <div className="flex-1 overflow-auto p-4 sm:p-6 font-mono text-xs leading-relaxed text-[#B8B8C8] bg-[#08080D]">
                <pre className="text-white/90 whitespace-pre-wrap select-all font-mono">
                  {selectedFile.content}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          /* Instructions Tab */
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 max-w-4xl mx-auto text-xs leading-relaxed text-[#B8B8C8]">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00D9FF]">
                Deployment Instructions
              </span>
              <h3 className="text-2xl font-black text-white font-display">
                HOW TO APPLY THESE FILES TO YOUR SHOPIFY STORE
              </h3>
              <p>
                Follow either of the two standard Shopify methods below to apply the L&amp;M 3D Print Store design directly to your live or development store.
              </p>
            </div>

            {/* Method 1 Card */}
            <div className="p-6 rounded-xl bg-[#11111A] border border-[#00D9FF]/40 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#00D9FF] text-[#08080D] flex items-center justify-center font-bold text-xs">1</span>
                  <span>Method A: 1-Click ZIP Theme Upload (Recommended)</span>
                </h4>
                <button
                  onClick={handleDownloadZip}
                  className="px-3.5 py-1.5 rounded-lg bg-[#00D9FF] text-[#08080D] font-bold text-xs uppercase cursor-pointer hover:bg-white transition-colors"
                >
                  Download .ZIP Now
                </button>
              </div>

              <ol className="list-decimal pl-5 space-y-2 text-[#B8B8C8]">
                <li>Click <strong>&ldquo;DOWNLOAD THEME (.ZIP)&rdquo;</strong> above to save the pre-packaged archive to your computer.</li>
                <li>Log in to your <strong>Shopify Admin</strong> dashboard.</li>
                <li>Go to <strong>Online Store → Themes</strong>.</li>
                <li>Under <strong>Theme library</strong>, click <strong>Add theme → Upload zip file</strong>.</li>
                <li>Choose the downloaded file <code className="text-[#00D9FF] bg-[#171722] px-1.5 py-0.5 rounded">lm-3d-print-store-dawn-theme.zip</code> and click <strong>Upload file</strong>.</li>
                <li>Once uploaded, click <strong>Customize</strong> to inspect your new dark, vibrant storefront, or click <strong>Publish</strong> to make it live!</li>
              </ol>
            </div>

            {/* Method 2 Card */}
            <div className="p-6 rounded-xl bg-[#11111A] border border-[#232334] space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#FF00D4] text-white flex items-center justify-center font-bold text-xs">2</span>
                <span>Method B: Manual File Update in Existing Dawn Theme</span>
              </h4>
              <p>
                If your existing Dawn theme already has custom apps or plugins you wish to preserve:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-[#B8B8C8]">
                <li>Go to <strong>Online Store → Themes → Current theme → &apos;...&apos; → Edit code</strong>.</li>
                <li>Select <code className="text-white bg-[#171722] px-1.5 py-0.5 rounded">config/settings_data.json</code> from the Theme Files tab and replace its content to instantly apply the obsidian, electric cyan, and neon magenta color schemes.</li>
                <li>Select <code className="text-white bg-[#171722] px-1.5 py-0.5 rounded">assets/base.css</code> and append the styling rules to the bottom of your file.</li>
                <li>Update <code className="text-white bg-[#171722] px-1.5 py-0.5 rounded">templates/index.json</code> to apply the section order and homepage copy.</li>
                <li>Update <code className="text-white bg-[#171722] px-1.5 py-0.5 rounded">snippets/card-product.liquid</code> and <code className="text-white bg-[#171722] px-1.5 py-0.5 rounded">sections/footer.liquid</code>.</li>
                <li>Save each file in the Shopify code editor.</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

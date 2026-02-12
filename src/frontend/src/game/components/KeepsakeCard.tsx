import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportKeepsakePng } from '../utils/exportKeepsakePng';
import { DEFAULT_NAME } from '../types';

interface KeepsakeCardProps {
  personalization: { name: string; dedication: string };
}

export function KeepsakeCard({ personalization }: KeepsakeCardProps) {
  const displayDedication =
    personalization.dedication || 'Forever in my heart ❤️';

  const handleDownload = async () => {
    try {
      await exportKeepsakePng(DEFAULT_NAME, displayDedication);
    } catch (error) {
      console.error('Failed to download keepsake:', error);
    }
  };

  return (
    <div className="keepsake-section">
      <h3 className="keepsake-title">Your Love Keepsake 💝</h3>
      <div className="keepsake-card" id="keepsake-card">
        <img
          src="/assets/generated/keepsake-certificate.dim_1600x1000.png"
          alt="Keepsake certificate"
          className="keepsake-background"
        />
        <div className="keepsake-content">
          <h2 className="keepsake-name">{DEFAULT_NAME}</h2>
          <p className="keepsake-dedication">{displayDedication}</p>
          <p className="keepsake-date">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <Button onClick={handleDownload} size="lg" className="download-button">
        <Download className="mr-2 h-5 w-5" />
        Download Keepsake
      </Button>
    </div>
  );
}

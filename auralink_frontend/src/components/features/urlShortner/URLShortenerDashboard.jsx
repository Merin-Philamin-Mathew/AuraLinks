import { urlShortenerApi } from '@/features/urlShortenerLogic/shortener_actions';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

function URLShortenerDashboard() {
  const [shortUrls, setShortUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchShortUrls();
  }, []);

  const fetchShortUrls = async () => {
    try {
      setIsLoading(true);
      const data = await urlShortenerApi.getShortUrls();
      setShortUrls(data);
    } catch (error) {
      toast.error('Failed to load URLs');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-lg font-medium text-foreground mb-2">Recent URLs</h3>
      <div className="space-y-2">
        {shortUrls.slice(0, 3).map((url) => ( // Limit to 3 URLs
          <div key={url.id} className="border border-border rounded-md p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Link size={16} className="mr-2 text-chart-3" />
                <div className="text-foreground font-medium">
                  aura.links/{url.short_code}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{url.clicks_count} clicks</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default URLShortenerDashboard;

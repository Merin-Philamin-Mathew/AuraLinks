import React, { useState, useEffect } from 'react';
import { Link, Copy, BarChart, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { urlShortenerApi } from '@/features/urlShortenerLogic/shortener_actions';
import { BASE_URL } from '@/config/apis/axios';

export const URLShortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortUrls, setShortUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(null);
  const [analyticsData, setAnalyticsData] = useState({});

  // Fetch existing short URLs on component mount
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

  const createShortUrl = async () => {
    if (!longUrl) {
      toast.error('Please enter a long URL');
      return;
    }

    try {
      setIsLoading(true);
      
      const urlData = {
        original_url: longUrl,
        short_code: customSlug || undefined
      };
      
      const newUrl = await urlShortenerApi.createShortUrl(urlData);
      
      // Add to state
      setShortUrls([newUrl, ...shortUrls]);
      
      // Clear form
      setLongUrl('');
      setCustomSlug('');
      
      toast.success('Short URL created successfully!');
    } catch (error) {
      const message = error.data.message || 'Failed to create short URL';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteShortUrl = async (id) => {
    try {
      setIsLoading(true);
      await urlShortenerApi.deleteShortUrl(id);
      setShortUrls(shortUrls.filter(url => url.id !== id));
      toast.success('Short URL deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete short URL');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (shortCode) => {
    // Base URL would come from your environment config in a real app
    const fullUrl = `${BASE_URL}api/s/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Copied to clipboard!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const loadAnalytics = async (id) => {
    if (showAnalytics === id) {
      // Toggle off
      setShowAnalytics(null);
      return;
    }

    try {
      setIsLoading(true);
      const data = await urlShortenerApi.getUrlAnalytics(id);
      setAnalyticsData(prevData => ({
        ...prevData,
        [id]: data
      }));
      setShowAnalytics(id);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  };

  const getTopReferrer = (id) => {
    if (!analyticsData[id] || !analyticsData[id].referrer_breakdown || analyticsData[id].referrer_breakdown.length === 0) {
      return 'None';
    }
    return analyticsData[id].referrer_breakdown[0].source;
  };

  const getDeviceStats = (id) => {
    if (!analyticsData[id] || !analyticsData[id].device_breakdown || analyticsData[id].device_breakdown.length === 0) {
      return 'Unknown';
    }
    
    const topDevice = analyticsData[id].device_breakdown[0];
    const total = analyticsData[id].total_clicks;
    const percentage = total > 0 ? Math.round((topDevice.count / total) * 100) : 0;
    
    return `${topDevice.name} (${percentage}%)`;
  };

  return (
    <div className="p-4">
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-medium text-foreground mb-4">Create Short URL</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Long URL</label>
            <input
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com/very/long/url/that/needs/shortening"
              className="w-full p-2 bg-secondary rounded-md focus:outline-none text-foreground"
            />
          </div>
          
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Custom Short URL (optional)</label>
            <div className="flex items-center">
              <span className="bg-secondary text-muted-foreground p-2 rounded-l-md border-r border-border">aura.links/</span>
              <input
                type="text"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="custom-name"
                className="flex-1 p-2 bg-secondary rounded-r-md focus:outline-none text-foreground"
              />
            </div>
          </div>
          
          <button 
            className={`w-full bg-primary text-primary-foreground p-2 rounded-md ${isLoading ? 'opacity-70' : 'hover:bg-primary/90'}`}
            onClick={createShortUrl}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Short URL'}
          </button>
        </div>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-medium text-foreground mb-4">Your Short URLs</h2>
        <div className="space-y-4">
          {isLoading && shortUrls.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading URLs...
            </div>
          ) : shortUrls.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No short URLs created yet. Create your first one above!
            </div>
          ) : (
            shortUrls.map((url) => (
              <div key={url.id} className="border border-border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Link size={16} className="mr-2 text-chart-3" />
                    <div className="text-foreground font-medium">aura.links/{url.short_code}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{url.clicks_count} clicks</div>
                </div>
                <div className="text-sm text-muted-foreground mt-2 truncate">
                  {url.original_url}
                </div>
                
                {showAnalytics === url.id && analyticsData[url.id] && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Analytics</h3>
                      <button 
                        className="text-xs text-primary hover:underline"
                        onClick={() => setShowAnalytics(null)}
                      >
                        Close
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-secondary p-3 rounded-md">
                        <div className="text-xs text-muted-foreground mb-1">Last 7 Days</div>
                        <div className="text-lg font-medium">{analyticsData[url.id].total_clicks} Clicks</div>
                      </div>
                      <div className="bg-secondary p-3 rounded-md">
                        <div className="text-xs text-muted-foreground mb-1">Top Referrer</div>
                        <div className="text-lg font-medium">{getTopReferrer(url.id)}</div>
                      </div>
                      <div className="bg-secondary p-3 rounded-md">
                        <div className="text-xs text-muted-foreground mb-1">Device</div>
                        <div className="text-lg font-medium">{getDeviceStats(url.id)}</div>
                      </div>
                    </div>
                    <div className="h-32 bg-secondary/50 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <BarChart className="mx-auto text-muted-foreground mb-2" />
                        <div className="text-sm text-muted-foreground">
                          {analyticsData[url.id].daily_clicks.length === 0 
                            ? 'No click data available yet' 
                            : 'Daily clicks chart would render here'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-4 pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground">Created {formatDate(url.created_at)}</div>
                  <div className="flex items-center">
                    <button 
                      className="flex items-center text-xs text-primary hover:underline mr-3"
                      onClick={() => copyToClipboard(url.short_code)}
                    >
                      <Copy size={12} className="mr-1" /> Copy
                    </button>
                    <button 
                      className="flex items-center text-xs text-primary hover:underline mr-3"
                      onClick={() => loadAnalytics(url.id)}
                      disabled={isLoading}
                    >
                      <BarChart size={12} className="mr-1" /> Analytics
                    </button>
                    <button 
                      className="flex items-center text-xs text-destructive hover:underline"
                      onClick={() => deleteShortUrl(url.id)}
                      disabled={isLoading}
                    >
                      <Trash size={12} className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
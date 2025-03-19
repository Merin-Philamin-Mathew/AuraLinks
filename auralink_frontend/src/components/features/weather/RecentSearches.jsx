// src/components/Weather/RecentSearches.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RecentSearches = ({ searches, onSearchClick }) => {
  if (!searches || searches.length === 0) return null;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <History className="h-4 w-4 mr-2" />
          Recent Searches
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {searches.map((search) => (
            <Button
              key={search.id}
              variant="outline"
              size="sm"
              onClick={() => onSearchClick(search)}
              className="text-xs"
            >
              {search.location_name || search.city} 
              {search.temperature && (
                <span className="ml-1">({Math.round(search.temperature)}°C)</span>
              )}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSearches;
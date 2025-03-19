// src/components/Weather/ForecastChart.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ForecastChart = ({ forecast }) => {
    // Process forecast data for the chart
    const processData = () => {
      if (!forecast || !forecast.list) return [];
      
      return forecast.list.slice(0, 8).map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(item.main.temp),
        icon: item.weather[0].id
      }));
    };
  
    const chartData = processData();
  
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-2">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis 
                  hide={true}
                  domain={['dataMin - 2', 'dataMax + 2']} 
                />
                <Tooltip 
                  formatter={(value) => [`${value}°C`, 'Temperature']}
                  labelFormatter={(label) => `Time: ${label}`}
                  contentStyle={{ 
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--border)',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-40 flex items-center justify-center text-muted-foreground">
              <p>No forecast data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };
  
  export default ForecastChart;
  
  
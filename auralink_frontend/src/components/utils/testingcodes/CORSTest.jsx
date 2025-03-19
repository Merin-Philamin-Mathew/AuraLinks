import React, { useState } from 'react';
import axios from 'axios';

const CorsTest = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // Use the exact same base URL as your main application
    const BASE_URL = 'http://localhost:8000/';
    
    const testSimpleGet = async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        
        try {
            // Simple GET without CSRF
            const response = await axios.get(`${BASE_URL}api/test-cors/`, {
                withCredentials: true,
            });
            
            setResult({
                status: response.status,
                data: response.data,
                headers: {
                    'content-type': response.headers['content-type'],
                    'access-control-allow-origin': response.headers['access-control-allow-origin'],
                    'access-control-allow-credentials': response.headers['access-control-allow-credentials']
                }
            });
        } catch (err) {
            setError({
                message: err.message,
                response: err.response ? {
                    status: err.response.status,
                    data: err.response.data,
                    headers: err.response.headers
                } : 'No response received'
            });
            console.error('CORS Test Error:', err);
        } finally {
            setLoading(false);
        }
    };
    
    const testSimplePost = async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        
        try {
            // Simple POST without CSRF
            const response = await axios.post(`${BASE_URL}api/auth/test-cors/`, 
                { testData: 'Testing CORS with POST' },
                {
                    withCredentials: true,

                }
            );
            
            setResult({
                status: response.status,
                data: response.data,
                headers: {
                    'content-type': response.headers['content-type'],
                    'access-control-allow-origin': response.headers['access-control-allow-origin'],
                    'access-control-allow-credentials': response.headers['access-control-allow-credentials']
                }
            });
        } catch (err) {
            setError({
                message: err.message,
                response: err.response ? {
                    status: err.response.status,
                    data: err.response.data,
                    headers: err.response.headers
                } : 'No response received'
            });
            console.error('CORS Test Error:', err);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>CORS Testing Tool</h2>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button 
                    onClick={testSimpleGet}
                    disabled={loading}
                    style={{ padding: '8px 16px' }}
                >
                    Test GET Request
                </button>
                
                <button 
                    onClick={testSimplePost}
                    disabled={loading}
                    style={{ padding: '8px 16px' }}
                >
                    Test POST Request
                </button>
            </div>
            
            {loading && <p>Loading...</p>}
            
            {error && (
                <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #f88', backgroundColor: '#fee', borderRadius: '4px' }}>
                    <h3>Error Occurred</h3>
                    <p><strong>Message:</strong> {error.message}</p>
                    <details>
                        <summary>Response Details</summary>
                        <pre>{JSON.stringify(error.response, null, 2)}</pre>
                    </details>
                </div>
            )}
            
            {result && (
                <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #8f8', backgroundColor: '#efe', borderRadius: '4px' }}>
                    <h3>Success! Status: {result.status}</h3>
                    <h4>Response Headers:</h4>
                    <pre>{JSON.stringify(result.headers, null, 2)}</pre>
                    <h4>Response Data:</h4>
                    <pre>{JSON.stringify(result.data, null, 2)}</pre>
                </div>
            )}
            
            <div style={{ marginTop: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <h3>How to check for CORS errors:</h3>
                <ol>
                    <li>Press F12 to open browser developer tools</li>
                    <li>Go to the Console tab to see any CORS errors</li>
                    <li>Go to the Network tab to examine the request/response headers</li>
                    <li>Look for the "Access-Control-Allow-Origin" header in responses</li>
                    <li>Check if preflight OPTIONS requests are present and successful</li>
                </ol>
            </div>
        </div>
    );
};

export default CorsTest;
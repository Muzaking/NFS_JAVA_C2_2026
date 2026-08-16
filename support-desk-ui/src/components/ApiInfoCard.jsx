import { useState, useEffect } from 'react';
import { fetchApiInfo } from '../services/api';

export default function ApiInfoCard() {
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadInfo() {
      try {
        setIsLoading(true);
        const data = await fetchApiInfo();
        setInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadInfo();
  }, []);

  if (isLoading) {
    return (
      <div style={{ padding: '10px', backgroundColor: '#555', marginBottom: '20px', borderRadius: '4px' }}>
        ⏳ Loading API Information...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '10px', backgroundColor: '#8b0000', color: 'white', marginBottom: '20px', borderRadius: '4px' }}>
        ❌ Error: {error}
      </div>
    );
  }

  return (
    <div style={{ padding: '10px', backgroundColor: '#2e8b57', color: 'white', marginBottom: '20px', borderRadius: '4px' }}>
      ✅ <strong>Connected to Backend:</strong> {info.name} (v{info.version})
    </div>
  );
}
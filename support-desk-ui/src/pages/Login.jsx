import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  // Pre-fill with the seeded backend credentials
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin@12345');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth(); // Grab the login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Call the login function from AuthContext
    const success = await login(email, password);
    
    if (success) {
      // If backend returns a token, redirect to dashboard
      navigate('/app/dashboard');
    } else {
      setError('Invalid email or password. Is the Java backend running?');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', backgroundColor: '#2a2a2a', color: 'white', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center' }}>Login to Support Desk</h1>
      
      {error && <div style={{ color: '#ff6b6b', backgroundColor: '#4a1515', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }}
            required 
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }}
            required 
          />
        </div>
        
        <button type="submit" style={{ padding: '12px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
          Login
        </button>
      </form>

      <div style={{ marginTop: '20px', fontSize: '0.9em', color: '#aaa', textAlign: 'center' }}>
        <p>Seeded admin:</p>
        <p>email: admin@example.com</p>
        <p>password: Admin@12345</p>
      </div>
    </div>
  );
}
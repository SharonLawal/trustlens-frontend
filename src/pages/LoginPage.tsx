import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { Loader2, ShieldCheck } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If user is already authenticated, redirect to dashboard
  if (authService.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // --- MOCK LOGIN (for hackathon) ---
    // Remove this block to use the real API
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email === "admin@trustlens.com" && password === "password") {
      // Manually set auth
      useAuthStore.getState().setAuth("fake-jwt-token", {
        id: 1, name: "Admin User", email: "admin@trustlens.com", role: "super_admin"
      });
      navigate('/', { replace: true });
      return;
    }
    // --- END MOCK LOGIN ---
    
    // --- REAL LOGIN (uncomment for production) ---
    // const success = await authService.login({
    //   username: email, // Backend expects 'username'
    //   password: password,
    // });
    // setLoading(false);
    // if (success) {
    //   navigate('/', { replace: true });
    // } else {
    //   setError('Invalid email or password. Please try again.');
    // }
    // --- END REAL LOGIN ---

    setLoading(false);
    setError('Invalid email or password. Please try again.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div>
          <ShieldCheck className="mx-auto h-12 w-auto text-blue-600" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            TrustLens Portal
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full rounded-t-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full rounded-b-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          
          <div className='text-xs text-center text-gray-500'>
            (Use <b className='text-gray-700'>admin@trustlens.com</b> and <b className='text-gray-700'>password</b> to demo)
          </div>

          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-blue-600 py-2.5 px-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
            >
              {loading && (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              )}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
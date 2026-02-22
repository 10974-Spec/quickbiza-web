import { useState } from 'react';
import { Store, Loader2, ArrowRight, Check } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useTheme } from '@/context/ThemeContext';

// For web app, we point to the backend URL. 
// In development this might be localhost:5000, in prod it's the server URL.
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://quickbiza-api.onrender.com/api' : 'http://localhost:5000/api');

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [launched, setLaunched] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState('');
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { primaryColor } = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username: formData.username,
                password: formData.password,
                source: 'web'
            });
            const { token, user } = response.data;
            toast.success('Login Successful! Opening App...');

            // Construct Deep Link to open the Desktop App
            const url = `quickbiza://login?token=${token}&username=${user.username}&userId=${user.id}`;
            setRedirectUrl(url);

            // Attempt to open automatically
            window.location.href = url;

            setLoading(false);
            setLaunched(true);
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.error || 'Login failed');
            setLoading(false);
        }
    };

    const pageStyle: React.CSSProperties = {
        height: '100vh',
        background: 'var(--background)',
        color: 'var(--foreground)',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflow: 'hidden',
    };

    const sharedStyles = `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
            --background: #f0ede8;
            --foreground: #18181b;
            --primary: ${primaryColor};
            --muted-foreground: #71717a;
            --border: #e4e4e7;
        }

        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.45s ease forwards; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }

        @keyframes bounceIn {
            0%   { transform: scale(0.6); opacity: 0; }
            60%  { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
        }
        .check-circle { animation: bounceIn 0.5s ease forwards; }

        /* Nav */
        .nav-bar {
            width: 100%; max-width: 900px;
            display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 12px; flex-shrink: 0;
        }
        .nav-logo { display: flex; align-items: center; gap: 8px; }
        .nav-logo-icon {
            width: 26px; height: 26px; background: var(--foreground);
            border-radius: 6px; display: flex; align-items: center; justify-content: center;
        }
        .nav-logo-text { font-size: 13px; font-weight: 700; color: var(--foreground); letter-spacing: -0.02em; }
        .nav-tag {
            font-size: 11px; font-weight: 600; color: var(--muted-foreground);
            background: #fff; border: 1px solid var(--border);
            border-radius: 20px; padding: 4px 12px;
        }

        /* Two-panel card */
        .card {
            width: 100%; max-width: 900px;
            background: #fff;
            border: 1px solid #e2ddd8;
            border-radius: 20px;
            display: flex; overflow: hidden;
            box-shadow: 0 12px 48px rgba(0,0,0,0.1);
            flex: 1; min-height: 0;
        }

        /* LEFT */
        .left {
            width: 380px; flex-shrink: 0;
            background: #f5f1ec;
            padding: 44px 40px;
            display: flex; flex-direction: column;
            justify-content: space-between;
            border-right: 1px solid #e8e3dd;
            position: relative; overflow: hidden;
        }
        .left-top {}
        .left-tag {
            display: inline-flex; align-items: center;
            border: 1.5px solid var(--foreground);
            border-radius: 20px; padding: 5px 14px;
            font-size: 12px; font-weight: 600; color: var(--foreground);
            margin-bottom: 28px;
        }
        .left-title {
            font-size: 52px; font-weight: 800;
            color: var(--foreground); line-height: 1.0;
            letter-spacing: -0.04em; margin-bottom: 20px;
        }
        .left-sub {
            font-size: 13px; color: var(--muted-foreground); line-height: 1.65;
            max-width: 280px;
        }
        .left-bottom {
            display: flex; align-items: center; gap: 12px; margin-top: 32px;
        }
        .avatar-stack { display: flex; }
        .avatar {
            width: 30px; height: 30px; border-radius: 50%;
            border: 2px solid #f5f1ec;
            margin-left: -8px; overflow: hidden;
            display: flex; align-items: center; justify-content: center;
            font-size: 11px; font-weight: 700; color: #fff;
        }
        .avatar:first-child { margin-left: 0; }
        .left-social-text { font-size: 11px; color: var(--muted-foreground); font-weight: 500; line-height: 1.4; }
        .left-social-text strong { color: var(--foreground); }

        /* Decorative circle */
        .deco-circle {
            position: absolute;
            width: 260px; height: 260px;
            border-radius: 50%;
            border: 1px solid rgba(0,0,0,0.06);
            bottom: -80px; right: -80px;
            pointer-events: none;
        }
        .deco-circle-2 {
            position: absolute;
            width: 180px; height: 180px;
            border-radius: 50%;
            border: 1px solid rgba(0,0,0,0.06);
            bottom: -40px; right: -40px;
            pointer-events: none;
        }

        /* RIGHT */
        .right {
            flex: 1; padding: 44px 44px;
            display: flex; flex-direction: column; justify-content: center;
            overflow: hidden;
        }
        .right-heading {
            font-size: 13px; font-weight: 700; color: #a1a1aa;
            letter-spacing: 0.06em; text-transform: uppercase;
            margin-bottom: 28px;
        }

        .field-label {
            font-size: 13px; font-weight: 500; color: #52525b;
            margin-bottom: 6px;
        }
        .text-input {
            width: 100%; padding: 0 0 10px 0;
            background: transparent;
            border: none; border-bottom: 1.5px solid #d4d0cb;
            font-size: 14px; font-family: 'DM Sans', sans-serif;
            color: var(--foreground); outline: none;
            transition: border-color 0.2s;
        }
        .text-input::placeholder { color: #c4c0bb; }
        .text-input:focus { border-bottom-color: var(--foreground); }
        .field-group { margin-bottom: 22px; }

        .btn-black {
            width: 100%; padding: 16px 24px;
            background: var(--foreground); color: #fff; border: none;
            border-radius: 50px; font-size: 15px; font-weight: 700;
            font-family: 'DM Sans', sans-serif; cursor: pointer;
            display: flex; align-items: center; justify-content: center; gap: 10px;
            transition: background 0.2s, transform 0.15s;
            margin-top: 8px;
        }
        .btn-black:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .btn-black:disabled { opacity: 0.55; cursor: not-allowed; }

        .form-footer {
            margin-top: 16px; text-align: center;
            font-size: 12px; color: #a1a1aa;
        }
        .form-footer a {
            color: var(--foreground); font-weight: 700;
            text-decoration: underline; text-underline-offset: 2px;
        }
    `;

    /* ── LAUNCHED STATE ── */
    if (launched) {
        return (
            <div style={pageStyle}>
                <style>{sharedStyles}</style>
                <div className="nav-bar fade-up">
                    <div className="nav-logo">
                        <div className="nav-logo-icon"><Store size={13} color="var(--background)" /></div>
                        <span className="nav-logo-text">QuickBiza POS</span>
                    </div>
                    <span className="nav-tag">Cloud Portal</span>
                </div>

                <div className="card fade-up" style={{ maxWidth: 500, flex: 'none', padding: '56px 48px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div className="check-circle" style={{
                        width: 68, height: 68, borderRadius: '50%',
                        background: '#f0fdf4', border: '2px solid #bbf7d0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 22px',
                    }}>
                        <Check size={30} color="#16a34a" />
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em', marginBottom: 8 }}>
                        Welcome Back!
                    </h2>
                    <p style={{ fontSize: 13, color: 'var(--muted-foreground)', marginBottom: 32, lineHeight: 1.6 }}>
                        Login successful. Click below to open the application.
                    </p>
                    <button
                        onClick={() => window.location.href = redirectUrl}
                        className="btn-black"
                        style={{ borderRadius: '50px' }}
                    >
                        <Check size={16} /> Launch QuickBiza POS
                    </button>
                </div>

                <p style={{ marginTop: 16, fontSize: 11, color: '#b5b0aa', fontWeight: 500 }}>© 2026 Nemtel Systems</p>
            </div>
        );
    }

    /* ── LOGIN FORM ── */
    return (
        <div style={pageStyle}>
            <style>{sharedStyles}</style>

            {/* Nav */}
            <div className="nav-bar fade-up">
                <div className="nav-logo">
                    <div className="nav-logo-icon"><Store size={13} color="var(--background)" /></div>
                    <span className="nav-logo-text">QuickBiza POS</span>
                </div>
                <span className="nav-tag">Cloud Portal</span>
            </div>

            {/* Card */}
            <div className="card fade-up">

                {/* LEFT */}
                <div className="left">
                    <div className="left-top">
                        <div className="left-tag">Sign in</div>
                        <h1 className="left-title">Let's get<br />started</h1>
                        <p className="left-sub">
                            Access your QuickBiza dashboard and manage your retail business from anywhere.
                        </p>
                    </div>

                    <div className="left-bottom">
                        <div className="avatar-stack">
                            {/* Dynamic Avatars */}
                            <div className="avatar" style={{ background: primaryColor }}>S</div>
                            <div className="avatar" style={{ background: 'var(--foreground)' }}>N</div>
                            <div className="avatar" style={{ background: '#71717a' }}>M</div>
                        </div>
                        <div className="left-social-text">
                            <strong>2,400+ businesses</strong><br />trust QuickBiza daily
                        </div>
                    </div>

                    {/* Decorative circles */}
                    <div className="deco-circle" />
                    <div className="deco-circle-2" />
                </div>

                {/* RIGHT */}
                <div className="right">
                    <p className="right-heading">Your credentials</p>

                    <form onSubmit={handleSubmit}>
                        <div className="field-group">
                            <div className="field-label">Username *</div>
                            <input
                                required
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="text-input"
                            />
                        </div>

                        <div className="field-group">
                            <div className="field-label">Password *</div>
                            <input
                                required
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="text-input"
                            />
                        </div>

                        <button type="submit" disabled={loading} className="btn-black">
                            {loading
                                ? <Loader2 size={16} className="spin" />
                                : <><span>Sign in</span><ArrowRight size={16} /></>
                            }
                        </button>

                        <p className="form-footer" style={{ marginTop: 14 }}>
                            By signing in, you agree to our <a href="#">terms &amp; conditions</a>.
                        </p>

                        <p className="form-footer" style={{ marginTop: 10 }}>
                            No account yet?{' '}
                            <a href="/register">Create a company</a>
                        </p>
                    </form>
                </div>
            </div>

            <p style={{ marginTop: 14, fontSize: 11, color: '#b5b0aa', fontWeight: 500 }}>© 2026 Nemtel Systems</p>
        </div>
    );
};

export default Login;
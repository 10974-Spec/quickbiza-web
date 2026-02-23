import { useState, useEffect } from 'react';
import { Store, ArrowRight, Loader2, Check } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

// Use environment variable for API URL or default based on environment
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://quickbizabackend.onrender.com/api' : 'http://localhost:5000/api');

const Register = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [launched, setLaunched] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState('');
    const [formData, setFormData] = useState({
        name: '', business_type: 'bakery', email: '', phone: '', address: '',
        adminName: '', username: '', password: '', confirmPassword: '',
    });
    const [logs, setLogs] = useState<string[]>([]);
    const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);

    useEffect(() => { console.log('WebRegister Mounted'); }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleNext = (e: React.FormEvent) => { e.preventDefault(); setStep(2); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setLogs([]);
        addLog('Starting registration...');
        try {
            if (formData.password !== formData.confirmPassword) throw new Error('Passwords do not match');
            addLog('Step 1: Creating Company...');
            const companyRes = await axios.post(`${API_URL}/setup/company`, {
                name: formData.name, business_type: formData.business_type,
                email: formData.email, phone: formData.phone, address: formData.address,
                primary_color: '#eab308', theme: 'default',
            }, { timeout: 15000 });
            if (!companyRes.data.success) throw new Error(companyRes.data.error || 'Company creation failed');
            addLog('Step 2: Creating Admin...');
            const adminRes = await axios.post(`${API_URL}/setup/admin`, {
                username: formData.username, password: formData.password, fullName: formData.adminName,
            }, { timeout: 15000 });
            if (!adminRes.data.success) throw new Error(adminRes.data.error || 'Admin creation failed');
            addLog('Step 3: Logging in...');
            const loginRes = await axios.post(`${API_URL}/auth/login`, {
                username: formData.username, password: formData.password, source: 'web'
            }, { timeout: 15000 });
            const token = loginRes.data.token;
            const userId = loginRes.data.user.id;
            toast.success('Account Created! Proceeding to Licensing...');

            // Redirect to License Page within the Web App
            // We use window.location here or navigate if using router hook (will update to use navigate next)
            // For now, let's just use the href to the new internal license route
            window.location.href = `/license?token=${token}&username=${formData.username}&userId=${userId}&companyId=${companyRes.data.cloud_id || ''}`;

            setLoading(false);
        } catch (error: any) {
            const msg = error.response?.data?.error || error.message || 'Setup failed';
            addLog(`ERROR: ${msg}`);
            toast.error(msg);
            setLoading(false);
        }
    };

    const pageWrap: React.CSSProperties = {
        height: '100vh',
        background: '#f5f5f0',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '16px', overflow: 'hidden',
    };

    const css = `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
            from { opacity:0; transform:translateY(14px); }
            to   { opacity:1; transform:translateY(0); }
        }
        .fade-up { animation: fadeUp 0.4s ease forwards; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }

        @keyframes bounceIn {
            0%  { transform:scale(0.6); opacity:0; }
            60% { transform:scale(1.15); opacity:1; }
            100%{ transform:scale(1); }
        }
        .check-anim { animation: bounceIn 0.5s ease forwards; }

        /* Nav */
        .nav-bar {
            width:100%; max-width:980px;
            display:flex; align-items:center; justify-content:space-between;
            margin-bottom:12px; flex-shrink:0;
        }
        .nav-logo { display:flex; align-items:center; gap:8px; }
        .nav-logo-icon {
            width:28px; height:28px; background:#18181b;
            border-radius:7px; display:flex; align-items:center; justify-content:center;
        }
        .nav-logo-text { font-size:14px; font-weight:700; color:#18181b; letter-spacing:-0.02em; }
        .nav-pill {
            font-size:11px; font-weight:600; color:#52525b;
            background:#fff; border:1px solid #e4e4e7;
            border-radius:20px; padding:5px 14px;
        }

        /* Card */
        .card {
            width:100%; max-width:980px;
            background:#fff; border:1px solid #e4e0d8;
            border-radius:22px; display:flex; overflow:hidden;
            box-shadow:0 16px 56px rgba(0,0,0,0.09);
            flex:1; min-height:0;
        }

        /* LEFT */
        .left {
            width:360px; flex-shrink:0;
            background:#fcbf49;
            padding:44px 40px;
            display:flex; flex-direction:column; justify-content:space-between;
            border-right:1px solid #e4e0d8;
            position:relative; overflow:hidden;
        }
        .left-top {}
        .left-tag {
            display:inline-flex;
            border:1.5px solid #18181b;
            border-radius:20px; padding:5px 16px;
            font-size:12px; font-weight:700; color:#18181b;
            margin-bottom:28px;
        }
        .left-title {
            font-size:48px; font-weight:800; color:#18181b;
            line-height:1.0; letter-spacing:-0.04em; margin-bottom:18px;
        }
        .left-sub { font-size:13px; color:#71717a; line-height:1.7; max-width:260px; }

        /* Steps */
        .steps { display:flex; flex-direction:column; gap:12px; margin-top:32px; }
        .step-row { display:flex; align-items:center; gap:10px; }
        .step-dot {
            width:24px; height:24px; border-radius:50%;
            border:1.5px solid #c9c5bc;
            display:flex; align-items:center; justify-content:center;
            font-size:10px; font-weight:700; color:#a1a1aa; flex-shrink:0;
            transition: all 0.2s;
        }
        .step-dot.active { background:#18181b; border-color:#18181b; color:#fff; }
        .step-dot.done   { background:#fcbf49; border-color:#fcbf49; color:#18181b; }
        .step-label { font-size:12px; font-weight:600; color:#a1a1aa; }
        .step-label.active { color:#18181b; }

        /* Bottom social */
        .left-bottom { display:flex; align-items:center; gap:12px; }
        .avatar-stack { display:flex; }
        .avatar {
            width:30px; height:30px; border-radius:50%;
            border:2px solid #fcbf49; margin-left:-8px;
            display:flex; align-items:center; justify-content:center;
            font-size:10px; font-weight:700; color:#18181b; flex-shrink:0;
        }
        .avatar:first-child { margin-left:0; }
        .social-text { font-size:11px; color:#71717a; line-height:1.5; }
        .social-text strong { color:#18181b; }

        /* Deco */
        .deco { position:absolute; border-radius:50%; border:1px solid rgba(0,0,0,0.05); pointer-events:none; }

        /* RIGHT */
        .right {
            flex:1; padding:44px 52px;
            display:flex; flex-direction:column; overflow-y:auto;
        }
        .step-label-top {
            font-size:11px; font-weight:700; letter-spacing:0.07em;
            text-transform:uppercase; color:#a1a1aa; margin-bottom:28px;
        }

        /* Underline fields */
        .fl { font-size:13px; font-weight:500; color:#52525b; margin-bottom:6px; }
        .ui {
            width:100%; padding:0 0 10px 0;
            background:transparent; border:none;
            border-bottom:1.5px solid #d4d0c8;
            font-size:14px; font-family:'DM Sans',sans-serif;
            color:#18181b; outline:none; transition:border-color 0.2s;
        }
        .ui::placeholder { color:#c4c0b8; }
        .ui:focus { border-bottom-color:#18181b; }
        .us {
            width:100%; padding:0 0 10px 0;
            background:transparent; border:none;
            border-bottom:1.5px solid #d4d0c8;
            font-size:14px; font-family:'DM Sans',sans-serif;
            color:#18181b; outline:none; appearance:none; cursor:pointer;
        }
        .fg { margin-bottom:22px; }
        .fr { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:22px; }

        /* Buttons */
        .btn-row { display:flex; gap:12px; margin-top:12px; }
        .btn-back {
            flex:1; padding:14px;
            background:#f0ede5; color:#18181b;
            border:1.5px solid #e4e0d8; border-radius:50px;
            font-size:13px; font-weight:700; font-family:'DM Sans',sans-serif;
            cursor:pointer; transition:background 0.2s;
        }
        .btn-back:hover { background:#e8e4dc; }
        .btn-primary {
            flex:2; padding:14px 24px;
            background:#18181b; color:#fff;
            border:none; border-radius:50px;
            font-size:14px; font-weight:700; font-family:'DM Sans',sans-serif;
            cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
            transition:background 0.2s;
        }
        .btn-primary:hover:not(:disabled) { background:#27272a; }
        .btn-primary:disabled { opacity:0.5; cursor:not-allowed; }

        /* Yellow accent on primary hover */
        .btn-yellow {
            flex:2; padding:14px 24px;
            background:#fcbf49; color:#18181b;
            border:none; border-radius:50px;
            font-size:14px; font-weight:700; font-family:'DM Sans',sans-serif;
            cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
            transition:background 0.2s;
        }
        .btn-yellow:hover { background:#eaaa26; }

        .fn { margin-top:14px; font-size:11px; color:#a1a1aa; text-align:center; }
        .fn a { color:#18181b; font-weight:700; text-decoration:underline; }
    `;

    const stepLabels = ['Company Details', 'Admin Setup'];

    /* ── LAUNCHED ── */
    if (launched) {
        return (
            <div style={pageWrap}>
                <style>{css}</style>
                <div className="nav-bar fade-up">
                    <a href="/" className="nav-logo" style={{ textDecoration: 'none' }}>
                        <div className="nav-logo-icon"><Store size={14} color="#fff" /></div>
                        <span className="nav-logo-text">QuickBiza POS</span>
                    </a>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <a href="/" className="nav-pill" style={{ textDecoration: 'none' }}>← Home</a>
                        <span className="nav-pill">Cloud Registration</span>
                    </div>
                </div>
                <div className="fade-up" style={{
                    background: '#fff', border: '1px solid #e4e0d8', borderRadius: 20,
                    padding: '52px 44px', textAlign: 'center', width: '100%', maxWidth: 380,
                    boxShadow: '0 16px 56px rgba(0,0,0,0.09)',
                }}>
                    <div className="check-anim" style={{
                        width: 68, height: 68, borderRadius: '50%',
                        background: '#fefce8', border: '2px solid #fde047',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 20px',
                    }}>
                        <Check size={30} color="#fcbf49" />
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: '#18181b', letterSpacing: '-0.03em', marginBottom: 8 }}>
                        Account Created!
                    </h2>
                    <p style={{ fontSize: 13, color: '#71717a', marginBottom: 28, lineHeight: 1.6 }}>
                        Your account is ready. Click below to open the application.
                    </p>
                    <button onClick={() => window.location.href = redirectUrl}
                        className="btn-yellow" style={{ flex: 'none', width: '100%' }}>
                        <Check size={16} /> Launch QuickBiza POS
                    </button>
                    <p style={{ marginTop: 12, fontSize: 11, color: '#d4d4d8' }}>You may close this window after launching.</p>
                </div>
                <p style={{ marginTop: 14, fontSize: 11, color: '#b5b0aa' }}>© 2026 Nemtel Systems</p>
            </div>
        );
    }

    /* ── MAIN FORM ── */
    return (
        <div style={pageWrap}>
            <style>{css}</style>

            {/* Nav */}
            <div className="nav-bar fade-up">
                <a href="/" className="nav-logo" style={{ textDecoration: 'none' }}>
                    <div className="nav-logo-icon"><Store size={14} color="#fff" /></div>
                    <span className="nav-logo-text">QuickBiza POS</span>
                </a>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <a href="/" className="nav-pill" style={{ textDecoration: 'none' }}>← Home</a>
                    <span className="nav-pill">Cloud Registration</span>
                </div>
            </div>

            {/* Card */}
            <div className="card fade-up">

                {/* LEFT */}
                <div className="left">
                    <div className="left-top">
                        <div className="left-tag">New Company</div>
                        <h1 className="left-title">Let's get<br />set up</h1>
                        <p className="left-sub">
                            Register your business on QuickBiza and start selling smarter in minutes.
                        </p>

                        <div className="steps">
                            {stepLabels.map((label, i) => {
                                const n = i + 1;
                                const isDone = step > n;
                                const isActive = step === n;
                                return (
                                    <div key={n} className="step-row">
                                        <div className={`step-dot${isDone ? ' done' : isActive ? ' active' : ''}`}>
                                            {isDone ? <Check size={11} /> : n}
                                        </div>
                                        <span className={`step-label${isActive ? ' active' : ''}`}>{label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="left-bottom">
                        <div className="avatar-stack">
                            {[['#eaaa26', 'S'], ['#18181b', 'N'], ['#a3a3a3', 'M'], ['#71717a', 'A']].map(([bg, l], i) => (
                                <div key={i} className="avatar" style={{ background: bg }}>{l}</div>
                            ))}
                        </div>
                        <div className="social-text">
                            <strong>2,400+ businesses</strong><br />trust QuickBiza daily
                        </div>
                    </div>

                    <div className="deco" style={{ width: 240, height: 240, bottom: -90, right: -90 }} />
                    <div className="deco" style={{ width: 150, height: 150, bottom: -45, right: -45 }} />
                </div>

                {/* RIGHT */}
                <div className="right">
                    <p className="step-label-top">
                        Step {step} of {stepLabels.length} — {stepLabels[step - 1]}
                    </p>

                    {/* STEP 1 */}
                    {step === 1 && (
                        <form onSubmit={handleNext}>
                            <div className="fg">
                                <div className="fl">Company Name *</div>
                                <input required name="name" type="text" value={formData.name}
                                    onChange={handleChange} placeholder="e.g. Nyakoe Supermarket" className="ui" />
                            </div>

                            <div className="fr">
                                <div>
                                    <div className="fl">Business Type *</div>
                                    <select name="business_type" value={formData.business_type}
                                        onChange={handleChange} className="us">
                                        <option value="bakery">Bakery</option>
                                        <option value="supermarket">Supermarket</option>
                                        <option value="hardware">Hardware</option>
                                        <option value="pharmacy">Pharmacy</option>
                                    </select>
                                </div>
                                <div>
                                    <div className="fl">Phone *</div>
                                    <input required name="phone" type="tel" value={formData.phone}
                                        onChange={handleChange} placeholder="07..." className="ui" />
                                </div>
                            </div>

                            <div className="fg">
                                <div className="fl">Email Address *</div>
                                <input required name="email" type="email" value={formData.email}
                                    onChange={handleChange} placeholder="business@example.com" className="ui" />
                            </div>

                            <div className="fg">
                                <div className="fl">Address</div>
                                <input name="address" type="text" value={formData.address}
                                    onChange={handleChange} placeholder="City, Street, Building" className="ui" />
                            </div>

                            <div className="btn-row">
                                <button type="submit" className="btn-yellow" style={{ flex: 1 }}>
                                    Next Step <ArrowRight size={15} />
                                </button>
                            </div>
                            <p className="fn">Already registered? <a href="/login">Sign in</a></p>
                        </form>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <form onSubmit={handleSubmit}>
                            <div className="fg">
                                <div className="fl">Admin Full Name *</div>
                                <input required name="adminName" type="text" value={formData.adminName}
                                    onChange={handleChange} placeholder="John Doe" className="ui" />
                            </div>

                            <div className="fg">
                                <div className="fl">Username *</div>
                                <input required name="username" type="text" value={formData.username}
                                    onChange={handleChange} placeholder="admin" className="ui" />
                            </div>

                            <div className="fr">
                                <div>
                                    <div className="fl">Password *</div>
                                    <input required name="password" type="password" value={formData.password}
                                        onChange={handleChange} placeholder="••••••••" className="ui" />
                                </div>
                                <div>
                                    <div className="fl">Confirm *</div>
                                    <input required name="confirmPassword" type="password" value={formData.confirmPassword}
                                        onChange={handleChange} placeholder="••••••••" className="ui" />
                                </div>
                            </div>

                            <div className="btn-row">
                                <button type="button" className="btn-back" onClick={() => setStep(1)}>Back</button>
                                <button type="submit" disabled={loading} className="btn-primary">
                                    {loading
                                        ? <><Loader2 size={15} className="spin" /> Processing...</>
                                        : <><span>Create Account</span><ArrowRight size={15} /></>
                                    }
                                </button>
                            </div>
                            <p className="fn">By registering, you agree to our <a href="/terms">terms &amp; conditions</a>.</p>
                        </form>
                    )}
                </div>
            </div>

            <p style={{ marginTop: 14, fontSize: 11, color: '#b5b0aa', fontWeight: 500 }}>
                © 2026 Nemtel Systems. Secure Cloud Registration.
            </p>
        </div>
    );
};

export default Register;
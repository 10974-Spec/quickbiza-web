
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, CreditCard, Download, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const License = () => {
    const [step, setStep] = useState(1); // 1: Select Plan, 2: Payment, 3: Success
    const [selectedPlan, setSelectedPlan] = useState('standard');
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [licenseKey, setLicenseKey] = useState('');

    const plans = [
        {
            id: 'basic',
            name: 'Starter',
            price: '2,500',
            features: ['Single User', 'Basic Inventory', 'Sales Tracking']
        },
        {
            id: 'standard',
            name: 'Professional',
            price: '5,000',
            features: ['5 Users', 'Advanced Inventory', 'Reports & Analytics', 'Email Support'],
            popular: true
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: '12,000',
            features: ['Unlimited Users', 'Multi-Branch', 'Fleet Management', 'Dedicated Support']
        }
    ];

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulating M-Pesa STK Push
        setTimeout(() => {
            setLoading(false);
            setStep(3);
            setLicenseKey(`AROMA-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now().toString().substring(8)}`);
            toast.success("Payment Received! License Generated.");
        }, 3000);
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([`SokoFlow License Key\n------------------\nKey: ${licenseKey}\nPlan: ${plans.find(p => p.id === selectedPlan)?.name}\nDate: ${new Date().toLocaleDateString()}`], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "sokoflow_license.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const t = params.get('token');
        const u = params.get('username');
        const uid = params.get('userId');
        if (t) setToken(t);
        if (u) setUsername(u);
        if (uid) setUserId(uid);
    }, []);

    const handleLaunch = () => {
        if (!licenseKey) return;
        // Include token and username in deep link for auto-login
        const launchUrl = `sokoflow://license-verified?key=${licenseKey}&token=${token}&username=${username}&userId=${userId}`;
        window.location.href = launchUrl;
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden border border-zinc-200 flex flex-col md:flex-row">

                {/* Visual Side */}
                <div className="bg-zinc-900 p-8 text-white md:w-1/3 flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold font-display mb-2">Secure Your Business</h1>
                        <p className="text-zinc-400 text-sm">Unlock the full potential of SokoFlow with a licensed plan.</p>
                    </div>
                    <div className="space-y-4 text-sm text-zinc-500 mt-8">
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>Secure Cloud Backup</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>Regular Updates</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>24/7 Priority Support</span>
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="p-8 md:w-2/3">
                    {step === 1 && (
                        <div>
                            <h2 className="text-xl font-bold mb-6">Select Your Plan</h2>
                            <div className="grid gap-4 mb-6">
                                {plans.map(plan => (
                                    <div
                                        key={plan.id}
                                        onClick={() => setSelectedPlan(plan.id)}
                                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedPlan === plan.id ? 'border-orange-500 bg-orange-50' : 'border-zinc-100 hover:border-zinc-200'}`}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold">{plan.name}</span>
                                            <span className="text-orange-600 font-bold">KES {plan.price}<span className="text-xs text-zinc-500 font-normal">/mo</span></span>
                                        </div>
                                        <div className="text-xs text-zinc-500">
                                            {plan.features.join(' • ')}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 mb-6">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreed}
                                    onChange={e => setAgreed(e.target.checked)}
                                    className="rounded border-zinc-300 text-orange-600 focus:ring-orange-500"
                                />
                                <label htmlFor="terms" className="text-xs text-zinc-500 select-none cursor-pointer">
                                    I agree to the <span className="text-orange-600 underline">Terms of Service</span> and <span className="text-orange-600 underline">Privacy Policy</span>.
                                </label>
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                disabled={!agreed}
                                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <form onSubmit={handlePayment}>
                            <h2 className="text-xl font-bold mb-6">Payment Details</h2>

                            <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg mb-6 flex items-start gap-3">
                                <div className="p-2 bg-white rounded-full text-orange-600 mt-1">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-orange-900 text-sm">M-Pesa Express</h3>
                                    <p className="text-xs text-orange-700 mt-1">
                                        Amount due: <span className="font-bold">KES {plans.find(p => p.id === selectedPlan)?.price}</span>
                                    </p>
                                    <p className="text-xs text-orange-700">
                                        A prompt will be sent to your phone.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-xs font-medium text-zinc-500 mb-1">M-Pesa Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                    className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg outline-none focus:border-orange-500 font-mono"
                                    placeholder="2547..."
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium py-3 rounded-lg transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || phoneNumber.length < 10}
                                    className="flex-[2] bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Pay Now
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                <Check className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-bold font-display text-zinc-900 mb-2">License Activated!</h2>
                            <p className="text-zinc-500 text-sm mb-8">
                                Your generic license key has been generated.
                            </p>

                            <div className="bg-zinc-100 p-4 rounded-lg font-mono text-center text-lg tracking-widest mb-8 border border-zinc-200 select-all">
                                {licenseKey}
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={handleDownload}
                                    className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-medium py-3 rounded-xl border border-zinc-200 flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Download License Copy
                                </button>

                                <button
                                    onClick={handleLaunch}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    Launch SokoFlow POS
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <p className="mt-8 text-zinc-400 text-xs">
                &copy; 2026 SokoFlow Systems.
            </p>
        </div>
    );
};

export default License;

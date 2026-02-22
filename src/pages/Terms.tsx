import { ArrowLeft, CheckCircle2 } from "lucide-react";

const Terms = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex justify-center py-12 px-4 transition-colors duration-300">
            <div className="w-full max-w-4xl bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border">

                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-border">
                    <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </a>
                    <h1 className="text-2xl font-bold tracking-tight">Terms & Conditions</h1>
                </div>

                {/* Content */}
                <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground dark:prose-invert">
                    <p className="lead text-lg text-foreground font-medium mb-8">
                        Welcome to QuickBiza. By registering a company and using our Point of Sale (POS) and Enterprise Resource Planning (ERP) software, you agree to comply with and be bound by the following terms and conditions.
                    </p>

                    <h3 className="text-foreground font-semibold text-xl mt-8 mb-4">1. Acceptance of Terms</h3>
                    <p className="mb-6">
                        By accessing or using QuickBiza cloud portals or downloadable assets, you confirm your acceptance of these terms. If you do not agree, please do not use our services.
                    </p>

                    <h3 className="text-foreground font-semibold text-xl mt-8 mb-4">2. Account Registration</h3>
                    <p className="mb-2">To use QuickBiza, you must register a company account and designate an administrator. You promise to:</p>
                    <ul className="space-y-2 mb-6 ml-4">
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" /> Provide accurate, current, and complete business information.</li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" /> Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" /> Promptly notify us if you discover any security breaches related to the service.</li>
                    </ul>

                    <h3 className="text-foreground font-semibold text-xl mt-8 mb-4">3. Data Privacy and Security</h3>
                    <p className="mb-6">
                        We value your privacy. Your inventory, sales, and employee data are securely processed. However, QuickBiza is not liable for data loss caused by local machine failure or improper sync operations. We encourage regular multi-device synchronization.
                    </p>

                    <h3 className="text-foreground font-semibold text-xl mt-8 mb-4">4. Payment Processing</h3>
                    <p className="mb-6">
                        When accepting payments (like M-Pesa or card transactions) through our webhooks, QuickBiza facilitates the transaction but does not hold your funds. A standard processing fee (e.g. 7%) may apply to digital transactions depending on your agreed licensing tier.
                    </p>

                    <h3 className="text-foreground font-semibold text-xl mt-8 mb-4">5. License Tiers and Restrictions</h3>
                    <p className="mb-6">
                        Certain modules (like Fleet Management or Room Booking) are gated by your active subscription tier. Attempting to bypass these restrictions or reverse engineer the electron application is strictly prohibited and will result in immediate termination of cloud access.
                    </p>

                    <h3 className="text-foreground font-semibold text-xl mt-8 mb-4">6. Changes to Terms</h3>
                    <p className="mb-8">
                        Nemtel Systems reserves the right to modify these terms at any time. We will notify users of significant changes via the admin dashboard. Continued use of the platform constitutes your acceptance of the updated terms.
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
                    <p>Last updated: February 2026</p>
                    <p>© 2026 Nemtel Systems. All rights reserved.</p>
                </div>

            </div>
        </div>
    );
};

export default Terms;

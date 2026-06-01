export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-ivory flex items-center justify-center p-6 antialiased">
            <div className="w-full max-w-md">
                {/* Brand Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rosegold to-rosegold-light rounded-xl mb-4 shadow-md shadow-rosegold/20">
                        <span className="text-white font-bold text-xl">K</span>
                    </div>
                    <h1 className="text-3xl font-bold font-serif tracking-tight text-text-dark">
                        KeNikahan
                    </h1>
                    <p className="text-text-muted text-sm mt-2 font-medium">
                        Platform undangan digital modern & elegan
                    </p>
                </div>
                {children}
                
                {/* Footer links */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-text-muted">
                        &copy; 2024 KeNikahan. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}
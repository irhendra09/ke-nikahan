export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-6 antialiased">
            <div className="w-full max-w-md">
                {/* Brand Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-black rounded-xl mb-4 shadow-sm">
                        <span className="text-white font-bold text-xl">N</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        KeNikahan
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">
                        Platform undangan digital modern & elegan
                    </p>
                </div>
                {children}
                
                {/* Footer links */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">
                        &copy; 2024 KeNikahan. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}
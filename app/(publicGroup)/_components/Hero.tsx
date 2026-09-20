// components/HeroSection.tsx
export default function HeroSection() {
    return (
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Main Hero Card */}
            <div className="relative bg-gradient-to-br from-[#0b1c2f] to-[#1a3a4a] rounded-[2.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-12 overflow-hidden shadow-2xl">

                {/* Background Decorations */}
                <div className="absolute -top-20 -right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6 sm:space-y-8">

                    {/* Main Heading */}
                    <div className="max-w-3xl">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
                            <i className="fas fa-key text-yellow-400 mr-2" />
                            Find your <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">dream rental</span> <br className="hidden sm:block" /> in minutes
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
                            Search homes, apartments, and other rental properties in one place.
                            Find a space that fits your needs and budget.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 sm:gap-12 pt-2 border-t border-white/10">
                        <div>
                            <div className="text-xl sm:text-2xl font-bold text-white">
                                <i className="fas fa-home text-yellow-400 mr-1" /> 12.4k+
                            </div>
                            <div className="text-sm text-white/60">Listings available</div>
                        </div>
                        <div>
                            <div className="text-xl sm:text-2xl font-bold text-white">
                                <i className="fas fa-star text-yellow-400 mr-1" /> 4.92
                            </div>
                            <div className="text-sm text-white/60">Average rating</div>
                        </div>
                        <div>
                            <div className="text-xl sm:text-2xl font-bold text-white">
                                <i className="fas fa-clock text-yellow-400 mr-1" /> 24/7
                            </div>
                            <div className="text-sm text-white/60">Support &amp; viewing</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
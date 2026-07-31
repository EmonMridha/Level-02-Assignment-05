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

                    {/* Top Navigation / Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <i className="fas fa-building text-2xl sm:text-3xl text-yellow-400 drop-shadow-lg" />
                            <span className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                                RentNest
                            </span>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
                            <a href="#" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-1 border-b border-transparent hover:border-yellow-400">
                                <i className="fas fa-heart" /> <span className="hidden sm:inline">Favorites</span>
                            </a>
                            <a href="#" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-1 border-b border-transparent hover:border-yellow-400">
                                <i className="fas fa-user" /> <span className="hidden sm:inline">Sign in</span>
                            </a>
                            <a href="#" className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/20 hover:border-yellow-400 transition-all text-sm font-medium flex items-center gap-2">
                                <i className="fas fa-plus-circle" /> List property
                            </a>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <div className="max-w-3xl">
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
                            <i className="fas fa-key text-yellow-400 mr-2" />
                            Find your <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">dream rental</span> <br className="hidden sm:block" /> in minutes
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
                            Discover curated homes, apartments, and villas. Verified listings, transparent pricing, and zero hidden fees.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-full p-1.5 sm:p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 max-w-3xl hover:bg-white/15 transition-colors shadow-lg">

                        <div className="flex items-center gap-2 px-4 py-2 sm:py-0 flex-1 border-b sm:border-b-0 sm:border-r border-white/10">
                            <i className="fas fa-map-pin text-yellow-400 text-lg" />
                            <input
                                type="text"
                                placeholder="City, neighborhood, or ZIP"
                                className="bg-transparent border-none outline-none text-white placeholder:text-white/50 w-full text-sm sm:text-base"
                            />
                        </div>

                        <div className="flex items-center gap-2 px-4 py-2 sm:py-0 flex-1 border-b sm:border-b-0 sm:border-r border-white/10">
                            <i className="fas fa-bed text-yellow-400 text-lg" />
                            <select className="bg-transparent border-none outline-none text-white w-full text-sm sm:text-base cursor-pointer">
                                <option value="" className="bg-[#1a3a4a]">Beds</option>
                                <option value="1" className="bg-[#1a3a4a]">1+</option>
                                <option value="2" className="bg-[#1a3a4a]">2+</option>
                                <option value="3" className="bg-[#1a3a4a]">3+</option>
                                <option value="4" className="bg-[#1a3a4a]">4+</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2 px-4 py-2 sm:py-0 flex-1">
                            <i className="fas fa-dollar-sign text-yellow-400 text-lg" />
                            <select className="bg-transparent border-none outline-none text-white w-full text-sm sm:text-base cursor-pointer">
                                <option value="" className="bg-[#1a3a4a]">Budget</option>
                                <option value="1000" className="bg-[#1a3a4a]">$1k</option>
                                <option value="2000" className="bg-[#1a3a4a]">$2k</option>
                                <option value="3000" className="bg-[#1a3a4a]">$3k</option>
                                <option value="5000" className="bg-[#1a3a4a]">$5k+</option>
                            </select>
                        </div>

                        <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-[#0b1c2f] font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30 flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap">
                            <i className="fas fa-search" /> Search
                        </button>
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
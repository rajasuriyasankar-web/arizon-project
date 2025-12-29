const Footer = () => {
    return (
        <footer className="bg-[#1a2442] text-white" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div className="max-w-[1200px] mx-auto px-4 py-3">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-2 flex-1">
                        <h3 className="text-[1.5rem] font-bold text-white whitespace-nowrap" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                            Subscribe Today
                        </h3>
                        <p className="text-[1rem] text-white leading-snug" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                            Be the first to know about exclusive deals, new product lines, company announcements, and industry news.
                        </p>
                    </div>

                    <div className="flex flex-shrink-0">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="px-4 py-2 text-[1rem] text-gray-600 placeholder:text-gray-400 focus:outline-none w-[220px] border-none"
                            style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
                        />
                        <button
                            type="button"
                            className="bg-[#d4a024] hover:bg-[#b08215] text-white px-5 py-2 font-bold uppercase text-[1rem] tracking-wide transition-colors whitespace-nowrap"
                            style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

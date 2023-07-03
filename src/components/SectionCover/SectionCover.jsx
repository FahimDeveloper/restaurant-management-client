const SectionCover = ({ img, heading, subheading }) => {
    return (
        <div className="hero min-h-[600px]" style={{ backgroundImage: `url("${img}")` }}>
            <div className="hero-overlay"></div>
            <div className="hero-content text-center text-white">
                <div className="max-w-md space-y-3">
                    <h2 className="text-4xl font-bold uppercase">{heading}</h2>
                    <p className="uppercase">{subheading}</p>
                </div>
            </div>
        </div >
    );
};

export default SectionCover;
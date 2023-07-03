

const SectionTitle = ({ subheading, heading }) => {
    return (
        <div className='space-y-2 w-1/2 mx-auto text-center'>
            <p className='text-secondary italic text-lg'>{subheading}</p>
            <h3 className='uppercase text-3xl font-medium border-y-2 py-2'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;
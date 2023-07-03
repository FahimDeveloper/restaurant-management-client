

const Container = ({ children }) => {
    return (
        <div className="max-w-[2520px] mx-auto 2xl:px-40 xl:32 lg:px-24 md:px-14 sm:px-10 px-5">
            {children}
        </div>
    );
};

export default Container;
import { ImSpinner3 } from "react-icons/im";

const Loading = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <ImSpinner3 className="text-5xl animate-spin text-secondary" />
        </div>
    );
};

export default Loading;
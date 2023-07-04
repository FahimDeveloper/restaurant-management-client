import Container from "../../../components/Shared/Container";
import authBanner from "../../../assets/others/authentication2.png"
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { signIn, continueWithGoogle, successLogin, authError } = useAuth();
    const onSubmit = data => {
        signIn(data.email, data.password).then(() => {
            successLogin();
        }).catch(error => authError(error.message))
    };
    const handleGoogle = () => {
        continueWithGoogle().then(() => {
            successLogin();
        }).catch(error => authError(error.message))
    }
    return (
        <div className="bg-gray-200 min-h-screen flex items-center">
            <Container>
                <div className="bg-white shadow-xl border w-full grid grid-cols-2 items-center gap-10 p-20 rounded-xl">
                    <div>
                        <img src={authBanner} className="w-full h-full" alt="authBanner" />
                    </div>
                    <div className="space-y-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <h3 className="text-center text-3xl font-medium">Sign In</h3>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register('email')} placeholder="Enter your email" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register('password')} placeholder="Enter your password" className="input input-bordered w-full" />
                            </div>
                            <div>
                                <button className="btn btn-secondary w-full mt-2">sign in</button>
                            </div>
                        </form>
                        <div className="text-center space-y-2">
                            <p className="text-secondary text-lg">New here? <Link to="/register" className="font-semibold">Create a New Account</Link></p>
                            <p>Or sign up with</p>
                            <FcGoogle onClick={handleGoogle} className="mx-auto text-3xl cursor-pointer" />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Login;
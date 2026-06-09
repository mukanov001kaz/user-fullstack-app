import HeaderTop from "@/components/Header/Header-top";
import { LoginForm } from "@/components/LoginForm/LoginForm";

const Login = () => {
    return (
        <div className="flex flex-col items-center min-h-screen bg-[url('/bg/bg.webp')] bg-cover bg-center bg-no-repeat">
            <HeaderTop />
            <div className="absolute top-1/2 -translate-y-1/2">
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;

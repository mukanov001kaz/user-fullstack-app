import HeaderTop from "@/components/Header/Header-top";
import { RegisterForm } from "@/components/RegisterForm/RegisterForm";

const Register = () => {
    return (
        <div className="relative flex flex-col items-center min-h-screen bg-[url('/bg/bg.webp')] bg-cover bg-center bg-no-repeat">
            <HeaderTop />
            <div className="absolute top-1/2 -translate-y-1/2">
                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;

import HeaderTop from "@/components/Header/Header-top";
import HeaderBottom from "@/components/Header/Header-bottom";

export default function Home() {
    return (
        <div className="relative min-h-screen">
            <div className="absolute inset-0 -z-10 bg-[url('/bg/bg.png')] bg-cover bg-center bg-no-repeat" />
            <div className="max-w-7xl mx-auto">
                <header>
                    <HeaderTop />
                    <HeaderBottom />
                </header>
            </div>
        </div>
    );
}

import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/">
            <h1 className="group text-3xl font-black">
                <span className="text-primary transition-colors duration-200 group-hover:text-rose-400">C</span>
                alorie
                <span className="text-primary transition-colors duration-200 group-hover:text-rose-400"> C</span>
                ounter
            </h1>
        </Link>
    );
} 
export default Logo;
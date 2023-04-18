interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function Button({ children, className, onClick }: ButtonProps) {
    return (
        <button className={`${className} px-3 py-2 font-bold rounded-md text-white transition-colors duration-200 transform bg-darker hover:bg-primary`}
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    )
}
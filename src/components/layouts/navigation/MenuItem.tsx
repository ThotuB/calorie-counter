interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}

export default function MenuItem({ icon, label, onClick }: MenuItemProps) {
    return (
        <div className="flex items-center w-full cursor-pointer p-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-purple-300 hover:text-darker"
            onClick={onClick}
        >
            {icon}
            <div className='mx-2'>
                {label}
            </div>
        </div>
    );
}
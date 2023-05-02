interface PrivateToggleButtonProps {
    children: React.ReactNode;
    value: string;
    selected: boolean;
    onClick: (value: string) => void;
}

interface ToggleButtonProps {
    children: React.ReactNode;
    value: string;
}

interface ToggleButtonGroupProps {
    children: React.ReactElement<ToggleButtonProps>[];
    value: string
    onChange: (value: string) => void;
}

export default class Toggle {
    static __Button({ children, value, selected, onClick }: PrivateToggleButtonProps) {
        return (
            <div className={`border-2 px-4 py-1 rounded-md ${selected ? 'bg-gray-100 cursor-default' : 'hover:bg-gray-100 cursor-pointer'} `}
                onClick={() => onClick(value)}
            >
                {children}
            </div>
        )
    }

    static Button({ children }: ToggleButtonProps) {
        return (
            <div className='border-2 px-4 py-1 rounded-md bg-gray-100 cursor-default'>
                {children}
            </div>
        )
    }

    static Group({ children, value, onChange }: ToggleButtonGroupProps) {
        const selected = value

        return (
            <>
                {children.map(({ props: { children, value } }) => (
                    <Toggle.__Button
                        key={value}
                        value={value}
                        selected={selected === value}
                        onClick={onChange}
                    >
                        {children}
                    </Toggle.__Button>
                ))}
            </>
        )
    }
}
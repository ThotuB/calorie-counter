import Router from 'next/router';

interface NavLinkProps {
    href: string;
    label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
    return (
        <button className="font-bold px-3 py-2 rounded-md transition-colors duration-200 transform hover:bg-primary hover:text-dark"
            type="button"
            onClick={() => Router.push(href)}
        >
            {label}
        </button>
    );
}
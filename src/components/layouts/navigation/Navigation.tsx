import NavLink from "./NavLink";
import SearchBar from "./Search";
import DropdownMenu from "./Menu";
import Logo from "@components/logo/Logo";

export default function Navigation() {
    return (
        <nav className="bg-dark text-white shadow sticky top-0 z-50">
            <div className="container px-6 py-3 mx-auto">
                <div className="grid grid-cols-3 flex-row justify-between items-center">
                    <Logo />

                    <div className="flex justify-center">
                        <SearchBar />
                    </div>

                    <div className="flex items-center gap-3">
                        <NavLink href="/" label='Home' />
                        <NavLink href="/food" label='Food' />
                        <NavLink href="/recipes" label='Recipes' />
                        <NavLink href='/' label='Login / Sign Up' />
                        <DropdownMenu />
                    </div>
                </div>
            </div>
        </nav>
    );
}

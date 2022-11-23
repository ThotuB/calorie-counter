import Navigation from './Navigation';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-primary to-purple-300">
            <Navigation />
            <main className="w-11/12 py-4 max-w-7xl m-auto flex flex-col gap-6 items-center">
                {children}
            </main>
        </div>
    );
}
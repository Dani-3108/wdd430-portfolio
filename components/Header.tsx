import NavLinks from './NavLinks';

export default function Header() {
    return (
        <header className="bg-[#043063] text-white py-4 shadow-md">
            <div className="flex justify-between items-center">
                <div id="header-title" className="text-2xl font-bold">Daniel Osorio</div>
                <NavLinks />
            </div>
        </header>
  );
}
import ThemeChanger from '../ui/ThemeChanger'

const Navbar = () => {
    return (
        <nav className='w-full py-2 px-5 flex items-center justify-between bg-primary sticky top-0 left-0 z-10'>
            <h1 className='headline-lg text-center text-white '>ShopDirect</h1>
            <ThemeChanger />
        </nav>
    )
}

export default Navbar
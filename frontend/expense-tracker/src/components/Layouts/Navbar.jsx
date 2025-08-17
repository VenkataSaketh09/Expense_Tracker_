import React, { useState, useEffect } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuTrendingUpDown } from "react-icons/lu";
import SideMenu from './SideMenu';

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    
    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setOpenSideMenu(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (openSideMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [openSideMenu]);
    
    return (
        <>
            {/* Main Navbar */}
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left Section - Menu Button & Logo */}
                        <div className="flex items-center space-x-4">
                            {/* Mobile Menu Button */}
                            <button 
                                onClick={() => setOpenSideMenu(!openSideMenu)}
                                className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                                aria-label="Toggle menu"
                            >
                                {openSideMenu ? (
                                    <HiOutlineX className='text-xl' />
                                ) : (
                                    <HiOutlineMenu className='text-xl' />
                                )}
                            </button>
                            
                            {/* Logo & Brand */}
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg">
                                    <LuTrendingUpDown className='text-white text-lg' />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 hidden sm:block">
                                    Expense Tracker
                                </h2>
                            </div>
                        </div>

                        {/* Right Section - User Actions */}
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar Overlay */}
            {openSideMenu && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                        onClick={() => setOpenSideMenu(false)}
                    ></div>
                    
                    {/* Sidebar */}
                    <div className={`fixed left-0 top-16 bottom-0 w-80 max-w-[80vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
                        openSideMenu ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                        <div className="h-full overflow-y-auto">
                            <SideMenu activeMenu={activeMenu} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
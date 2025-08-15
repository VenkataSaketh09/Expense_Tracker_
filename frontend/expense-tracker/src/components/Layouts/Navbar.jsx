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
                        <div className="flex items-center space-x-4">
                            {/* Notification Bell */}
                            <button className="p-2 rounded-xl text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 relative">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-3.5-3.5c-.5-.5-.5-1.3 0-1.8L20 8V6a6 6 0 10-12 0v2l3.5 3.2c.5.5.5 1.3 0 1.8L8 17h5m2 0v1a3 3 0 11-6 0v-1" />
                                </svg>
                                {/* Notification dot */}
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                            </button>

                            {/* Settings */}
                            <button className="p-2 rounded-xl text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>
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
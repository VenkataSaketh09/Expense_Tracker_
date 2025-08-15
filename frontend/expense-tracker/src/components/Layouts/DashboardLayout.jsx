import React, { useContext } from 'react'
import SideMenu from './SideMenu';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';

const DashboardLayout = ({activeMenu, children}) => {
    const {user} = useContext(UserContext)
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
            {/* Navbar */}
            <Navbar activeMenu={activeMenu} />
            
            {user && (
                <div className="flex">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block w-64 xl:w-72 fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-xl border-r border-gray-200 z-30">
                        <div className="h-full overflow-y-auto">
                            <SideMenu activeMenu={activeMenu} />
                        </div>
                    </div>
                    
                    {/* Main Content Area */}
                    <div className="flex-1 lg:ml-64 xl:ml-72">
                        <main className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
                            <div className="max-w-7xl mx-auto">
                                {/* Content wrapper with subtle background */}
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 p-6 lg:p-8">
                                    {children}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            )}
            
            {/* Loading state when no user */}
            {!user && (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-4 shadow-lg animate-pulse">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-gray-600 font-medium">Loading your dashboard...</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout
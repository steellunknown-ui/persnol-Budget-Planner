import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-light-bg-alt font-sans">
            <Sidebar />
            {/* The sidebar is fixed and its width changes from w-20 to w-64. 
                We use pl-20 so main content doesn't snap, layout stays fluid behind the hover. */}
            <div className="flex-1 pl-20 flex flex-col min-h-screen transition-all duration-300 ease-in-out">
                <Topbar />

                {/* Main Content Area */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {/* Outlet is where the nested routes will render */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;

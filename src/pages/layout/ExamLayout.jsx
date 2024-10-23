import React from 'react';
import {Outlet} from "react-router-dom";
import Sidebar from "./sidebar/Sidebar.jsx";
import Header from "./Header.jsx";
import ModalLayout from "../../components/modal/ModalLayout.jsx";
import {Toaster} from "sonner";

const ExamLayout = () => {
    return (
        <>
            <div className={"drawer lg:drawer-open"}>
                <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content flex flex-col">
                    <Header/>
                    <main className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6 bg-base-200">
                        <Outlet/>
                    </main>
                </div>
                <Sidebar/>
            </div>
            <ModalLayout/>
            <Toaster position="top-right" richColors closeButton/>
        </>
    );
};

export default ExamLayout;
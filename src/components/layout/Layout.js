import React from "react";
import { Outlet } from "react-router-dom";

// __ __ Components/Helpers __ __ //
import Header from "../main/Header/Header";
import Footer from "../main/Footer/Footer";

const Layout = ({settings}) => {
    return (
        <>
            <Header settings={settings} />
            <Outlet />
            <Footer settings={settings} />
        </>
    );
};

export default Layout;
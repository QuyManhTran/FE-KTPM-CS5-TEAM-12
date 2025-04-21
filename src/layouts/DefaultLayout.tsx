import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <div className="mt-16 max-w-7xl mx-auto px-4">
                <Outlet />
            </div>
        </>
    );
};
export default DefaultLayout;

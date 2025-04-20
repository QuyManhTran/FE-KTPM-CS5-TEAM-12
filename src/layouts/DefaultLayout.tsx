import { Outlet } from "react-router-dom";
import Header from "../components/Header";

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

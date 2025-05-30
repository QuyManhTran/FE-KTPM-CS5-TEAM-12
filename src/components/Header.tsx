import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="fixed top-0 left-0 right-0 bg-[#222222] shadow z-50 h-16 flex items-center">
            <div
                className="px-4 flex flex-1 cursor-pointer"
                onClick={() => navigate("/")}
            >
                <h1 className="text-xl font-bold text-white">Github Ranking</h1>
            </div>
        </div>
    );
};
export default Header;

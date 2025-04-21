import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const navigateToTopRepositories = () => {
        navigate("/repositories");
    };

    return (
        <div className="flex flex-col py-12 px-16 bg-[#fafafa]">
            <h1 className="font-light text-[68px]">Github Star Ranking</h1>
            <h2 className="font-extralight text-2xl">
                Unofficial GitHub star ranking for users, organizations and
                repositories.
            </h2>
            <button
                className="w-fit py-4 px-3 my-4 bg-[#e7e7e7] cursor-pointer font-normal border border-transparent"
                onClick={navigateToTopRepositories}
            >
                Go to top Repositories {"->"}
            </button>
        </div>
    );
};

export default HomePage;

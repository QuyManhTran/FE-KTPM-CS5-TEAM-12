import DefaultLayout from "@/layouts/DefaultLayout";
import HomePage from "@/pages/HomePage";
import ReleasePage from "@/pages/ReleasePage";
import RepositoryPage from "@/pages/RepositoryPage";
import { useRoutes } from "react-router-dom";

const AppRouter = () => {
    const routes = useRoutes([
        {
            path: "",
            element: <DefaultLayout />,
            children: [
                {
                    path: "",
                    element: <HomePage />,
                },
                {
                    path: "repositories",
                    element: <RepositoryPage />,
                },
                {
                    path: "releases",
                    element: <ReleasePage />,
                },
            ],
        },
    ]);
    return routes;
};

export default AppRouter;

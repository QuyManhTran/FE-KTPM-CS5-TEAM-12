import DefaultLayout from "@/layouts/DefaultLayout";
import CommitPage from "@/pages/CommitPage";
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
                    path: "repositories/:user/:name/releases",
                    element: <ReleasePage />,
                },
                {
                    path: "repositories/:user/:name/:tag/commits",
                    element: <CommitPage />,
                },
            ],
        },
    ]);
    return routes;
};

export default AppRouter;

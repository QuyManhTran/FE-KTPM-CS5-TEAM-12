import { useRoutes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import HomePage from "../pages/HomePage";

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
                // {
                //     path: "explorer",
                //     element: <ExplorerPage />,
                // },
            ],
        },
    ]);
    return routes;
};

export default AppRouter;

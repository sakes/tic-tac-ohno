import {
    createBrowserRouter
} from "react-router-dom";

import App from '../components/pages/App/App.tsx'
import Login from '../components/pages/Login/Login.tsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/login",
        element: <Login/>
    }
]);

export default router;
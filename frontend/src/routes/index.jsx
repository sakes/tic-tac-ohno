import {
    createBrowserRouter
} from "react-router-dom";

import UnauthenticatedRoute from '../components/UnauthenticatedRoute.tsx';
import AuthenticatedRoute from '../components/AuthenticatedRoute.tsx';
import App from '../components/pages/App/App.tsx'
import Login from '../components/pages/Login/Login.tsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthenticatedRoute><App/></AuthenticatedRoute>
    },
    {
        path: "/login",
        element: <UnauthenticatedRoute><Login/></UnauthenticatedRoute>
    }
]);

export default router;
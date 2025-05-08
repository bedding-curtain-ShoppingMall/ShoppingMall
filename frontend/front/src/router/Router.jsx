import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";

const Router = () => {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    )
}

export default Router;

import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import AppEmptyLayout from "../../shared/layout/AppEmptyLayout";

const AuthRoutes:React.FC = () => {
    return (
        <AppEmptyLayout>
            <Routes>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </AppEmptyLayout>
    )
}
export default AuthRoutes;
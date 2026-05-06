import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import AuthCallback from "@/pages/AuthCallback";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth/callback" element={<AuthCallback/>}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </Router>
    );
}

export default App;

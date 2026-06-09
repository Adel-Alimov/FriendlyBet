import { Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/HomePage/HomePage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import { MatchPage } from "../../pages/MatchPage/MatchPage";
import { MyPredictionsPage } from "../../pages/MyPredictionsPage/MyPredictionsPage";
import { RankingPage } from "../../pages/RankingPage/RankingPage";
import { AdminPage } from "../../pages/AdminPage/AdminPage";
import { MatchesPage } from "../../pages/MatchesPage/MatchesPage";
import { RulesPage } from "../../pages/RulesPage/RulesPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/match/:id" element={<MatchPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/my-predictions" element={<MyPredictionsPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/rules" element={<RulesPage />} />
        </Routes>
    );
};

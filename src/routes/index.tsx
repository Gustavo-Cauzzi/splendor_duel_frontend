import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameList } from "../pages/GameList";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { BaseLayout } from "./layouts/BaseLayout";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="" element={<BaseLayout />}>
          <Route path="/games" element={<GameList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

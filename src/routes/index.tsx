import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameList } from "../pages/GameList";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { BaseLayout } from "./layouts/BaseLayout";
import Authentication from "./middlewares/Authentication";
import { CreateRoom } from "../pages/CreateRooms";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Authentication>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="" element={<BaseLayout />}>
            <Route path="/games" element={<GameList />} />
            <Route path="/games/create" element={<CreateRoom />} />
          </Route>
        </Routes>
      </Authentication>
    </BrowserRouter>
  );
};

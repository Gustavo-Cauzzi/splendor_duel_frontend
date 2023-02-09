import { Outlet } from "react-router-dom";
import { Header } from "../../shared/components/Header";

export const BaseLayout: React.FC = () => {
  return (
    <>
      <Header />

      <main className="py-5 px-4">
        <Outlet />
      </main>
    </>
  );
};

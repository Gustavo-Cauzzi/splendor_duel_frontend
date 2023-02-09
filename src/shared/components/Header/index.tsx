import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const isAuthenticated = true;

  const headerHeight = "h-[6rem]";

  return (
    <>
      <header
        className={`flex fixed bg-primary-600 items-center top-0 left-0 right-0 py-5 px-8 justify-between shadow-xl ${headerHeight}`}
      >
        <h2
          className="text-3xl text-white pointer font-bold"
          onClick={() => navigate("/games")}
        >
          Imperial Duel
        </h2>

        <div className="flex gap-5 max-w-sm items-center">
          <div className="flex flex-col items-end leading-[1.3]">
            <span className="text-white">
              {isAuthenticated ? "Gustavo Cauzzi" : "Log in"}
            </span>
            {isAuthenticated ? <span className="text-white">Lvl. 3</span> : ""}
          </div>

          <div className="p-2 rounded-full border-white border-2">
            <FiUser size={25} color="#FFF" />
          </div>
        </div>
      </header>
      <div className={headerHeight} />
    </>
  );
};

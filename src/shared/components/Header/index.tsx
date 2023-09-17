import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { UiUser } from "../../@types/User";
import { RootState } from "../../store/store";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const user = useSelector<RootState, UiUser | null>(
    (state) => state.auth.user
  );
  const isLogged = useSelector<RootState, boolean>(
    (state) => state.auth.isLogged
  );

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
              {isLogged ? user?.username : "Log in"}
            </span>
            {isLogged ? <span className="text-white">Lvl. 3</span> : ""}
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

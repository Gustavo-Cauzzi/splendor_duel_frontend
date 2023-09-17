import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="flex h-screen">
        <div className="flex flex-[0.6] items-center justify-center">
          <div className="max-w-[25rem] w-full aspect-square bg-primary-500 rounded-3xl flex justify-center items-center">
            Board irado emocionante que não está pronto
          </div>
        </div>
        <div className="flex flex-[0.4] px-4 items-center justify-center">
          <div className="flex flex-col gap-10 max-w-sm">
            <h1 className="text-6xl text-comic text-primary-700">
              Imperial Duel
            </h1>

            <span>
              An amazing board and strategy game to play against your friend
            </span>

            <Button variant="contained" onClick={() => navigate("/games")}>
              Play Now
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

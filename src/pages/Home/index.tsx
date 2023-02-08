import { TextField } from "@mui/material";

export const Home: React.FC = () => {
  return (
    <main>
      <div className="flex h-screen">
        <div className="flex flex-[0.6] items-center justify-center">
          <div className="max-w-[25rem] w-full aspect-square bg-wood rounded-3xl">
            Board irado emocionante que não está pronto
          </div>
        </div>
        <div className="flex flex-[0.4] px-4 items-center justify-center">
          <div className="flex flex-col gap-10 max-w-sm">
            <h1 className="text-6xl text-comic">Imperial Duel</h1>

            <span>
              An amazing board and strategy game to play against your friend
            </span>

            <TextField />
          </div>
        </div>
      </div>
    </main>
  );
};

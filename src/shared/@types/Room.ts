import { Game } from "./Game";
import { UUID } from "./general";

export interface Room {
  id: UUID;
  name: string;
  numberOfPlayers: number;
  game: Game;
  connectedPlayerIds: string[];
  leaderPlayerId: UUID;
}

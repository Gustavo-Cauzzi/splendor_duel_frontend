import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { UUID } from "../../shared/@types/general";
import { Room } from "../../shared/@types/Room";
import { api } from "../../shared/services/api";
import { useNavigate } from "react-router-dom";

export const GameList: React.FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await api.get("/rooms");
      setRooms(response.data);
      setIsLoading(false);
    };

    getData();
  }, []);

  const handleEnterRoom = (id: UUID) => {
    console.log("id: ", id);
  };

  useEffect(() => {
    console.log("rooms", rooms);
  }, [rooms]);

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <div className="flex flex-col gap-2 items-center">
          <CircularProgress size={36} color="primary" />
          <span className="text-primary">Buscando salas...</span>
        </div>
      ) : rooms.length === 0 ? (
        <div className="flex items-center flex-col gap-2 text-xl text-primary mt-6">
          Não há nenhuma sala criada
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate("/games/create")}
          >
            Criar uma sala!
          </Button>
        </div>
      ) : (
        <Table className="max-w-sm">
          <TableHead>
            <TableRow>
              <TableCell>Nome da sala</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.name}</TableCell>
                <TableCell>
                  <Button
                    endIcon={<FiExternalLink />}
                    onClick={() => handleEnterRoom(room.id)}
                  >
                    Entrar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

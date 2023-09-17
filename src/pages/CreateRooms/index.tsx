import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../shared/store/store";
import { toast } from "react-hot-toast";
import { api } from "../../shared/services/api";
import { useNavigate } from "react-router-dom";
import { Room } from "../../shared/@types/Room";

interface FormValues {
  name: string;
}

export const CreateRoom: React.FC = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  });

  const username = useSelector<RootState, string | undefined>(
    (state) => state.auth.user?.username
  );

  const sugestion = `${username ?? "Someone"}'s game`;

  const handleCreateRoom = async (data: FormValues) => {
    const tid = toast.loading("Creating room...");
    try {
      const response = await api.post<Room>("/rooms", { name: data.name });
      console.log("response.data: ", response.data);
      navigate("/games/" + response.data.id);
    } catch (e) {
      toast.error("It was not possible to create the room");
    } finally {
      toast.dismiss(tid);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateRoom)}
      className="flex flex-col gap-4 items-start"
    >
      <h2 className="text-primary text-3xl font-bold">Create a room</h2>
      <div className="flex flex-col gap-4 pl-4 ">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              className="max-w-[15rem]"
              {...field}
              placeholder={sugestion}
              label="Room name"
              onKeyDown={(e) =>
                e.key === "Tab" &&
                field.value === "" &&
                field.onChange(sugestion)
              }
            />
          )}
        />
      </div>
      <Button type="submit" variant="contained">
        Create
      </Button>
    </form>
  );
};

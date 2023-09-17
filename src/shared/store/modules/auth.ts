import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAfter } from "date-fns";
import jwtDecode from "jwt-decode";
import { Socket, io } from "socket.io-client";
import { v4 } from "uuid";
import { UiUser } from "../../@types/User";
import { APP_LOCAL_STORAGE } from "../../Constants";
import { api } from "../../services/api";
import { RootState } from "../store";

const fakeLogin = async (username: string, id: string) => {
  type Response = { token: string };
  const response = await api.post<Response>("/users/fakeLogin", {
    username,
    id,
  });
  return response.data.token;
};
const createFakeUser = async () => {
  const user = {
    isFakeUser: true,
    username: `User ${Date.now() % 10000}`,
    id: v4(),
  } as const;
  return {
    jwt: await fakeLogin(user.username, user.id),
    user,
  };
};

type JWTPayload = UiUser & {
  expirationDate: Date;
};
export const getLoggedUser = createAsyncThunk(
  "app/auth/getLoggedUser",
  async () => {
    const generateFakeAuth = async () => {
      const fakeUserInfo = await createFakeUser();

      localStorage.setItem(APP_LOCAL_STORAGE.jwt, fakeUserInfo.jwt);
      api.defaults.headers.authorization = `Baerer ${fakeUserInfo.jwt}`;
      return fakeUserInfo.user;
    };

    const jwt = localStorage.getItem(APP_LOCAL_STORAGE.jwt);
    if (!jwt) return await generateFakeAuth();
    api.defaults.headers.authorization = `Baerer ${jwt}`;

    const jwtPayload = jwtDecode(jwt) as JWTPayload;

    if (isAfter(new Date(), jwtPayload.expirationDate)) {
      console.log("JWT Expirado");
      // TODO: refresh token se for usuário real...
      // maybe... idk... ou manda logar dnv
      return await generateFakeAuth();
    }

    console.log("jwtPayload: ", jwtPayload);

    return jwtPayload;
  }
);

export const connectSokect = createAsyncThunk(
  "app/auth/conectoSocket",
  async () => {
    const jwt = localStorage.getItem(APP_LOCAL_STORAGE.jwt);
    if (!jwt)
      throw new Error("User not logged in. It's not possible to log in");
    const socket = io("ws://localhost:3333", {
      auth: {
        Authorization: `Baerer ${jwt}`,
      },
    });

    socket.on("connect", () => {
      console.log("Socket novo conectado");
    });

    return socket as Socket;
  },
  { condition: (_arg, api) => (api.getState() as RootState).auth.isLogged }
);

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};

export const authSlice = createSlice({
  name: "app/auth",
  initialState: {
    isLogged: false,
    user: null as null | UiUser,
    socket: null as null | Socket,
  },
  reducers: {
    // actionQualquer(state, action: PayloadAction) {},
  },
  extraReducers(builder) {
    builder.addCase(connectSokect.fulfilled, (state, action) => {
      state.socket = action.payload as any;
    });
    builder.addCase(getLoggedUser.fulfilled, (state, action) => {
      state.isLogged = true;
      state.user = {
        isFakeUser: action.payload.isFakeUser,
        username: action.payload.username,
        id: action.payload.id,
      };
    });
    // builder.addMatcher(isAnyOf(,), (state, action) => {});
  },
});

// export const { actionQualquer } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;

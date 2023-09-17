import React, { PropsWithChildren, useEffect } from "react";
import { AppDispatch, RootState } from "../../shared/store/store";
import { useDispatch, useSelector } from "react-redux";
import { connectSokect, getLoggedUser } from "../../shared/store/modules/auth";
import { CircularProgress } from "@mui/material";

const Authentication: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();

  const isLogged = useSelector<RootState, boolean>(
    (state) => state.auth.isLogged
  );

  useEffect(() => {
    dispatch(getLoggedUser())
      .unwrap()
      .then(() => dispatch(connectSokect()));
  }, []);

  if (!isLogged) {
    return (
      <div className="absoulte flex inset-0 justify-center items-center">
        <CircularProgress size={25} />
      </div>
    );
  }

  return <>{children}</>;
};

export default Authentication;

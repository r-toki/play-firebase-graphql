import { ReactNode, VFC } from "react";
import { Navigate, useParams } from "react-router-dom";

import { useAuth } from "../context/Auth";
import { routes } from ".";

type Props = { children: ReactNode };

export const ForAuth: VFC<Props> = ({ children }) => {
  const { uid } = useAuth();
  if (uid) return <Navigate to={routes["/"].path()} />;
  return <>{children}</>;
};

export const AppPublic: VFC<Props> = ({ children }) => {
  return <>{children}</>;
};

export const AppPrivate: VFC<Props> = ({ children }) => {
  const { uid } = useAuth();
  if (!uid) return <Navigate to={routes["/login"].path()} />;
  return <>{children}</>;
};

export const UserPrivate: VFC<Props> = ({ children }) => {
  const { uid } = useAuth();
  const { user_id } = useParams();
  if (uid !== user_id) return <Navigate to={routes["/"].path()} />;
  return <>{children}</>;
};

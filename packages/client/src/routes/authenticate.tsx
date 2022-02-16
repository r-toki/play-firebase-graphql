import { ReactNode, VFC } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/Auth";
import { routes } from ".";

type Props = { children: ReactNode };

export const NoAuth: VFC<Props> = ({ children }) => {
  return <>{children}</>;
};

export const WithAuth: VFC<Props> = ({ children }) => {
  const { uid } = useAuth();
  if (!uid) return <Navigate to={routes["/login"].path()} />;
  return <>{children}</>;
};

export const ForAuth: VFC<Props> = ({ children }) => {
  const { uid } = useAuth();
  if (uid) return <Navigate to={routes["/"].path()} />;
  return <>{children}</>;
};

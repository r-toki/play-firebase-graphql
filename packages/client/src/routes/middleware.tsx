import { ReactNode, VFC } from "react";
import { Navigate, useParams } from "react-router-dom";

import { useAuth } from "../context/Auth";
import { AuthedProvider } from "../context/Authed";
import { useCurrentUserQuery } from "../graphql/generated";
import { routes } from ".";

type MiddlewareProps = { children: ReactNode };

export const WithAuth: VFC<MiddlewareProps> = ({ children }) => {
  const { uid } = useAuth();
  if (!uid) return <Navigate to={routes["/login"].path()} />;
  return <>{children}</>;
};

export const WithoutAuth: VFC<MiddlewareProps> = ({ children }) => {
  const { uid } = useAuth();
  if (uid) return <Navigate to={routes["/"].path()} />;
  return <>{children}</>;
};

export const WithAuthed: VFC<MiddlewareProps> = ({ children }) => {
  const { uid } = useAuth();
  if (!uid) return <Navigate to={routes["/login"].path()} />;

  const { data, called, loading } = useCurrentUserQuery({ variables: { id: uid } });
  if (!called) return null;
  if (loading) return null;
  const currentUser = data?.user;
  if (!currentUser) return <Navigate to={routes["/users/:user_id/edit"].path({ user_id: uid })} />;

  return <AuthedProvider currentUser={currentUser}>{children}</AuthedProvider>;
};

type ComposeProps = {
  components: Array<VFC<{ children: ReactNode } & any>>;
  children: React.ReactNode;
};

export const Compose: VFC<ComposeProps> = ({ components, children }) => {
  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};

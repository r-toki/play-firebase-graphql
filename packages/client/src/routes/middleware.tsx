import { ReactNode, VFC } from "react";
import { Navigate, useParams } from "react-router-dom";

import { useAuth } from "../context/Auth";
import { AuthedProvider, useAuthed } from "../context/Authed";
import { useCurrentUserQuery } from "../graphql/generated";
import { routes } from ".";

type MiddlewareProps = { children: ReactNode };

export const ForAuthPage: VFC<MiddlewareProps> = ({ children }) => {
  const { uid } = useAuth();
  if (uid) return <Navigate to={routes["/"].path()} />;
  return <>{children}</>;
};

export const AppPublicPage: VFC<MiddlewareProps> = ({ children }) => {
  return <>{children}</>;
};

export const AppPrivatePage: VFC<MiddlewareProps> = ({ children }) => {
  const { uid } = useAuth();
  if (!uid) return <Navigate to={routes["/login"].path()} />;
  const { data } = useCurrentUserQuery({ variables: { id: uid } });
  return data?.user ? <AuthedProvider currentUser={data.user}>{children}</AuthedProvider> : null;
};

export const UserPrivatePage: VFC<MiddlewareProps> = ({ children }) => {
  const { user_id } = useParams();
  const { currentUser } = useAuthed();
  if (user_id !== currentUser.id) return <Navigate to={routes["/"].path()} />;
  return <>{children}</>;
};

type ComposeProps = {
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>;
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

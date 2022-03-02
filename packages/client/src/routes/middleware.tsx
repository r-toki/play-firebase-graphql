import { ReactNode, VFC } from "react";
import { Navigate, useParams } from "react-router-dom";

import { useAuth } from "../context/Auth";
import { CurrentUserProvider, useCurrentUser } from "../context/CurrentUser";
import { useMeForCurrentUserContextQuery } from "../graphql/generated";
import { routes } from ".";

type MiddlewareProps = { children: ReactNode };

// NOTE: SignUp と LogIn は Auth なし
export const BeforeAuth: VFC<MiddlewareProps> = ({ children }) => {
  const { uid } = useAuth();
  if (uid) return <Navigate to={routes["/"].path()} />;
  return <>{children}</>;
};

export const AfterAuth: VFC<MiddlewareProps> = ({ children }) => {
  const { uid } = useAuth();
  if (!uid) return <Navigate to={routes["/login"].path()} />;

  const { data, called, loading, error } = useMeForCurrentUserContextQuery();
  if (!called || loading) return null;
  if (error) throw new Error(error.message);

  const currentUser = data!.me;
  if (!currentUser) return <Navigate to={routes["/users/new"].path()} />;
  return <CurrentUserProvider currentUser={currentUser}>{children}</CurrentUserProvider>;
};

export const IndexMiddleware: VFC<MiddlewareProps> = () => {
  const currentUser = useCurrentUser();
  return <Navigate to={routes["/users/:user_id"].path({ user_id: currentUser.id })} />;
};

export const UserNewMiddleware: VFC<MiddlewareProps> = ({ children }) => {
  const { uid } = useAuth();
  if (!uid) return <Navigate to={routes["/login"].path()} />;

  const { data, called, loading, error } = useMeForCurrentUserContextQuery();
  if (!called || loading) return null;
  if (error) throw new Error(error.message);

  const currentUser = data!.me;
  if (currentUser) return <Navigate to={routes["/"].path()} />;
  return <>{children}</>;
};

export const UserPrivate: VFC<MiddlewareProps> = ({ children }) => {
  const { user_id } = useParams();
  const currentUser = useCurrentUser();
  if (user_id !== currentUser.id) return <Navigate to={routes["/"].path()} />;
  return <>{children}</>;
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

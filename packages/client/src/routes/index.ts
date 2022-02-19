import { pathBuilder } from "@rei-sogawa/path-builder";

import { AppLayout } from "../components/shared/AppLayout";
import { Index } from "../pages";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";
import { UserEdit } from "../pages/users/[id]/edit";
import { AppPrivate, ForAuth, UserPrivate } from "./authenticate";

const INDEX = "/";
const SIGNUP = "/signup";
const LOGIN = "/login";
const USERS = "/users";
const USER_EDIT = "/users/:user_id/edit";

export const routes = {
  [INDEX]: {
    path: pathBuilder(INDEX),
    Component: Index,
    Layout: AppLayout,
    Middleware: AppPrivate,
  },
  [SIGNUP]: {
    path: pathBuilder(SIGNUP),
    Component: Signup,
    Layout: AppLayout,
    Middleware: ForAuth,
  },
  [LOGIN]: {
    path: pathBuilder(LOGIN),
    Component: Login,
    Layout: AppLayout,
    Middleware: ForAuth,
  },
  [USERS]: {
    path: pathBuilder(USERS),
    Component: Index,
    Layout: AppLayout,
    Middleware: AppPrivate,
  },
  [USER_EDIT]: {
    path: pathBuilder(USER_EDIT),
    Component: UserEdit,
    Layout: AppLayout,
    Middleware: UserPrivate,
  },
  // TODO: 404
  // ["*"]: {
  //   path: pathBuilder(INDEX),
  //   Component: Index,
  // },
};

export const paths = Object.keys(routes) as (keyof typeof routes)[];

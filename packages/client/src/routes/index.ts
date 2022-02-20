import { pathBuilder } from "@rei-sogawa/path-builder";

import { Index } from "../pages";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";
import { UserEdit } from "../pages/users/[user_id]/edit";
import { AppPrivatePage, ForAuthPage, UserPrivatePage } from "./middleware";

const INDEX = "/";
const SIGNUP = "/signup";
const LOGIN = "/login";
const USERS = "/users";
const USER_EDIT = "/users/:user_id/edit";

export const routes = {
  [INDEX]: {
    path: pathBuilder(INDEX),
    Component: Index,
    middleware: [AppPrivatePage],
  },
  [SIGNUP]: {
    path: pathBuilder(SIGNUP),
    Component: Signup,
    middleware: [ForAuthPage],
  },
  [LOGIN]: {
    path: pathBuilder(LOGIN),
    Component: Login,
    middleware: [ForAuthPage],
  },
  [USERS]: {
    path: pathBuilder(USERS),
    Component: Index,
    middleware: [AppPrivatePage],
  },
  [USER_EDIT]: {
    path: pathBuilder(USER_EDIT),
    Component: UserEdit,
    middleware: [AppPrivatePage, UserPrivatePage],
  },
  // TODO: 404
  // ["*"]: {
  // },
};

export const paths = Object.keys(routes) as (keyof typeof routes)[];

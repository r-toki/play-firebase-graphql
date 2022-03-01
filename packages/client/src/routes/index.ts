import { pathBuilder } from "@rei-sogawa/path-builder";

import { Index } from "../pages";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";
import { UserEdit } from "../pages/users/[user_id]/edit";
import { UserNew } from "../pages/users/new";
import {
  IndexMiddleware,
  UserNewMiddleware,
  UserPrivate,
  WithAuthed,
  WithoutAuth,
} from "./middleware";

const INDEX = "/";
const SIGNUP = "/signup";
const LOGIN = "/login";
const USERS = "/users";
const USER = "/users/:user_id";
const USER_EDIT = "/users/:user_id/edit";
const USER_NEW = "/users/new";

export const routes = {
  [INDEX]: {
    path: pathBuilder(INDEX),
    Component: Index,
    middleware: [WithAuthed, IndexMiddleware],
  },
  [SIGNUP]: {
    path: pathBuilder(SIGNUP),
    Component: Signup,
    middleware: [WithoutAuth],
  },
  [LOGIN]: {
    path: pathBuilder(LOGIN),
    Component: Login,
    middleware: [WithoutAuth],
  },
  [USERS]: {
    path: pathBuilder(USERS),
    Component: Index,
    middleware: [WithAuthed],
  },
  [USER]: {
    path: pathBuilder(USER),
    Component: Index,
    middleware: [WithAuthed],
  },
  [USER_EDIT]: {
    path: pathBuilder(USER_EDIT),
    Component: UserEdit,
    middleware: [WithAuthed, UserPrivate],
  },
  [USER_NEW]: {
    path: pathBuilder(USER_NEW),
    Component: UserNew,
    middleware: [UserNewMiddleware],
  },
  // TODO: 404
  // ["*"]: {
  // },
};

export const paths = Object.keys(routes) as (keyof typeof routes)[];

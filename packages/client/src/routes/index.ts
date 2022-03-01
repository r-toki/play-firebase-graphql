import { pathBuilder } from "@rei-sogawa/path-builder";

import { Login } from "../pages/login";
import { Signup } from "../pages/signup";
import { UserEditPage } from "../pages/users/[user_id]/edit";
import { UserPage } from "../pages/users/[user_id]/index";
import { UserNewPage } from "../pages/users/new";
import {
  AfterAuth,
  BeforeAuth,
  IndexMiddleware,
  UserNewMiddleware,
  UserPrivate,
} from "./middleware";

const INDEX = "/";
const SIGNUP = "/signup";
const LOGIN = "/login";
const USER = "/users/:user_id";
const USER_EDIT = "/users/:user_id/edit";
const USER_NEW = "/users/new";

export const routes = {
  [INDEX]: {
    path: pathBuilder(INDEX),
    Component: UserPage,
    middleware: [AfterAuth, IndexMiddleware],
  },
  [SIGNUP]: {
    path: pathBuilder(SIGNUP),
    Component: Signup,
    middleware: [BeforeAuth],
  },
  [LOGIN]: {
    path: pathBuilder(LOGIN),
    Component: Login,
    middleware: [BeforeAuth],
  },
  [USER]: {
    path: pathBuilder(USER),
    Component: UserPage,
    middleware: [AfterAuth],
  },
  [USER_EDIT]: {
    path: pathBuilder(USER_EDIT),
    Component: UserEditPage,
    middleware: [AfterAuth, UserPrivate],
  },
  [USER_NEW]: {
    path: pathBuilder(USER_NEW),
    Component: UserNewPage,
    middleware: [UserNewMiddleware],
  },
  // TODO: 404
  // ["*"]: {
  // },
};

export const paths = Object.keys(routes) as (keyof typeof routes)[];

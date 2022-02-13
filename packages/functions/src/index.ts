import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import { apiApp } from "./api";

admin.initializeApp();

const TOKYO = "asia-northeast1";

exports.api = functions.region(TOKYO).https.onRequest(apiApp);

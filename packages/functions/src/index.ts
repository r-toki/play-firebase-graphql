import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

import { apiApp } from "./api";

const TOKYO = "asia-northeast1";

exports.api = functions.region(TOKYO).https.onRequest(apiApp);

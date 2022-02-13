import * as functions from "firebase-functions";

import { getApiApp } from "./api";

const TOKYO = "asia-northeast1";

exports.api = functions.region(TOKYO).https.onRequest(async (req, res) => (await getApiApp())(req, res));

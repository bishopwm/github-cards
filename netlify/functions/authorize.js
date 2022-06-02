//endpoint https://miro-github.netlify.app/.netlify/functions/authorize
// local http://localhost:8888/.netlify/functions/authorize

import axios from "axios";
import { createClient } from "@supabase/supabase-js";
//import fetch from "node-fetch";

const supabase = createClient(
  process.env.VITE_DATABASE_URL,
  process.env.VITE_DATABASE_PUBLIC_KEY,
  process.env.MIRO_CLIENT_ID,
  process.env.MIRO_CLIENT_SECRET,
  process.env.MIRO_REDIRECT_URL
);

exports.handler = async function (event, context, callback) {

  console.log("event.httpMethod: " + event.httpMethod)
  if (event.httpMethod == 'GET') {
    if (!event.queryStringParameters) {
      console.log("!event.queryStringParameters")
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Authorization URL incorrect" }),
      };
    }

    const queryStringParameters = event.queryStringParameters;
    let code = queryStringParameters.code;
    let clientId = queryStringParameters.client_id;

    let url = `https://api.miro.com/v1/oauth/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${process.env.MIRO_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.MIRO_REDIRECT_URL}`;

    grabToken(url).then((redirectUrl) => {
      console.log("redirect " + redirectUrl);

      return {
        statusCode: 302,
        headers: {
          Location: redirectUrl,
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({}),
      };
    });
  }
  else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Verb not supported" }),
    };
  }
}

async function grabToken(url) {
  try {
    console.log("url: " + url)
    let oauthResponse = await axios.post(url);
    console.log("oauthResponse.data " + oauthResponse.data);
    console.log("oauthResponse.data " + oauthResponse.data.access_token);

    miro_access_token = oauthResponse.data.access_token;
    miro_user_id = oauthResponse.data.user_id;
    miro_team_id = oauthResponse.data.team_id;


    const currentDate = new Date();
    // If access_token, then post oauth response data to supabase
    await supabase.from("auth").upsert([
      {
        access_token: miro_access_token,
        miroUserId: miro_user_id,
        modified_at: currentDate
      },
    ]).then(({ data, error }) => {
      console.log(data, error)
    });
    console.log("access token: " + miro_access_token);
    return `https://miro.com/app-install-completed/?client_id=${clientId}&team_id=${miro_team_id}`;
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "GrabToken error" }),
    };
  }
}

import axios from "axios";
import { createClient } from "@supabase/supabase-js";
//import fetch from "node-fetch";

const supabase = createClient(
  process.env.VITE_DATABASE_URL,
  process.env.VITE_DATABASE_PUBLIC_KEY
);

exports.handler = async function (event, context, callback) {
  if (event.httpMethod == 'GET') {
    if (!event.queryStringParameters) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Authorization URL incorrect" }),
      };
    }
    const queryStringParameters = event.queryStringParameters;

    let code = queryStringParameters.code;
    let clientId = queryStringParameters.client_id;
    let teamId = queryStringParameters.team_id;

    const redirectUrl = `https://miro.com/app-install-completed/?client_id=${clientId}&team_id=${teamId}`
    const url = `https://api.miro.com/v1/oauth/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${process.env.MIRO_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.MIRO_REDIRECT_URL}`;

    grabToken(url);

    return {
      statusCode: 302,
      headers: {
        Location: redirectUrl,
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({}),
    };
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
    let oauthResponse = await axios.post(url);

    console.log(`access_token: ${oauthResponse.data.access_token}`);

    miro_access_token = oauthResponse.data.access_token;
    miro_user_id = oauthResponse.data.user_id;
    miro_team_id = oauthResponse.data.team_id;
    console.log("miro_team_id " + miro_team_id);

    const modifiedAtTime = new Date();

    if (miro_access_token) {
      // If access_token, then post oauth response data to supabase
      await supabase.from("auth").upsert([
        {
          access_token: miro_access_token,
          miroUserId: miro_user_id,
          modified_at: modifiedAtTime
        },
      ]).then(({ data, error }) => {
        console.log(data, error)
      })
    }
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
}

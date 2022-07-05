import axios from "axios";
import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_DATABASE_URL,
  process.env.VITE_DATABASE_PUBLIC_KEY
);

exports.handler = async function (event, context, callback) {
  if (event.httpMethod == "GET") {
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

    const redirectUrl = `https://miro.com/app-install-completed/?client_id=${clientId}&team_id=${teamId}`;
    const url = `https://api.miro.com/v1/oauth/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${process.env.MIRO_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.MIRO_REDIRECT_URL}`;

    console.log("URL constructed", url);

    getToken(url).then(() => {
      return {
        statusCode: 302,
        headers: {
          Location: redirectUrl,
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({}),
      };
    });
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Verb not supported" }),
    };
  }
};

async function getToken(url) {
  console.log("getting token", url);

  await fetch(url, {
    method: "POST",
  })
    .then((response) => {
      console.log(response);
      return response.json();
      // miro_access_token = response.data.access_token;
      // miro_user_id = response.data.user_id;
      // miro_team_id = response.data.team_id;
    })
    .then((result) => {
      console.log(result);
    });

  const modifiedAtTime = new Date();

  console.log("Modified Time", modifiedAtTime);
  // await supabase
  //   .from("auth")
  //   .upsert([
  //     {
  //       access_token: miro_access_token,
  //       miroUserId: miro_user_id,
  //       modified_at: modifiedAtTime,
  //     },
  //   ])
  //   .then(({ data, error }) => {
  //     console.log(data, error);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
}

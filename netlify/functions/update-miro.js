import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabase = createClient(
  process.env.VITE_DATABASE_URL,
  process.env.VITE_DATABASE_PUBLIC_KEY
);

exports.handler = async function (event) {
  const body = JSON.parse(event.body);
  const gitHubIssueId = body.gitHubIssueId;

  const { data, error } = await supabase
    .from("card-mapping")
    .select("gitHubIssueId", gitHubIssueId);

  // No Miro App Card Found
  if (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "No Miro App Card Found" }),
    };
  }

  // Matching App Cards found
  if (data) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VITE_MIRO_API_TOKEN}`,
    };

    data.map((item) => {
      axios
        .patch(
          `https://api.miro.com/v2/boards/${item.miroBoardId}/app_cards/${item.miroAppCardId}`,
          {
            data: {
              title: "Updated from Netlify Function",
            },
          },
          {
            headers: headers,
          }
        )
        .then(function (response) {
          res.json(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

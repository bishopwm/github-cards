/* 

  This endpoint updates Miro App Card statuses when there is an update to their poisition
  or column in GitHub (i.e. from "In Progress" to "Done")

**/
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabase = createClient(
  process.env.VITE_DATABASE_URL,
  process.env.VITE_DATABASE_PUBLIC_KEY
);

exports.handler = async function (event) {
  const body = JSON.parse(event.body);
  const gitHubProjectCardId = body.gitHubProjectCard.id;

  console.log("Upated Project Card: ", body.gitHubProjectCard);

  // Get column

  const { data, error } = await supabase
    .from("card-mapping")
    .select("gitHubIssueId", gitHubProjectCardId);

  // No Miro App Card Found
  if (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "No Miro App Card found for this project card",
      }),
    };
  }

  console.log("Data", data);
  // Matching App Cards found
  if (data) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VITE_MIRO_API_TOKEN}`,
    };

    // data.map((item) => {
    //   axios
    //     .patch(
    //       `https://api.miro.com/v2/boards/${item.miroBoardId}/app_cards/${item.miroAppCardId}`,
    //       {
    //         title: "Updated from Netlify Function",
    //       },
    //       {
    //         headers: headers,
    //       }
    //     )
    //     .then(function (response) {
    //       res.json(response.data);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Project Card Endpoint" }),
  };
};

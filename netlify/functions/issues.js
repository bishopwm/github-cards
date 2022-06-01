/* 

  This endpoint updates Miro App Cards when there is an update to their information
  in GitHub (i.e. if the title or description is updated)

**/
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabase = createClient(
  process.env.VITE_DATABASE_URL,
  process.env.VITE_DATABASE_PUBLIC_KEY
);

exports.handler = async function (event) {
  // Get Issue
  const body = JSON.parse(event.body);
  const gitHubIssue = body.gitHubIssue;
  const gitHubIssueId = gitHubIssue.id;

  //   console.log("Updated Issue: ", gitHubIssue);

  const { data, error } = await supabase
    .from("card-mapping")
    .select(
      "id, miroAppCardId::text, gitHubIssueId, miroUserId::text, gitHubUsername, created_at, miroBoardId"
    )
    .eq("gitHubIssueId", gitHubIssueId);

  console.log(data, error);

  //   No Miro App Card Found
  if (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "No Miro App Card found for this issue",
      }),
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
      console.log("Sending request to update: ", item);
      console.log(
        "request URL",
        `https://api.miro.com/v2/boards/${item.miroBoardId}/app_cards/${item.miroAppCardId}`
      );

      const options = {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({
          data: {
            title: "Updated from Netlify Function",
          },
        }),
      };

      fetch(
        `https://api.miro.com/v2/boards/${item.miroBoardId}/app_cards/${item.miroAppCardId}`,
        options
      )
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
      //   axios
      //     .patch(
      //       `https://api.miro.com/v2/boards/${item.miroBoardId}/app_cards/${item.miroAppCardId}`,
      //   {
      //     data: {
      //       title: "Updated from Netlify Function",
      //     },
      //   },
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
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Issues Endpoint" }),
  };
};

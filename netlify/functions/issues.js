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

  //   const { data, error } = await supabase
  //     .from("card-mapping")
  //     .select("gitHubIssueId", gitHubProjectCardId);

  // No Miro App Card Found
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
    // const headers = {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${process.env.VITE_MIRO_API_TOKEN}`,
    // };
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
    body: JSON.stringify({ message: "Issues Endpoint" }),
  };
};

/* 

  This endpoint updates Miro App Card statuses when there is an update to their poisition
  or column in GitHub (i.e. from "In Progress" to "Done")

**/
import { createClient } from "@supabase/supabase-js";
import fetch from "node-fetch";

const supabase = createClient(
  process.env.VITE_DATABASE_URL,
  process.env.VITE_DATABASE_PUBLIC_KEY
);

exports.handler = async function (event) {
  if (!event.body) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "No Body Found" }),
    };
  }

  // Get project card
  const body = JSON.parse(event.body);
  const gitHubProjectCard = body.gitHubProjectCard;
  const gitHubProjectColumnId = gitHubProjectCard.column_id;

  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${process.env.VITE_GH_ACCESS_TOKEN}`,
  };

  const gitHubProjectColumn = await fetch(
    `https://api.github.com/projects/columns/${gitHubProjectColumnId}`,
    {
      method: "GET",
      headers: headers,
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => console.error(error));

  console.log(gitHubProjectColumn);

  // Get column name
  // const gitHubProjectColumn = await fetchGitHubColumn(gitHubProjectColumnId);
  // const gitHubProjectColumnName = gitHubProjectColumn.name;

  // console.log(fetchGitHubColumn);

  // const { data, error } = await supabase
  //   .from("card-mapping")
  //   .select()
  //   .eq("gitHubIssueId", gitHubProjectCardId);

  // // No Miro App Card Found
  // if (error) {
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({
  //       message: "No Miro App Card found for this project card",
  //     }),
  //   };
  // }

  // console.log("Data", data);
  // // Matching App Cards found
  // if (data) {
  //   const headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.VITE_MIRO_API_TOKEN}`,
  //   };

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
  // }

  // Final response
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Request sent" }),
  };
};

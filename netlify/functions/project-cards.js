/* 

  This endpoint updates Miro App Card statuses when there is an update to their poisition
  or column in GitHub (i.e. from "In Progress" to "Done")

**/
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

import { fetchGitHubColumns } from "../../src/utils";

const supabase = createClient(
  process.env.VITE_DATABASE_URL,
  process.env.VITE_DATABASE_PUBLIC_KEY
);

exports.handler = async function (event) {
  // Get project card
  const body = JSON.parse(event.body);
  const gitHubProjectCard = body.gitHubProjectCard;

  const gitHubProjectCardId = gitHubProjectCard.id;
  const gitHubProjectId = gitHubProjectCard.project_url
    .split("https://api.github.com/projects/")
    .pop();

  console.log("Upated Project Card: ", gitHubProjectCard);
  // {
  //   after_id: 80880591,
  //   archived: false,
  //   column_id: 18512156,
  //   column_url: 'https://api.github.com/projects/columns/18512156',
  //   content_url: 'https://api.github.com/repos/addisonschultz/github-cards/issues/22',
  //   created_at: '2022-05-23T09:11:41Z',
  //   creator: {
  //     avatar_url: 'https://avatars.githubusercontent.com/u/42930383?v=4',
  //     events_url: 'https://api.github.com/users/addisonschultz/events{/privacy}',
  //     followers_url: 'https://api.github.com/users/addisonschultz/followers',
  //     following_url: 'https://api.github.com/users/addisonschultz/following{/other_user}',
  //     gists_url: 'https://api.github.com/users/addisonschultz/gists{/gist_id}',
  //     gravatar_id: '',
  //     html_url: 'https://github.com/addisonschultz',
  //     id: 42930383,
  //     login: 'addisonschultz',
  //     node_id: 'MDQ6VXNlcjQyOTMwMzgz',
  //     organizations_url: 'https://api.github.com/users/addisonschultz/orgs',
  //     received_events_url: 'https://api.github.com/users/addisonschultz/received_events',
  //     repos_url: 'https://api.github.com/users/addisonschultz/repos',
  //     site_admin: false,
  //     starred_url: 'https://api.github.com/users/addisonschultz/starred{/owner}{/repo}',
  //     subscriptions_url: 'https://api.github.com/users/addisonschultz/subscriptions',
  //     type: 'User',
  //     url: 'https://api.github.com/users/addisonschultz'
  //   },
  //   id: 82280938,
  //   node_id: 'PRC_lALOHM5IKs4A24mvzgTngeo',
  //   note: null,
  //   project_url: 'https://api.github.com/projects/14387631',
  //   updated_at: '2022-05-31T11:51:40Z',
  //   url: 'https://api.github.com/projects/columns/cards/82280938'
  // }

  // Get column name
  fetchGitHubColumns(gitHubProjectId).then((response) => {
    console.log("Project Columns", response);
  });

  const { data, error } = await supabase
    .from("card-mapping")
    .select()
    .eq("gitHubIssueId", gitHubProjectCardId);

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

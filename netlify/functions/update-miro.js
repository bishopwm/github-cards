import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.VITE_DATABASE_URL,
  process.env.VITE_DATABASE_PUBLIC_KEY
);

exports.handler = async function (event, context) {
  //   console.log("Event", event);
  //   console.log("Context", context);
  const body = JSON.parse(event.body);
  const gitHubIssueId = body.gitHubIssueId;

  //   console.log("Body", body);
  //   console.log("Event Body", event.body);
  console.log(gitHubIssueId);

  const { data, error } = await supabase
    .from("card-mappings")
    .select("gitHubIssueId", gitHubIssueId);

  console.log(data);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

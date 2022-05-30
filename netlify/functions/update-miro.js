import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.VITE_DATABASE_URL,
  process.env.VITE_DATABASE_PUBLIC_KEY
);

exports.handler = async function (event, context) {
  console.log("Event", event);
  console.log("Context", context);

  console.log("Body", event.body);

  const { data, error } = await supabase
    .from("card-mappings")
    .select("gitHubIssueId", "1");

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

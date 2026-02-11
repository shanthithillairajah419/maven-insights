import { NextResponse } from "next/server";

interface CreateIssueRequest {
  title: string;
  teamId: string;
  stateId: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "LINEAR_API_KEY not configured" },
      { status: 500 }
    );
  }

  const body = (await request.json()) as CreateIssueRequest;
  const { title, teamId, stateId } = body;

  if (!title || !teamId || !stateId) {
    return NextResponse.json(
      { error: "Missing required fields: title, teamId, stateId" },
      { status: 400 }
    );
  }

  const mutation = `
    mutation CreateIssue($title: String!, $teamId: String!, $stateId: String!) {
      issueCreate(input: {
        title: $title
        teamId: $teamId
        stateId: $stateId
      }) {
        success
        issue {
          id
          identifier
          url
        }
      }
    }
  `;

  const response = await fetch("https://api.linear.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({
      query: mutation,
      variables: { title, teamId, stateId },
    }),
  });

  const data = await response.json();

  if (data.errors) {
    return NextResponse.json(
      { error: data.errors[0].message },
      { status: 500 }
    );
  }

  const issue = data.data.issueCreate.issue;
  return NextResponse.json({
    success: true,
    identifier: issue.identifier,
    url: issue.url,
  });
}

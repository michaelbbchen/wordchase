import { NextRequest, NextResponse } from 'next/server'
import * as Ably from "ably/promises";

export async function POST(req: NextRequest) {
  if (!process.env.ABLY_CLIENT_API_KEY) {
    return NextResponse.json({ errorMessage: `Missing ABLY_CLIENT_API_KEY environment variable.`
      },{ 
        status: 500,
        headers: new Headers({
          "content-type": "application/json"
        })
      });
  }


	// TODO: return error http response if no clientId is given
  const clientId = ( (await req.formData()).get('clientId')?.toString() ) || process.env.DEFAULT_CLIENT_ID || "NO_CLIENT_ID";

  const client = new Ably.Rest(process.env.ABLY_CLIENT_API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({ clientId: clientId });
  console.log(tokenRequestData)
  return NextResponse.json(tokenRequestData)
}
// backend/src/utils/googleVerify.ts
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(token: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload(); // { email, name, picture, sub (googleId) }
  } catch (error) {
    console.error("Error verifying Google token:", error);
    return null;
  }
}

import nacl from "tweetnacl";

export const signatureHeader = "x-signature-ed25519";
export const timestampHeader = "x-signature-timestamp";

export type Headers = URLSearchParams | { [key: string]: string | string[] | undefined };

export interface ExtractedHeaders {
  /**
   * Signature on request.
   */
  signature: string | null;

  /**
   * Timestamp on request.
   */
  timestamp: string | null;
}

export const extractHeaders = (headers: Headers): ExtractedHeaders => {
  let signature = (headers as any)[signatureHeader] as string | null;
  let timestamp = (headers as any)[timestampHeader] as string | null;
  if (headers instanceof URLSearchParams) {
    signature = headers.get(signatureHeader);
    timestamp = headers.get(timestampHeader);
  }
  return { signature, timestamp };
};

export interface VerifyInput {
  /**
   * Discord application public key.
   */
  publicKey: string;

  /**
   * Signature on request.
   */
  signature: string | null;

  /**
   * Timestamp on request.
   */
  timestamp: string | null;

  /**
   * Body of request.
   */
  body: string | null;
}

export interface VerifyOutputOK {
  /**
   * True if request is verified.
   */
  ok: true;
}

export interface VerifyOutputError {
  /**
   * True if request is verified.
   */
  ok: false;

  /**
   * If request is not verified, HTTP status code for failure.
   */
  code: number;

  /**
   * If request is not verified, reason for failure.
   */
  reason: string;
}

export type VerifyOutput = VerifyOutputOK | VerifyOutputError;

/**
 * Verifies the Webhook request from discord.
 * @param verifyInput input required for verification.
 * @returns verification output.
 */
export const verify = ({ publicKey, body, signature, timestamp }: VerifyInput): VerifyOutput => {
  if (!body) {
    return { ok: false, code: 400, reason: "bad request: body is required" };
  }
  if (!timestamp) {
    return { ok: false, code: 400, reason: "bad request: timestamp is required" };
  }
  if (!signature) {
    return { ok: false, code: 400, reason: "bad request: signature is required" };
  }
  const ok = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, "hex"),
    Buffer.from(publicKey, "hex")
  );
  if (ok) return { ok };
  return { ok, code: 401, reason: "forbidden: invalid request signature" };
};

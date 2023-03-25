import { Buffer } from 'buffer';

function decodeTokenPayload(token: string) {
  const tokenPayload = token.split('.')[1];
  const binaryData = Buffer.from(tokenPayload, 'base64');
  const decodedTokenPayload = binaryData.toString();

  try {
    const tokenPayloadObj = JSON.parse(decodedTokenPayload);
    return tokenPayloadObj;
  } catch (error) {
    return {};
  }
}

export default decodeTokenPayload;

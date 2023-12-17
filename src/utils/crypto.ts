const ALGORITHM = "AES-GCM";
const iv = new TextEncoder().encode('66,18,128,15,44,99,21,44,129,35,18,203');

const operations = window.crypto.subtle;

export const generateKey = async (): Promise<string> => {
  const key = await operations.generateKey(
    { name: ALGORITHM, length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const exportedKey = await operations.exportKey("jwk", key); // TODO: try another key format

  return btoa(JSON.stringify(exportedKey));
};

const importKey = async (rawKey: string) => {
  const jwkKey = JSON.parse(atob(rawKey));
  return await operations.importKey(
    "jwk",
    jwkKey,
    {
      name: ALGORITHM,
    },
    true,
    ["encrypt", "decrypt"]
  );
};

function arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export const encrypt = async ({
  content,
  rawKey,
}: {
  content: string;
  rawKey: string;
}): Promise<string> => {
  const contentEncoded = new TextEncoder().encode(content);

  const key = await importKey(rawKey);

  const encryptedData = await operations.encrypt(
    { name: ALGORITHM, iv },
    key,
    contentEncoded
  );

  return arrayBufferToBase64(encryptedData);
};

export const decrypt = async ({
  encryptedMessage,
  rawKey,
}: {
  encryptedMessage: string;
  rawKey: string;
}): Promise<string> => {
  const encryptedData = base64ToArrayBuffer(encryptedMessage);
  const key = await importKey(rawKey);

  const decryptedData = await operations.decrypt(
    {
      name: ALGORITHM,
      iv,
    },
    key,
    encryptedData
  );

  return new TextDecoder().decode(decryptedData);
};

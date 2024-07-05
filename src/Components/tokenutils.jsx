import { jwtVerify } from 'jose';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ encodingType: 'aes' });

export const getUserIdFromToken = async () => {
  const token = ls.get('authToken');
  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    console.log("Getting User iD");
    return payload.userId;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
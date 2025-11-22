
const JWT_SECRET="somecjbcnbcshbVerySecretKey"


export const protect = async (req, res, next) => {
  // 1️⃣ Pull the header (case‑insensitive)
  const authHeader =
    req.headers.authorization || req.headers.Authorization;
 
  // console.log('Authorization header:', authHeader);
 
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: 'Not authorized, no Authorization header' });
  }
 
  // 2️⃣ Split into ["Bearer", "the.token.here"]
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res
      .status(401)
      .json({ message: 'Not authorized, invalid Authorization format' });
  }
 
  const token = parts[1].trim();
  // console.log('Extracted token:', token);
 
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Not authorized, token is empty' });
  }
 
  // 3️⃣ Verify it
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log('Decoded payload:', decoded);
    req.user = decoded;              // or fetch full user from DB here
    return next();
  } catch (err) {
    // console.error('JWT verify error:', err);
    return res
      .status(401)
      .json({ message: 'Not authorized, token invalid or expired' });
  }
};
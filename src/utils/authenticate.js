export default function authenticateKey(req, res, next) {
  const {key} = req.query;
  // if(!key || key !== `TKK3mjft4bQhNppANGLzUruQd9eZiyKdZpVKtvVhdCkKcfOioW`)
  if(!key || key !== process.env.API_KEY)
    return res.status(403).send({ error: { code: 403, message: "You not allowed." } });
  next();
}
import fetch from "node-fetch";


export async function location(req, res) {
  const {city} = req.params;
  const {lang} = req.query || "en";

  const response =
    await fetch(`http://localhost:3000/api/location/${city}?lang=${lang}&key=${process.env.API_KEY}`)

  const body = await response.json();
  return res.render(`city`, {city: body})
}
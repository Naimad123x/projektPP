

export async function info(req, res){
  return await res.send(
    `<head><title>API Guide</title><link rel="stylesheet" href="/style.css"></head>` +
    `<body><b>Type city name after /api/</b><br>` +
    `Examples: /api/location/london<br><br>` +
    `<b>You can change language of response by adding query: ?lang={lang}</b><br>` +
    `Examples: /api/location/london?lang=it<br><br>` +
    `<b>Default response format is JSON. You can change that to xml by adding query ?format=xml</b><br><br>` +
    `<b>Authorization: To use our API you have to use key by adding query ?key={key}</b>` +
    `</body>`
  );
}
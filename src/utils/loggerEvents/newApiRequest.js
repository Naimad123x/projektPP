import util from "util";

export default {
  name: "newApiRequest",
  execute(data){
    console.log("new API Request: location: %s, params: %s, date: %d",
      data.location,
      util.inspect(data.params, {showHidden: false, depth: null, colors: true}),
      data.date
    )
  }
}
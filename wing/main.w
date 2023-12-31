bring cloud;
bring ex;
bring http;
bring expect;
bring util;
bring "./slack.w" as slack;


let WINGLY_URL = "wingly_url";
let TEST_MESSAGE = "test-message";

let website = new ex.ReactApp(
  projectPath: "../raffle-client",
  buildDir: "/dist",
  localPort: 5173,
  startCommand: "npm run dev",
  useBuildCommand: true
);

let b = new cloud.Bucket() as "raffle-bucket";

b.addObject(WINGLY_URL, "https://www.youtube.com/embed/Om5VKZ18zBE?si=hhVjjb16ylqMDTtn");

let table = new ex.Table({
  name: "registrations",
    primaryKey: "email", 
    columns: { 
      "email" => ex.ColumnType.STRING,
      "name" => ex.ColumnType.STRING 
    } 
});

let slackToken = new cloud.Secret(name: "slack-token") as "slack";
let channelToken = new cloud.Secret(name: "raffle-channel") as "slack-channel";
let slackBot = new slack.Slack(token: slackToken);

let api = new cloud.Api(
  cors: true, 
  corsOptions: {
    allowOrigin: [website.url],
    allowMethods: [
      cloud.HttpMethod.GET,
      cloud.HttpMethod.POST
    ]
});

let app = std.Node.of(api).app;

website.addEnvironment("apiUrl", api.url);

api.get("/wingly", inflight () => {
  return {
    status: 200,
    body: b.get(WINGLY_URL)
    };
});


api.post("/user", inflight (req) => {
  try {
    let body = Json.parse(req.body ?? Json.stringify({}));
    let email: str? = str.fromJson(body.tryGet("email"));
    let name: str? = str.fromJson(body.tryGet("name"));


    if (email == nil || name == nil) {
      return {
        status: 500, 
        body: "Internal server error"
        };
    } 
    if (table.tryGet(email ?? "") != nil) {
      return {
        status: 500, 
        body: "User already exists"
        };
    }

    table.insert(email ?? "", { name: name, email: email });
    
    let users = table.list();
    let var message = "Yay! another user registered to the raffle! :tada::heart_eyes_cat:\n";
    message = message + "*email:* {email} *name:* {name}\n";
    message = message + "There are currently {users.length} registered users :muscle:\n";
    message = message + "-----------------------------------------------------------\n";
    message = message + "*Users list:*";

    for user in users {
      message = message + "\n*email:* {user.tryGet("email")} *name:* {user.tryGet("name")}";
    }
    message = message + "\n-----------------------------------------------------------\n";


    if (!app.isTestEnvironment) {
      slackBot.postMessage(channel: channelToken.value(), text: message);
    } else {
      b.put(TEST_MESSAGE, message);
    }

    return { status: 200 };
  } catch error {
    log(error);

      return {
        status: 500, 
        body: "Internal server error"
      };
  }
});


test "endpoints" {

  expect.equal(http.get("{api.url}/wingly").body, "https://www.youtube.com/embed/Om5VKZ18zBE?si=hhVjjb16ylqMDTtn");
  
  // an empty request 
  let postUserUrl = "{api.url}/user";
  // testing body input
  expect.equal(http.post(postUserUrl, {}).body,  "Internal server error");
  expect.equal(http.post(postUserUrl, { body: Json.stringify({}) }).body,  "Internal server error");
  expect.equal(http.post(postUserUrl, { body: Json.stringify({name: "name"}) }).body,  "Internal server error");
  expect.equal(http.post(postUserUrl, { body: Json.stringify({email: "email@email.com"}) }).body,  "Internal server error");

  // valid registration
  http.post(postUserUrl, { body: Json.stringify({email: "email@email.com", name: "Hershey"}) });
  expect.equal(table.get("email@email.com").get("name"), "Hershey");

  //repeated registration
  expect.equal(http.post(postUserUrl, { body: Json.stringify({email: "email@email.com", name: "Tion"}) }).body, "User already exists");

  // slack message
  let expectedMessage = "Yay! another user registered to the raffle! :tada::heart_eyes_cat:\n*email:* email@email.com *name:* Hershey\nThere are currently 1 registered users :muscle:\n-----------------------------------------------------------\n*Users list:*\n*email:* email@email.com *name:* Hershey\n-----------------------------------------------------------\n";
  expect.equal(b.get(TEST_MESSAGE), expectedMessage);

}

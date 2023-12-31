bring cloud;
bring http;

// types
struct SlackProps {
  token: cloud.Secret;
}

struct PostMessageArgs {
  channel: str;
  text: str?;
}

pub class Slack {
  token: cloud.Secret;

  new(props: SlackProps) {
    this.token = props.token;
  }

  pub inflight postMessage(args: PostMessageArgs) {
    let token = this.token.value();

    let res = http.post("https://slack.com/api/chat.postMessage", {
      headers: {
        "Authorization" => "Bearer {token}",
        "Content-Type" => "application/json; charset=utf8",
      },
      body: Json.stringify(Json {
        channel: args.channel,
        text: args.text ?? "",
      })
    }
    );

  }  
}
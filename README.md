## Wingly Raffle

This is a small wing app created for signing wingnuts to a raffle 🎉

### How it's built:

The frontend uses a `ex.ReactApp` resource - pointing to react project, built with vite.

Upon a registration, the user's details are saved in a `ex.Table`, and a notification is sent to a dedicated slack channel.
The communication is done via `cloud.Api`.

After the registration due date is over, a recording of the wingly show is embedded to the page.
We used a `cloud.Bucket` to store this information (as well as mocking slack and verifying the message while testing).

### How to run:

Start by installing all the dependencies with:

`npm install`

Then, to start the simulator, run:

`wing it backend/main.w`

- You can reach out the front end at localhost:5173.

And to test, run:

`wing test backend/main.w`

import {useMemo, useState} from "react";

const RegisteredMessage = ({name}: {name?: string}) => (
  <div className=" text-center py-12 font-semibold leading-8">
    <p>You're all set {name}&nbsp;✅</p>
    <p>See you at the Wingly!</p>
  </div>
);

const Input = ({name, type, onChange, value}: {name: string; type: string; onChange: React.ChangeEventHandler<HTMLInputElement>; value: string}) => {
  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900">{name}</label>
      <div className="mt-2">
        <input id="email" name={name} type={type} value={value} onChange={onChange} required className="block px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
      </div>
    </div>
  );
};

const Button = ({onClick, children, disabled}: {onClick: React.MouseEventHandler<HTMLButtonElement>; children: string | JSX.Element; disabled: boolean}) => {
  return (
    <button disabled={disabled} onClick={onClick} className="rounded-md bg-teal-500 px-3 py-2 font-medium text-white shadow-sm disabled:bg-gray-400 hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500">
      {children}
    </button>
  );
};

const ListItem = ({num, children}: {num: number; children: JSX.Element}) => {
  return (
    <div className="flex items-start">
      <div>
        <span className="flex bg-gray-100 rounded-full border border-gray-300 h-8 w-8 items-center justify-center mx-2 text-gray-600">{num}</span>
        <div />
      </div>
      {children}
    </div>
  );
};

export const Raffle = () => {
  const [name, setName] = useState(localStorage.getItem("wingly-user-name") ?? "");
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(!!localStorage.getItem("wingly-user-name"));

  const isValid = useMemo(() => !!name && email.match(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/), [name, email]);

  const submit = async () => {
    setIsRegistered(true);
    localStorage.setItem("wingly-user-name", name);
    await fetch(window.wingEnv.apiUrl + "/user", {method: "POST", body: JSON.stringify({name, email})});
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col lg:flex-row">
        <img src="/cup.png" className="w-2/3" style={{maxWidth: 500}} />
        <div className="flex flex-col gap-6">
          <p className=" font-semibold">How to Participate?</p>
          <ListItem num={1}>
            <div className="w-full ">
              <p>
                Enter your email address by <b>January 9th</b>
              </p>
              <br />
              <div className={`border-solid xs:p-6 border rounded-md flex flex-col gap-6 xs:mr-10 mr-4 p-4 ${isRegistered ? "border-green-300" : "border-gray-200"}`}>
                {isRegistered ? (
                  <RegisteredMessage name={name} />
                ) : (
                  <>
                    <Input type="text" name="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input type="email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button disabled={!isValid} onClick={submit}>
                      Sign me up!
                    </Button>
                  </>
                )}
              </div>
            </div>
          </ListItem>
          <ListItem num={2}>
            <div>
              <p>
                Tune in to our{" "}
                <a className="text-teal-400 font-bold" href="https://www.twitch.tv/winglangio">
                  Wingly show
                </a>{" "}
                on <b>January 23rd</b> to discover the 5 lucky winners!
              </p>
            </div>
          </ListItem>
          <ListItem num={3}>
            <p>
              Join the fun on <b>February 6th</b>! Watch our{" "}
              <a className="text-teal-400 font-bold" href="https://www.twitch.tv/winglangio">
                show
              </a>
              - sip from your Wingly mug,
              <br /> and actively participate in all the excitement! 😻😻🔥
            </p>
          </ListItem>
        </div>
      </div>
    </>
  );
};

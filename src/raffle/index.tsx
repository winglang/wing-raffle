import {useMemo, useState} from "react";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isValid = useMemo(() => !!name && email.match(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/), [name, email]);

  const submit = () => {};
  return (
    <>
      <div className="p-4">
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-3xl font-bold">🎉 Enter the Wingnuts Mug Raffle! 🎁</h1>
          <p className="text-xl font-semibold">Wingnuts are you ready for a fun challenge? </p>
          <p className="text-2xl font-semibold">Enter your email below for a chance to win a Winglang mug!</p>
          <br />
        </div>

        <div className="flex justify-center items-center">
          <img src="/cup.jpg" style={{width: "30%"}} />
          <div className="flex flex-col gap-6">
            <p className=" font-semibold">How to Participate?</p>
            <ListItem num={1}>
              <div className="w-2/3">
                <p> Simply put your email address below.</p>
                <br />
                <div className="border-solid p-6 border rounded-md border-gray-200 flex flex-col gap-6  ">
                  <Input type="text" name="Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <Input type="email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Button disabled={!isValid} onClick={submit}>
                    Sign me up!
                  </Button>
                </div>
              </div>
            </ListItem>
            <ListItem num={2}>
              <div>
                <p>
                  Promise us <b>one thing</b> – <br /> when you sip from your new Winglang mug,{" "}
                  <b>
                    you'll tune in to our{" "}
                    <a className="text-teal-400" href="https://www.twitch.tv/winglangio">
                      Wingly
                    </a>{" "}
                    show.
                  </b>
                </p>
                <p> It's the perfect way to enjoy your favorite beverage and stay connected with the Wing community! ♥️</p>
              </div>
            </ListItem>
          </div>
        </div>
      </div>
      <p className="text-sm text-center text-gray-400 absolute mx-auto bottom-6 w-full">
        Created and deployed in under 3 hours using Winglang.{" "}
        <a className="text-gray-500 cursor-pointer" href="#">
          Checkout the code 👀
        </a>
      </p>
    </>
  );
};

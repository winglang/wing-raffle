import {useMemo, useState} from "react";

const RegisteredMessage = ({name}: {name?: string}) => (
  <div className="text-center py-14 font-semibold text-lg leading-8">
    <p>You're all set {name}&nbsp;✅</p>
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
      <div className="flex flex-col justify-center items-center gap-6 text-center">
        <h1 className="md:text-6xl text-4xl font-bold mt-4">The Wingnut Mug Raffle</h1>
        <h3 className="text-xl font-semibold">
          Enter your name below by January 22nd for a chance to join the Wingly
          <br />
          Update while sipping from a custom-made Winglang mug!
        </h3>
      </div>
      <div className="flex justify-center items-center flex-col lg:flex-row gap-8">
        <img src="/cup.png" className="lg:w-2/3 w-1/2 lg:m-0 mt-6" style={{maxWidth: 550}} />
        <div className="flex flex-col gap-6 justify-center items-center">
          <div className="sm:w-2/3 w-full">
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
            <p className="text-xl mt-6 pr-4">Tune in to the Wingly Update on January 23rd to see if you’re among the five lucky winners!</p>
          </div>
        </div>
      </div>
    </>
  );
};

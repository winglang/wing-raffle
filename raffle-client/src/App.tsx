import {Header} from "./header";
import "./index.css";
import {Raffle} from "./raffle/raffle";
import {Wingly} from "./raffle/wingly";

function App() {
  const isPassedDeadline = new Date(2024, 0, 23).valueOf() < Date.now();
  return (
    <>
      <Header />
      <div className="p-4">
        <div className="flex flex-col justify-center items-center gap-5 text-center">
          <h1 className="text-3xl font-bold">🎉 Enter the Wingnuts Mug Raffle! 🎁</h1>
          <p className="text-xl font-semibold">Wingnuts are you ready for a fun challenge? </p>
          <p className="text-2xl font-semibold">Enter your email below for a chance to win a Winglang mug!</p>
          <br />
        </div>
        {isPassedDeadline ? <Wingly /> : <Raffle />}
        <p className="text-sm text-center text-gray-400 w-full p-6 lg:mt-20">
          Created and deployed in under 3 hours using Winglang.{" "}
          <a className="text-gray-500 cursor-pointer" href="https://github.com/winglang/wing-raffle" target="_blank">
            Checkout the code 👀
          </a>
        </p>
      </div>
    </>
  );
}

export default App;

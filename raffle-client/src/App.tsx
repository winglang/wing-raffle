import {Header} from "./header";
import "./index.css";
import {Raffle} from "./raffle/raffle";
import {Wingly} from "./raffle/wingly";

function App() {
  const isPassedDeadline = new Date(2024, 0, 23).valueOf() < Date.now();
  return (
    <>
      <Header />
      <div className="p-4 pt-0">
        {isPassedDeadline ? <Wingly /> : <Raffle />}
        <p className="text-md text-center text-gray-400 w-full p-6 md:mt-10">
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

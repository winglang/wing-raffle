import {useEffect, useState} from "react";

export const Wingly = () => {
  const [videoUrl, setVideoUrl] = useState("");

  const getVideoUrl = async () => {
    const res = await fetch(window.wingEnv.apiUrl + "/wingly");
    setVideoUrl(await res.text());
  };

  useEffect(() => {
    getVideoUrl();
  }, []);

  return (
    <div className="flex justify-center font-semibold items-center text-center leading-10">
      <div className="w-full">
        <p className="text-4xl">Raffle is over!</p>
        <p>(But you can still watch the Wingly)</p>
        <iframe className="m-auto" style={{minWidth: "65%", maxWidth: "100%", minHeight: "calc(65vw * 9 / 16)"}} src={videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
    </div>
  );
};

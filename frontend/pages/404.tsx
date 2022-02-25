import Lottie from "react-lottie-player";
import json from "../assets/animations/animation/404.json";

export default function Custom404() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Lottie
        loop
        animationData={json}
        play
        style={{ width: "70vw", height: "70vh" }}
      />
    </div>
  );
}

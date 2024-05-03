import Image from "next/image";
import cityscape from "../public/cityscape.jpg";

export default function Background() {
  return (
    <div className="">
    
      <Image
        alt="cityscape"
        src={cityscape}
        placeholder="blur"
        quality={100}
        layout="fill"
        style={{
          aspectRatio: "16/9",
          zIndex: -1,
        }}
      />
    </div>
  );
}

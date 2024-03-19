import Image from "next/image";
import background from "/public/images/pixel.png";

export default function Background() {
    return (<Image className="max-h-screen"
    src={background}
    alt="Background"
    placeholder="blur"
    quality={100}
    fill
    sizes="100vw"
    style={{
      objectFit: "cover",
      zIndex: -1
    }}
  />);
}
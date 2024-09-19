import Image from "next/image";

export default function LoginLayout() {
  return (
    <div className="w-full h-screen flex flex-col justify-between p-20 bg-indigo-500">
      <Image
        src="/logo.png"
        width={80}
        height={80}
        className="hidden md:block"
        alt="develog logo"
      />
      <h3 className="text-white text-4xl leading-relaxed">
        Let's optimize
        <br /> our team's work
      </h3>
      <Image
        src="/illust.png"
        width={400}
        height={400}
        className="hidden md:block"
        alt="develog logo"
      />
    </div>
  );
}

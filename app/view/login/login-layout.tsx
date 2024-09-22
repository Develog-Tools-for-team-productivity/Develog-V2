import Image from "next/image";

export default function LoginLayout() {
  return (
    <div className="w-full h-screen flex flex-col justify-between p-20 bg-indigo-500">
      <div className="hidden md:block relative w-[80px] h-[80px]">
        <Image
          src="/logo.png"
          fill
          sizes="80px"
          style={{ objectFit: "contain" }}
          alt="develog logo"
          priority
        />
      </div>

      <h3 className="text-white text-4xl leading-relaxed">
        Let's optimize
        <br /> our team's work
      </h3>
      <div className="hidden md:block relative w-full max-w-[400px] h-[400px]">
        <Image
          src="/illust.png"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          style={{ objectFit: "contain" }}
          alt="Illustration"
          priority
        />
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Link href="/user/signup" className="flex items-center gap-4">
          <Image
            className="dark:invert cursor-pointer"
            src="/globe.svg"
            alt="Signup"
            width={50}
            height={50}
            priority
          />
          <span className="text-2xl">Sign Up</span>
        </Link>
      </main>
    </div>
  );
}

import { signIn } from "next-auth/client";
import Image from "next/image";

export const Login: React.FC = () => {
  // Run this function to provide next authentication
  const allowSignIn = () => {
    signIn();
  };

  return (
    <div className="grid place-items-center">
      <Image
        src="https://links.papareact.com/t4i"
        width={400}
        height={400}
        objectFit="contain"
      />
      <button
        onClick={allowSignIn}
        className="p-5 bg-gray-500 rounded-full text-white text-center cursor-pointer"
      >
        Login with Github
      </button>
    </div>
  );
};

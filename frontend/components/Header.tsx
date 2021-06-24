import { SearchIcon } from "@heroicons/react/outline";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  FlagIcon,
  HomeIcon,
  PlayIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  UserIcon,
  ViewGridAddIcon,
} from "@heroicons/react/solid";
import { signout } from "next-auth/client";
import Image from "next/image";
import React from "react";
import { HeaderIcon } from "./HeaderIcon";

interface Iprops {
  username: string;
  userImg?: string;
}

export const Header: React.FC<Iprops> = ({ username, userImg }) => {
  const allowSignOut = () => {
    signout();
  };

  return (
    <div className=" flex items-center sticky top-0 z-50 bg-white p-2 lg:px-5 shadow-md">
      {/* Left side */}
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        ></Image>
        <div className="flex  ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className=" hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      {/* Center side */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      {/* Right side */}
      <div className="flex items-center sm:space-x-2 justify-end">
        {/* Image */}
        {userImg ? (
          <Image
            onClick={allowSignOut}
            src={userImg}
            width="40"
            height="40"
            className="rounded-full cursor-pointer"
          ></Image>
        ) : (
          <HeaderIcon Icon={UserIcon} />
        )}
        <p className="whitespace-nowrap font-semibold pr-3 hidden lg:flex">
          {username}
        </p>
        <ViewGridAddIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  );
};

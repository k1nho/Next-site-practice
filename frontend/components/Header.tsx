import { SearchIcon } from "@heroicons/react/outline";
import {
  FlagIcon,
  HomeIcon,
  PlayIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import { HeaderIcon } from "./HeaderIcon";

export const Header: React.FC = () => {
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
            className="flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink"
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
    </div>
  );
};

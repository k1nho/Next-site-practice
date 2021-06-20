import Image from "next/image";

interface Iprops {
  key: string;
  name: string;
  message: string;
  image: string;
  postImage: string;
  timestamp: any;
}

export const Post: React.FC<Iprops> = ({
  key,
  name,
  message,
  image,
  postImage,
  timestamp,
}) => {
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
        <div className="flex items-center space-x-2">
          <img
            className="rounded-full"
            src={image}
            width={40}
            height={40}
            alt=""
          />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-400">
              {new Date(timestamp?.toDate()).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="pt-4">{message}</p>
      </div>
      {postImage && (
        <div className="relative h-56 md:h-96 bg-white">
          <Image src={postImage} objectFit="cover" layout="fill"></Image>
        </div>
      )}
    </div>
  );
};

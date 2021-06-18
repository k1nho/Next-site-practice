import { UserIcon } from "@heroicons/react/outline";
import {
  CameraIcon,
  EmojiHappyIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";
import firebase from "firebase";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { db, storage } from "../firebase";

interface Iprops {
  userImg: string;
  username: string;
}

export const InputBar: React.FC<Iprops> = ({ username, userImg }) => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const fileRef = useRef<null | HTMLInputElement>(null);
  const [imagePostState, setImagPostState] =
    useState<string | ArrayBuffer | null | undefined>(null);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputRef.current === null) return;

    db.collection("posts")
      .add({
        message: inputRef.current.value,
        name: username,
        image: userImg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imagePostState && typeof imagePostState === "string") {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imagePostState, "data_url");
          removeImage();
          uploadTask.on(
            "state_change",
            null,
            (error) => console.log(error),
            () => {
              storage
                .ref(`posts/${doc.id}`)
                .getDownloadURL()
                .then((url) =>
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  )
                );
            }
          );
        }
      });

    inputRef.current.value = "";
  };

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e.target.files[0] !== null) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImagPostState(readerEvent.target?.result);
    };
  };

  const removeImage = () => {
    setImagPostState(null);
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 items-center p-4">
        {userImg ? (
          <Image
            src={userImg}
            width={40}
            height={40}
            layout="fixed"
            className="rounded-full"
          />
        ) : (
          <UserIcon className="rounded-full" />
        )}
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            placeholder={`What's on your mind, ${username} ?`}
            ref={inputRef}
          />
          <button hidden type="submit" onClick={handlePost}>
            button
          </button>
        </form>
        {typeof imagePostState === "string" && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img className="h-10 object-contain" src={imagePostState} alt="" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div onClick={() => fileRef.current?.click()} className="inputIcon">
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo</p>
          <input onChange={addImageToPost} ref={fileRef} type="file" hidden />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:tex-base">Activity</p>
        </div>
      </div>
    </div>
  );
};

"use client";
import * as React from "react";
import { Avatar, AvatarProps } from "@files-ui/react";

const imageSrc = "/images/blank_profile.png";

export default function AvatarPicking() {
  const [imageSource, setImageSource] = React.useState<
    AvatarProps["src"] | undefined
  >(imageSrc);
  const handleChangeSource = (selectedFile: File) => {
    setImageSource(selectedFile);
  };
  return (
    <Avatar
      style={{ width: "160px", height: "160px" }}
      src={imageSource}
      smartImgFit={"center"}
      alt="Avatar"
      onChange={handleChangeSource}
      emptyLabel="Select your photo"
      changeLabel="Select your photo"
    />
  );
}

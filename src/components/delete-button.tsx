"use client";
import { deletePhoto } from "@/actions/action";
import prisma from "@/lib/db";
import Image from "next/image";
import React from "react";

const DeleteButton = ({photoId}:{photoId: string}) => {
  return (
    <button onClick={() => deletePhoto(photoId)}>
      <Image src={"/assets/icons/trash.svg"} width={18} height={18} alt={"trash icon"} />
    </button>
  );
};

export default DeleteButton;

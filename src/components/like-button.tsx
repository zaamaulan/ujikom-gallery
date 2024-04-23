"use client";

import React, { useOptimistic, useState, useTransition } from "react";
import Image from "next/image";

import { createLike } from "@/actions/action";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const LikeButton = ({
  liked,
  fotoId,
  className,
  totalLike,
}: {
  liked: boolean;
  fotoId: string;
  className?: string;
  totalLike: number;
}) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(liked || false);
  const [optimisticTotalLike, setOptimisticTotalLike] = useOptimistic(totalLike || 0);
  const [isPending, startTransition] = useTransition();

  const likeHandler = () => {
    setIsLiked((prevState) => !prevState);
    createLike({ fotoId: fotoId });
    startTransition(() => {
      setOptimisticTotalLike((prevState) => prevState + (isLiked ? -1 : 1));
    });
  };

  return (
    <button onClick={likeHandler} disabled={isPending} className={cn("flex gap-2 items-center", className)}>
      {session && isLiked ? (
        <Image src={"/assets/icons/love-fill.svg"} width={20} height={20} alt="love fill icon" />
      ) : (
        <Image src={"/assets/icons/love.svg"} width={20} height={20} alt="love icon" />
      )}
      <p>{optimisticTotalLike}</p>
    </button>
  );
};

export default LikeButton;

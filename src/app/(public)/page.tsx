import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";

import AddPhotoForm from "@/components/form/add-photo-form";
import LikeButton from "@/components/like-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { authOptions } from "@/services/auth";
import CommentForm from "@/components/form/comment-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const photos = await prisma.foto.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
      LikeFoto: {
        select: {
          userId: true,
        },
      },
      KomentarFoto: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <hgroup>
          <h1 className="text-2xl font-bold">Gallery Photo</h1>
          <p className="text-gray-600 max-w-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum excepturi aliquam incidunt voluptatem
            culpa?
          </p>
        </hgroup>

        <Dialog>
          <DialogTrigger asChild>
            <Button className={cn("flex gap-2", !session?.user.id && "hidden")}>
              <Image src={"/assets/icons/add.svg"} width={20} height={20} alt="add icon" />
              Upload Photo
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[20rem] p-6">
            <DialogHeader>
              <DialogTitle>Upload Photo</DialogTitle>
              <DialogDescription>
                Berbagi momen-momen spesial dengan kami! Silakan unggah foto favorit kamu
              </DialogDescription>
            </DialogHeader>
            <AddPhotoForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {photos.map((p) => (
          <figure key={p.id}>
            <Dialog>
              <DialogTrigger>
                <Image
                  src={p.path}
                  width={320}
                  height={320}
                  alt={p.title_foto}
                  className="rounded-lg object-cover w-64 h-40"
                />
              </DialogTrigger>
              <DialogContent className="min-w-[48rem]">
                <DialogHeader className="flex flex-row gap-6">
                  <div className="space-y-2 w-fit">
                    <Image
                      src={p.path}
                      width={320}
                      height={320}
                      alt={p.title_foto}
                      className="rounded-lg max-w-sm !w-full "
                    />
                    <DialogTitle className="font-bold text-lg max-w-sm">{p.title_foto}</DialogTitle>
                    <DialogDescription className="text-sm max-w-sm">{p.description_foto}</DialogDescription>
                    <p className="text-sm text-gray-600">uploaded by {p.user?.username}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 items-center mr-6">
                        <LikeButton liked={userId === p.LikeFoto[0]?.userId && userId !== undefined} fotoId={p.id} totalLike={p.LikeFoto.length} />

                        {/* <Image src={"/assets/icons/comment.svg"} width={20} height={20} alt="comment icon" /> */}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <div className="space-y-2 w-full">
                      <h4 className="font-semibold">Comment</h4>
                      <CommentForm fotoId={p.id} />
                    </div>
                    <Separator />
                    <ScrollArea className="space-y-2 h-[20rem]">
                      {p.KomentarFoto.map((c) => (
                        <div key={c.id} className="">
                          <div className="flex gap-2">
                            <p className="font-semibold">{c.user?.username ?? "anonim"}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(c.comment_date).toLocaleDateString("id-ID")}
                            </p>
                          </div>
                          <p className="max-w-sm">{c.comment}</p>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <figcaption className="p-2">
              <h3 className="font-bold text-lg line-clamp-2">{p.title_foto}</h3>
              <p className="text-sm line-clamp-2">{p.description_foto}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

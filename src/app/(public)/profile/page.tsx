import { Input } from "@/components/ui/input";
import prisma from "@/lib/db";
import { authOptions } from "@/services/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddPhotoForm from "@/components/form/add-photo-form";
import EditPhotoForm from "@/components/form/edit-photo-form";
import DeleteButton from "@/components/delete-button";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  
    const user = await prisma.user.findUnique({
      where: { id: session?.user.id ?? '' },
    });
    const liked = await prisma.likeFoto.findMany({
      where: { userId: session?.user.id ?? '' },
      include: {
        foto: true,
      },
    });
    const fotos = await prisma.foto.findMany({
      where: { userId: session?.user.id ?? '' },
    });
  

  const deletePhoto = async (photoId: string) => {
    // await prisma.komentarFoto.deleteMany({
    //   where: { fotoId: photoId },
    // });
    // await prisma.likeFoto.deleteMany({
    //   where: { fotoId: photoId },
    // });
    await prisma.foto.delete({
      where: { id: photoId },
    });
  };

  return (
    <div className="space-y-8">
      <hgroup>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-600 max-w-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum excepturi aliquam incidunt voluptatem culpa?
        </p>
      </hgroup>
      <div className="space-y-2">
        <h1 className="font-bold text-2xl">My Profile</h1>
        <div className=" flex gap-10">
          <div className="space-y-2">
            <div className="space-y-2">
              <p>username:</p>
              <Input readOnly className="" value={user?.username ?? "anonim"} />
            </div>
            <div className="space-y-2">
              <p>email:</p>
              <Input readOnly className="" value={user?.email ?? "anonim"} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="space-y-2">
              <p>full name:</p>
              <Input readOnly className="" value={user?.full_name ?? "anonim"} />
            </div>
            <div className="space-y-2">
              <p>alamat:</p>
              <Input readOnly className="" value={user?.address ?? "anonim"} />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <hgroup>
          <h1 className="text-2xl font-bold">Liked</h1>
          <p className="text-gray-600 max-w-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum excepturi aliquam incidunt voluptatem
            culpa?
          </p>
        </hgroup>
        <div className="grid grid-cols-4 gap-6">
          {liked.length > 0 ? (
            <>
              {liked.map((l) => (
                <figure key={l.id}>
                  <Image
                    src={l.foto!.path}
                    width={320}
                    height={320}
                    alt={l.foto!.title_foto}
                    className="rounded-lg object-cover w-64 h-40"
                  />
                </figure>
              ))}
            </>
          ) : (
            <p className="my-10">Kamu belum menyukai foto apapun</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <hgroup>
          <h1 className="text-2xl font-bold">Uploaded</h1>
          <p className="text-gray-600 max-w-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum excepturi aliquam incidunt voluptatem
            culpa?
          </p>
        </hgroup>
        <div className="grid grid-cols-4 gap-6">
          {fotos.length > 0 ? (
            <>
              {fotos.map((f) => (
                <Dialog key={f.id}>
                  <DialogTrigger>
                    {" "}
                    <Image
                      src={f.path}
                      width={320}
                      height={320}
                      alt={f.title_foto}
                      className="rounded-lg object-cover w-64 h-40"
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex justify-between">
                        Edit Photo <DeleteButton photoId={f.id} />
                      </DialogTitle>
                      <DialogDescription>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores, dolore. Iste cum
                        laudantium repudiandae.
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <EditPhotoForm data={f} />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </>
          ) : (
            <p className="my-10">Kamu belum upload foto</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

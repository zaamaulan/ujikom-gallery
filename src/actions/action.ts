"use server";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { writeFile } from "fs/promises";
import { join } from "path";

import prisma from "@/lib/db";
import { authOptions } from "@/services/auth";
import { revalidatePath } from "next/cache";

export const createNewUser = async (data: {
  username: string;
  email: string;
  fullName: string;
  address: string;
  password: string;
}) => {
  try {
    // hashing password
    const hashedPassword = await bcrypt.hash(data.password as string, 10);

    const existingUserByUsername = await prisma.user.findUnique({
      where: { username: data.username as string },
    });

    const existingUserByEmail = await prisma.user.findFirst({
      where: { email: data.email as string },
    });

    // cek apakah username sudah ada
    if (existingUserByUsername) {
      return { error: "Username already exists" };
    }

    // cek apakah email sudah ada
    if (existingUserByEmail) {
      return { error: "Email already exists" };
    }

    // buat user baru
    const newUser = await prisma.user.create({
      data: {
        username: data.username as string,
        email: data.email as string,
        full_name: data.fullName as string,
        address: data.address as string,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      throw new Error("Failed to create new user");
    }

  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throwing the error for higher-level error handling or logging
  }
};

export const createLike = async ({ fotoId }: { fotoId: string }) => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    // console.log(fotoId, userId);

    const isLiked = await prisma.likeFoto.findFirst({
      where: { fotoId: fotoId, userId: userId },
    });

    if (isLiked) {
      await prisma.likeFoto.deleteMany({
        where: { fotoId: fotoId, userId: userId },
      });
    } else {
      await prisma.likeFoto.create({
        data: {
          fotoId: fotoId,
          userId: userId,
        },
      });
    }
    revalidatePath("/profile");
  } catch (error) {
    console.error("Error creating like:", error);
    throw error;
  }
};

export const createComment = async ({ comment, fotoId }: { comment: string; fotoId: string }) => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    const createComment = await prisma.komentarFoto.create({
      data: {
        fotoId: fotoId,
        userId: userId,
        comment: comment,
        comment_date: new Date(),
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const uploadPhoto = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file: File = formData.get("photo") as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // console.log(title, description, file);

    const path = join("public/uploads/", file.name);
    await writeFile(path, buffer);

    const uploadPhoto = await prisma.foto.create({
      data: {
        title_foto: title,
        description_foto: description,
        path: `/uploads/${file.name}`,
        userId: userId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Error uploading an image:", error);
    throw error;
  }
};

export const editPhoto = async (formData: FormData) => {
  try {
    const id = formData.get("id") as string;
    const existingPhoto = await prisma.foto.findUnique({ where: { id } });

    const title = (formData.get("title") as string) || existingPhoto?.title_foto;
    const description = (formData.get("description") as string) || existingPhoto?.description_foto;
    const photo = formData.get("photo") as File;

    let pathToUpdate: string | undefined;

    if (photo.name !== "undefined") {
      // Convert photo to buffer
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Write photo buffer to file
      const path = join("public/uploads/", photo.name);
      await writeFile(path, buffer);

      // Set the path to the uploaded photo
      pathToUpdate = `/uploads/${photo.name}`;
    } else {
      // Use the existing photo path
      pathToUpdate = existingPhoto?.path;
    }

    // Update photo in the database
    const updatePhoto = await prisma.foto.update({
      where: { id: id },
      data: {
        title_foto: title,
        description_foto: description,
        path: pathToUpdate,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Error uploading an image:", error);
    throw error;
  }
};

export const deletePhoto = async (photoId: string) => {
  try {
    const deletedPhoto = await prisma.foto.delete({
      where: {
        id: photoId,
      },
    });
    console.log(`Foto dengan ID ${photoId} berhasil dihapus.`);
    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting photo:", error);
    throw error;
  }
};

"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { editPhoto } from "@/actions/action";

const EditPhotoForm = ({ data }: { data: any }) => {
  // Simpan data sebelumnya dalam state lokal
  // const [formData, setFormData] = useState({
  //   title: data.title_foto || "", // default value dari judul
  //   description: data.description_foto || "", // default value dari deskripsi
  //   photo: data.path || null, // default value dari foto
  // });

  // // Fungsi untuk mengubah state saat nilai input berubah
  // const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // // Fungsi untuk menangani submit form
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);

  //   const id = formData.get("id") as string;
  //   const title = formData.get("title") as string;
  //   const description = formData.get("description") as string;
  //   const photo = formData.get("photo") as File;
  //   await editPhoto(id, { title, description, photo });
  // }

  return (
    <form action={editPhoto} className="space-y-8">
      <input type="hidden" name="id" value={data.id} />
      <div className="space-y-2">
        <Label htmlFor="title">Judul:</Label>
        <Input placeholder={data.title_foto} name="title" id="title" type="text" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi:</Label>
        <Textarea placeholder={data.description_foto} name="description" id="description" className="resize-none" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="photo">Photo:</Label>
        {/* Karena input type file tidak dapat memiliki nilai default, tidak perlu menetapkan defaultValue */}
        <Input type="file" name="photo" id="photo" />
      </div>
      <Button type="submit">Upload Photo</Button>
    </form>
  );
};

export default EditPhotoForm;

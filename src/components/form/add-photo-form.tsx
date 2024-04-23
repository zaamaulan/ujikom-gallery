"use client";

import { uploadPhoto } from "@/actions/action";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const AddPhotoForm = () => {
  
  return (
    <form action={uploadPhoto} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="title">Judul:</Label>
        <Input placeholder="lorem ipsum" name="title" id="title" type="text" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi:</Label>
        <Textarea
          placeholder="lorem ipsum dolor sit amet"
          name="description"
          id="description"
          className="resize-none"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="photo">Photo:</Label>
        <Input type="file" name="photo" id="photo" />
      </div>
      <Button type="submit" >Upload Photo</Button>
    </form>
  );
};

export default AddPhotoForm;

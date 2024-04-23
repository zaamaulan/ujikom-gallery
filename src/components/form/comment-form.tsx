"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { createComment } from "@/actions/action";

const formSchema = z.object({
  comment: z.string().min(1, "Komentar tidak boleh kosong").max(200),
  fotoId: z.string(),
});

const CommentForm = ({ fotoId }: { fotoId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
      fotoId: fotoId,
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createComment(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 items-center !min-w-full"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Username</FormLabel>
              <FormControl className="min-w-full">
                <Input
                  placeholder="looks good!"
                  className="!mt-0 flex-1 !min-w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fotoId"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel className="sr-only">FotoId</FormLabel>
              <FormControl className="min-w-full">
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <input type="hidden" value={fotoId} name="fotoId" /> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CommentForm;

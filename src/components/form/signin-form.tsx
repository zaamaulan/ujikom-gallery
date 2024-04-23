"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
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

import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  email: z.string().min(1, "Email harus diisi").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password harus diisi")
    .min(8, "Password minimal memiliki 8 karakter"),
});

const SignInForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    const login = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (login?.error) {
      toast({
        title: "Error!",
        description: "Opps! Something went error",
      });
    } else {
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 mr-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <small>
          Belum punya akun? <a href="/auth/signup">Sign Up</a>
        </small>
        <Button type="submit" className="w-fit">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;

import React from "react";
import Image from "next/image";

import SignInForm from "@/components/form/signin-form";
import SignUpForm from "@/components/form/signup-form";

const SignUpPage = () => {
  return (
    <div className="flex gap-4 p-2 rounded-lg w-6/12 mx-auto bg-white">
      <Image
        src={"/assets/images/cover-signup.png"}
        width={320}
        height={320}
        alt="cover login"
        className="rounded-lg"
      />
      <div className="flex flex-col justify-center gap-8 p-4">
        <hgroup>
          <h1 className="font-bold text-4xl">Sign Up</h1>
          <p className="text-gray-600">
            Bergabunglah dengan kami! Daftar sekarang untuk membuat akun baru.
          </p>
        </hgroup>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;

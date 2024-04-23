import React from "react";
import Image from "next/image";

import SignInForm from "@/components/form/signin-form";

const SignInPage = () => {
  return (
    <div className="flex gap-4 p-2 rounded-lg w-5/12 mx-auto bg-white">
      <Image
        src={"/assets/images/cover-login.png"}
        width={320}
        height={320}
        alt="cover login"
        className="rounded-lg"
      />
      <div className="flex flex-col justify-center gap-8 p-4">
        <hgroup>
          <h1 className="font-bold text-4xl">Login</h1>
          <p className="text-gray-600">
            Selamat datang kembali! Silakan masuk untuk mengakses akun Anda.
          </p>
        </hgroup>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;

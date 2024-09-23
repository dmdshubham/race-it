"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import fetcher from "@/dataProvider";
import { setAuthCookies } from "@/utils/login";

export default function SigninWithPassword() {
  const [data, setData] = useState({
    mobile: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({ mobile: false, password: false });

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { mobile, password } = data;

    // Reset errors before validation
    setErrors({ mobile: false, password: false });

    let hasErrors = false;

    // Simple validation logic
    if (!mobile) {
      setErrors((prev) => ({ ...prev, mobile: true }));
      hasErrors = true;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: true }));
      hasErrors = true;
    }

    if (!hasErrors) {
      // Log the current path for debugging purposes
      console.log(`Current Path: ${pathname}`);

      // If successful, navigate to the 'unassigned' page

      let obj = {
        mobile: data?.mobile,
        password: data?.password,
      };
      loginApi(obj);
    }
  };
  const { mutate: loginApi } = useMutation({
    mutationFn: (req: object) => fetcher.post("/api/v1/auth/login", req),
    onSuccess: ({ data }) => {
      console.log("🚀 ~ SigninWithPassword ~ data:", data.data);
      setAuthCookies(data.data);
      router.refresh();
      router.push("/unassigned");
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="mobile"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Mobile
        </label>
        <div className="relative">
          <input
            type="number"
            placeholder="Enter your mobile"
            name="mobile"
            className={`w-full rounded-lg border ${
              errors.mobile ? "border-red-500" : "border-stroke"
            } bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary`}
            value={data.mobile}
            onChange={(e) => setData({ ...data, mobile: e.target.value })}
          />
          {errors.mobile && (
            <p className="mt-2 text-sm text-red-500">mobile is required</p>
          )}
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="password"
            className={`w-full rounded-lg border ${
              errors.password ? "border-red-500" : "border-stroke"
            } bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary`}
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-500">Password is required</p>
          )}
        </div>
      </div>

      <div className="mb-4.5 pt-6">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}

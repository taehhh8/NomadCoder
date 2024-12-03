"use client";

import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { userSchema } from "@/lib/validation";

export default function CreateAccount() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate with Zod
      const validation = userSchema.safeParse({ username, password });
      if (!validation.success) {
        setError(validation.error.errors[0].message);
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/auth/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      router.push("/log-in");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요!</h1>
        <h2 className='text-xl'>Fill in the form below to join!</h2>
      </div>
      <form onSubmit={onSubmit} className='flex flex-col gap-3'>
        <div className='flex flex-col gap-2'>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400'
            type='text'
            placeholder='Username'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400'
            type='password'
            placeholder='Password'
          />
        </div>
        {error && <span className='text-red-500 text-sm'>{error}</span>}
        <button
          type='submit'
          disabled={isLoading}
          className={`primary-btn h-10 transition-all duration-200 ${
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {isLoading ? (
            <div className='flex items-center justify-center gap-2'>
              <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
              <span>Creating...</span>
            </div>
          ) : (
            "Create account"
          )}
        </button>
      </form>
      <div className='w-full h-px bg-neutral-300' />
      <div>
        <Link
          className='primary-btn flex h-10 items-center justify-center gap-2 transition-all duration-200 hover:opacity-90'
          href='/sms'
        >
          <ChatBubbleOvalLeftEllipsisIcon className='h-6 w-6' />
          <span>Sign up with SMS</span>
        </Link>
      </div>
    </div>
  );
}

"use client";

import { createTweet } from "@/lib/action";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className='primary-btn px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed'
    >
      {pending ? "Posting..." : "Tweet"}
    </button>
  );
}

export default function AddTweet() {
  const [state, formAction] = useFormState(createTweet, null);

  return (
    <form action={formAction} className='border-b border-neutral-200 p-4'>
      <div className='flex flex-col gap-4'>
        <textarea
          name='content'
          placeholder="What's happening?"
          className='w-full resize-none bg-transparent p-2 focus:outline-none h-24 border rounded-lg'
        />
        {state?.error && <p className='text-red-500 text-sm'>{state.error}</p>}
        <div className='flex justify-end'>
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}

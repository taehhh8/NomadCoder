"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useState } from "react";
import { FireIcon, UserIcon, LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

// 상태 타입 정의
interface LoginState {
  message: string | null;
  success: boolean;
}

// 서버 액션 정의
const loginAction = async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
  const password = formData.get("password");

  // 비밀번호 검증
  if (password === "12345") {
    return { success: true, message: "Welcome back!" };
  }
  return { success: false, message: "Invalid credentials" };
};

// 제출 버튼 컴포넌트
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className='primary-btn h-10' disabled={pending}>
      {pending ? "Loading..." : "Login"}
    </button>
  );
}

export default function Login() {
  const [state, formAction] = useActionState(loginAction, {
    message: null,
    success: false,
  });

  // 폼 입력값을 위한 상태 추가
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  // 폼 제출 핸들러 - formAction 직접 사용
  const handleSubmit = async (formData: FormData) => {
    await formAction(formData);
  };

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex justify-center items-center'>
        <FireIcon className='size-14' color='orange' />
      </div>

      <form action={handleSubmit} className='flex flex-col gap-3'>
        <div className='flex flex-col gap-6 '>
          {/* Email Input with Icon */}
          <div className='relative'>
            <EnvelopeIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400' />
            <input
              className='bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 pl-10'
              type='email'
              name='email'
              placeholder='Email'
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Username Input with Icon */}
          <div className='relative'>
            <UserIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400' />
            <input
              className='bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 pl-10'
              type='text'
              name='username'
              placeholder='Username'
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* Password Input with Icon */}
          <div className='relative'>
            <LockClosedIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400' />
            <input
              className='bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 pl-10'
              type='password'
              name='password'
              placeholder='Password'
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <SubmitButton />

        {state?.message && (
          <span className={`text-center font-medium ${state.success ? "text-green-500" : "text-red-500"}`}>
            {state.message}
          </span>
        )}
      </form>
    </div>
  );
}

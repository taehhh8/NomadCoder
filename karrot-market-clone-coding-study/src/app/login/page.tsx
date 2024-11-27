"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useState } from "react";
import { FireIcon, UserIcon, LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { z } from "zod";
import FormInput from "@/components/form-input";

// Zod 스키마 정의
const loginSchema = z.object({
  email: z.string().email().endsWith("@zod.com", { message: "Only @zod.com emails are allowed" }),
  username: z.string().min(5, { message: "Username should be at least 5 characters long" }),
  password: z
    .string()
    .min(10, { message: "Password should be at least 10 characters long" })
    .regex(/[0-9]/, { message: "Password should contain at least one number(123456789)" }),
});

// 상태 타입 정의
interface LoginState {
  message: string | null;
  success: boolean;
  errors?: {
    email?: string[];
    username?: string[];
    password?: string[];
  };
}

// 서버 액션 정의
const loginAction = async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
  try {
    const validatedFields = loginSchema.safeParse({
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // 검증 성공 후 추가 로직
    return { success: true, message: "Welcome back!" };
  } catch (error: unknown) {
    // error를 콘솔에 로깅하거나
    console.error("Login error:", error);

    return { success: false, message: "An unexpected error occurred" };
  }
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
    errors: {},
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
        <div className='flex flex-col gap-6'>
          <FormInput
            type='email'
            name='email'
            placeholder='Email'
            required={true}
            value={formData.email}
            onChange={handleChange}
            errors={state.errors?.email || []}
            icon={<EnvelopeIcon />}
          />

          <FormInput
            type='text'
            name='username'
            placeholder='Username'
            required={true}
            value={formData.username}
            onChange={handleChange}
            errors={state.errors?.username || []}
            icon={<UserIcon />}
          />

          <FormInput
            type='password'
            name='password'
            placeholder='Password'
            required={true}
            value={formData.password}
            onChange={handleChange}
            errors={state.errors?.password || []}
            icon={<LockClosedIcon />}
          />
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

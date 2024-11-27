interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
  name: string; // name 속성 추가
  value: string; // value 속성 추가
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange 핸들러 추가
  icon?: React.ReactNode; // 아이콘을 위한 prop 추가
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
  name,
  value,
  onChange,
  icon,
}: FormInputProps) {
  return (
    <div className='flex flex-col gap-1'>
      <div className='relative'>
        {icon && <div className='absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400'>{icon}</div>}
        <input
          className='bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 pl-10'
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />
      </div>
      {errors?.map((error, index) => (
        <span key={index} className='text-red-500 text-sm'>
          {error}
        </span>
      ))}
    </div>
  );
}

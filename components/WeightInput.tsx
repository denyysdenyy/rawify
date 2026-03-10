'use client'

type WeightInputProps = {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export default function WeightInput({
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
}: WeightInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={`text-[11px] font-semibold tracking-widest uppercase ${disabled ? 'text-gray-200' : 'text-gray-400'}`}>
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`
            w-full rounded-2xl px-4 py-3.5
            text-base font-medium
            border border-transparent
            transition-all duration-200
            [appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
            ${disabled
              ? 'bg-[#F8F8F8] text-gray-200 placeholder-gray-200 cursor-not-allowed'
              : 'bg-[#F2F2F7] text-gray-800 placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:bg-white'
            }
          `}
        />
        <span className={`absolute right-4 top-1/2 -translate-y-1/2 font-medium ${disabled ? 'text-gray-200' : 'text-gray-300'}`}>
          г
        </span>
      </div>
    </div>
  )
}
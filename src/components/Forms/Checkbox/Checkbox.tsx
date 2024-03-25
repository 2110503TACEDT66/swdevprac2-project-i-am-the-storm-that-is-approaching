import { twMerge } from "tailwind-merge";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "title"> {
  label?: string;
  title?: React.ReactNode;
  description?: string;
  labelClassName?: string;
  parentClassName?: string;
}

export const Checkbox = ({
  label,
  title,
  description,
  className,
  labelClassName,
  parentClassName,
  ...props
}: CheckboxProps) => {
  return (
    <label
      className={twMerge(
        "flex w-fit cursor-pointer select-none items-center gap-x-3 py-1",
        parentClassName
      )}
    >
      <input
        className={twMerge(
          `${
            description ? "mb-4" : ""
          } focus:ring-1.5 h-4 w-4 rounded border-gray-300 text-green-600 accent-green-600 focus:ring-green-600 sm:mt-0`,
          className
        )}
        name="notification"
        type="checkbox"
        {...props}
      />
      <div className="flex flex-col items-start">
        <span className={twMerge("text-sm font-medium", labelClassName)}>
          {title || label}
        </span>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </label>
  );
};

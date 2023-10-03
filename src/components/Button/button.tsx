import { ButtonProps } from "@/types";

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "contained",
  loading = false,
  iconLeft,
  iconRight,
  size = "md", // Default size is 'md'
  ...props
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-2 py-1 text-sm";
      case "lg":
        return "px-6 py-3 text-lg";
      default:
        return "px-4 py-2 text-base";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "outlined":
        return "border border-blue-500 text-blue-500 hover:bg-blue-100";
      case "text":
        return "text-blue-500 hover:bg-blue-100";
      default:
        return "bg-blue-500 text-white hover:bg-blue-600";
    }
  };

  return (
    <button
      {...props}
      className={`relative overflow-hidden flex items-center justify-center space-x-2 rounded focus:outline-none focus:ring relative ${
        loading ? "opacity-50 pointer-events-none" : ""
      } ${getVariantClasses()} ${getSizeClasses()}`}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-blue-500 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291a7.962 7.962 0 01-2-4.291h-4c0 4.418 3.582 8 8 8v-4a7.96 7.96 0 01-2-3.709z"
          ></path>
        </svg>
      ) : (
        children
      )}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};

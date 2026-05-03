export const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

export const inputClass = [
    "w-full px-4 py-2.5 text-sm rounded-xl",
    "border border-gray-200 dark:border-gray-700",
    "bg-white dark:bg-gray-800",
    "text-gray-900 dark:text-white",
    "placeholder:text-gray-400 dark:placeholder:text-gray-500",
    "outline-none transition-all duration-200",
    "hover:border-indigo-400 dark:hover:border-indigo-500",
    "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10",
    "dark:focus:border-indigo-400",
].join(" ");

// If you need variations in future:
export const inputClassWithError = [
    ...inputClass.split(" "),
    "border-red-500",  // Red border for errors
    "focus:ring-red-500/10",  // Red ring on focus
].join(" ");

export const largeInputClass = [
    "w-full px-4 py-3 text-base rounded-xl",  // Larger padding & text
    "border border-gray-200 dark:border-gray-700",
    "bg-white dark:bg-gray-800",
    "text-gray-900 dark:text-white",
    "placeholder:text-gray-400 dark:placeholder:text-gray-500",
    "outline-none transition-all duration-200",
    "hover:border-indigo-400 dark:hover:border-indigo-500",
    "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10",
    "dark:focus:border-indigo-400",
].join(" ");
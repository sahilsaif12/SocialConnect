import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function showErrorToasts(err: unknown, closeBtn: boolean = false, dismissible: boolean = true): string {
  if (err instanceof Error) {
    toast.error(err.message);
  }
  // return String(err);

  if (err && typeof err === 'object' && err !== null) {
    console.log("err", err);

    Object.entries(err).forEach(([field, messages]) => {
      // Skip non-array values and the 'message' property
      if (Array.isArray(messages) && field !== 'message') {

        toast.error(messages[0], {
          dismissible: false,
          duration: Infinity,
          style: {
            color: 'white',
            border: '1px solid gray',
          },
          action: {
            label: "Close",
            onClick: () => toast.dismiss(), // This makes close button work
          },
        })
      }
    });

  } else {
    // Fallback for other error formats
    toast.error("something went wrong")
  }

}
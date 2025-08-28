import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function showErrorToasts(err: unknown, closeBtn: boolean = false, dismissible: boolean = true): void {
  if (err instanceof Error) {
    toast.error(err.message);
  }

  
  if (err && typeof err === 'object' && err !== null) {
    console.log("err", err);

    Object.entries(err).forEach(([field, messages]) => {

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
            onClick: () => toast.dismiss(), 
          },
        })
      }
    });

  } else {

    toast.error("something went wrong")
  }

}
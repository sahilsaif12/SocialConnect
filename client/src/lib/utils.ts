import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function showErrorToasts(err: unknown, ): void {
  if (err instanceof Error) {
    toast.error(err.message);
  }

  
  if (err && typeof err === 'object' && err !== null) {

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



export function formatDateToMonthYear(dateString: string): string {
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  
  return `${month} ${year}`;
}

export function formatNumberMinimal(number: number): string {
  if (number < 1000) {
    return number.toString();
  }
  
  if (number < 1000000) {
    // Thousands
    const thousands = number / 1000;
    return `${thousands % 1 === 0 ? thousands : thousands.toFixed(1)}k`;
  }
  
  if (number < 1000000000) {
    // Millions
    const millions = number / 1000000;
    return `${millions % 1 === 0 ? millions : millions.toFixed(1)}M`;
  }
  
  // Billions
  const billions = number / 1000000000;
  return `${billions % 1 === 0 ? billions : billions.toFixed(1)}B`;
}


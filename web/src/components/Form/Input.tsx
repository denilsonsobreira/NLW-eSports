//read https://www.thisdot.co/blog/how-to-create-reusable-form-components-with-react-hook-forms-and-typescript

import { FC, forwardRef, InputHTMLAttributes } from "react";
import { useController } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    
}
export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(({...props }, ref) => {
    return (
        <input 
            {...props}
            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" 
            ref={ref}
        />
    )
})

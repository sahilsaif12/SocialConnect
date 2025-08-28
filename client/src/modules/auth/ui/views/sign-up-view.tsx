"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OctagonAlertIcon, X } from "lucide-react";
import Link from "next/link";


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerSchema } from "@/schemas/authSchema";
import { apiRequest } from "@/lib/api";
import LogoBannerCard from "../components/logo-banner-card";
import { showErrorToasts } from "@/lib/utils";
import { toast } from "sonner";



export const SignUpView = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isloading, setisloading] = useState<boolean>(false)
    const [success, setSuccess] = useState(false);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            username: "",
        }
    });

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        
        setisloading(true);
        try {
            await apiRequest("/register/", {
                method: "POST",
                body: JSON.stringify(data),
            });
            setSuccess(true);
        } catch (err: any) {
            console.log("err 0",err);
            
            // showErrorToasts(err, true, false);

        }

        setisloading(false);
    };



    return (
        <div className="flex flex-col gap-6">

            <Card className="overflow-hidden shadow-lg p-0">
                <CardContent className="grid p-0 md:grid-cols-2   ">
                    {success ?

                        <div className="flex justify-center flex-col   min-h-[60vh]">

                            <p className=" p-4 font-medium text-black/70 text-center">
                                We’ve sent a verification link to your email.<br />
                                Please check your inbox to verify and activate your account.
                            </p>
                        </div>

                        :

                        <Form {...form} >

                            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-2xl font-bold">Wellcome back</h1>
                                        <p className="text-muted-foreground text-balance">Please log in to your account</p>
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name='first_name'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="John"
                                                            type="text"
                                                            {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='last_name'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Doe"
                                                            type="text"
                                                            {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='email'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="xyz@example.com"
                                                            type="email"
                                                            {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='username'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="alex_32"
                                                            type="text"
                                                            {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='password'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="********"
                                                            type="password"
                                                            {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {!!error && (
                                        <Alert className="bg-destructive/20 border-none">
                                            <OctagonAlertIcon className="h-4 w-4 !text-destructive/60" />
                                            <AlertTitle className="text-black/50">
                                                {error}
                                            </AlertTitle>
                                        </Alert>
                                    )}

                                    <Button className="w-full cursor-pointer" type="submit"
                                        disabled={isloading}
                                    >
                                        Sign In
                                        {isloading && (
                                            <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                width="24" height="24">
                                                <path
                                                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                                    stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path
                                                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                                    stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                                                </path>
                                            </svg>
                                        )}
                                    </Button>

                                    <div className="text-center text-sm">
                                        Already have an account?{" "}
                                        <Link href="/sign-in" className="underline underline-offset-4 ">
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    }
                    <LogoBannerCard />
                </CardContent>
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 ">

                By continuing, you agree to our <a href="#" >Terms of services</a> and <a href="#" >Privacy Policy</a>.
            </div>
        </div>
    );
}
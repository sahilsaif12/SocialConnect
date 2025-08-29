"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RegisterInput, registerSchema } from "@/schemas/authSchema";
import { apiRequest } from "@/lib/api";
import LogoBannerCard from "../components/logo-banner-card";
import { Loader } from "@/components/Loader";

export const SignUpView = () => {
    const [isloading, setisloading] = useState<boolean>(false)
    const [success, setSuccess] = useState(false);

    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            username: "",
        }
    });

    const onSubmit = async (data: RegisterInput) => {

        setisloading(true);
        try {
            await apiRequest("/auth/register/", {
                method: "POST",
                body: JSON.stringify(data),
            });
            setSuccess(true);
        } catch (err) { } 

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
                                        <h1 className="text-2xl font-bold">Let&apos;s get started</h1>
                                        <p className="text-muted-foreground text-balance">Create your account</p>
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


                                    <Button className="w-full cursor-pointer " type="submit"
                                        disabled={isloading}
                                    >
                                        Sign Up
                                        {isloading && (
                                            <Loader/>
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
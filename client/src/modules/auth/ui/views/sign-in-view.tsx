"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Cookies from 'js-cookie';


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginInput, loginSchema } from "@/schemas/authSchema";
import { apiRequest } from "@/lib/api";
import LogoBannerCard from "../components/logo-banner-card";
import { Loader } from "lucide-react";



export const SignInView = () => {
    const router = useRouter()
    const [isloading, setisloading] = useState<boolean>(false)

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        }
    });

    const onSubmit = async (data: LoginInput) => {

        setisloading(true);
        try {
            const res: {
                access: string;
                refresh: string;
                data: {}
            } = await apiRequest("/login/", {
                method: "POST",
                body: JSON.stringify(data),
            });
            console.log("login res", res);

            Cookies.set('access_token', res.access, {
                secure: true,
                sameSite: 'strict'
            });

            Cookies.set('refresh_token', res.refresh, {
                secure: true,
                sameSite: 'strict'
            });
            router.push("/")
        } catch (err: any) { }

        setisloading(false);
    };



    return (
        <div className="flex flex-col gap-6">

            <Card className="overflow-hidden shadow-lg p-0">
                <CardContent className="grid p-0 md:grid-cols-2   ">


                    <Form {...form} >

                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Let's get started</h1>
                                    <p className="text-muted-foreground text-balance">Create your account</p>
                                </div>
                                <div className="grid gap-3">

                                    <FormField
                                        control={form.control}
                                        name='identifier'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>User ID</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="email or username"
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
                                    Sign In
                                    {isloading && (
                                        <Loader/>
                                    )}
                                </Button>

                                <div className="text-center text-sm">
                                    Don't have an account?{" "}
                                    <Link href="/sign-up" className="underline underline-offset-4 ">
                                        Sign Up
                                    </Link>
                                </div>
                                <div className="text-center text-muted-foreground text-md">
                                    
                                    <Link href="/forgot-password">
                                        Forgot Password ?
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>

                    <LogoBannerCard height={60} />
                </CardContent>
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 ">

                By continuing, you agree to our <a href="#" >Terms of services</a> and <a href="#" >Privacy Policy</a>.
            </div>
        </div>
    );
}
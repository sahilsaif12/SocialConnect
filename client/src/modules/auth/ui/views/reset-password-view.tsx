"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LogoBannerCard from "../components/logo-banner-card";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/Loader";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordResetInput, passwordResetSchema } from "@/schemas/authSchema";
import { CircleCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";


interface ResetPasswordProps {
    uid: string;
    token: string;
}
export default function ResetPasswordView({ uid, token }: ResetPasswordProps) {
    const [isloading, setisloading] = useState<boolean>(false)
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const [message, setmessage] = useState<string>("");
    const form = useForm<PasswordResetInput>({
        resolver: zodResolver(passwordResetSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });
    console.log(uid, token);


    const onSubmit = (data: PasswordResetInput) => {

        setisloading(true);
        apiRequest(`/auth/password-reset-confirm/`, {
            method: "POST",
            body: JSON.stringify({ ...data, uid, token })
        })
            .then((value) => {
                const data = value as { message: string };
                setSuccess(true);
                setmessage(data.message);
                setTimeout(() => {
                    router.push("/sign-in")
                }, 2000);
            })
            .catch(() => { })
            .finally(() => {
                setisloading(false);
            });
    }



    return (
        <div className="flex flex-col gap-6">

            <Card className="overflow-hidden shadow-xl p-0">
                <CardContent className="grid p-0 md:grid-cols-2   ">
                    {success ?
                        <>
                            <div className="text-center flex flex-col h-full p-2 gap-3 justify-center items-center">
                                <CircleCheckBig className="size-10 text-green-500" />
                                <p className="font-medium text-muted-foreground">{message}</p>
                                <p className="text-muted-foreground   text -sm text-center">Let&apos;s sign with your new credentials</p>
                            </div>

                        </>

                        :
                        <Form {...form} >

                            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-center text-center">
                                        <p className="text-muted-foreground text-balance">Create your new password</p>
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name='password'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>New Password</FormLabel>
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
                                        <FormField
                                            control={form.control}
                                            name='confirmPassword'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirm Password</FormLabel>
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
                                        save
                                        {isloading && (
                                            <Loader />
                                        )}
                                    </Button>

                                </div>
                            </form>
                        </Form>
                    }
                    <LogoBannerCard height={40} />
                </CardContent>
            </Card>


        </div>
    );
}

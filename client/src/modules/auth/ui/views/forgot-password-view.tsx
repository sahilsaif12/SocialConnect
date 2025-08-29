"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LogoBannerCard from "../components/logo-banner-card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";

export default function ForgotPasswordView() {
    const [isloading, setisloading] = useState<boolean>(false)
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setmessage] = useState<string>('');


    const onSubmit = () => {
        setisloading(true);


        if (!email) {
            setisloading(false);
            toast.warning("Please enter a valid email address", { position: 'top-right' });
            return
        }
        apiRequest(`/auth/password-reset/`, {
            method: "POST",
            body: JSON.stringify({ email })
        })
            .then((value) => {
                const data = value as { message: string };
                setSuccess(true);
                setmessage(data.message);
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
                    <div className="p-4 flex flex-col gap-6 justify-center">
                        {success ?
                            <p className="font-medium text-muted-foreground text-center text-sm ">{message} </p>
                            :
                            <>

                                <Input
                                    placeholder="Enter your email"
                                    type="email"
                                    className="col-span-2 border-2 border-gray-400/60"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button className="w-full cursor-pointer " onClick={onSubmit}
                                    disabled={isloading}
                                >
                                    Confirm email
                                    {isloading && (
                                       <Loader/>
                                    )}
                                </Button>
                            </>
                        }
                    </div>

                    <LogoBannerCard height={40} />
                </CardContent>
            </Card>


        </div>
    );
}

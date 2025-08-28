"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { CircleCheckBig } from "lucide-react";

export default function VerifyEmailView() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<"pending" | "success" | "failed">(
        "pending"
    );

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            setStatus("failed");
            return;
        }

        apiRequest(`/verify-email/?token=${token}`, {
            method: "POST",
        })
            .then(() => {
                setStatus("success")
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
            })
            .catch(() => setStatus("failed"));
    }, [searchParams]);

    if (status === "pending") {
        return <p className="text-gray-600 text-center">Verifying your email...</p>;
    }

    if (status === "success") {
        return (
            <>
            
            <div className="text-center flex gap-3 justify-center items-center">
                <CircleCheckBig className="size-6 text-green-500" />
                <p className="text-green-700 font-medium"> Email verified successfully!</p>
            </div>
                    <p className="text-muted-foreground  text-center">Let's sign in to access your account</p>
            </>
        );
    }

    return (
        <p className="text-red-400 font-medium  text-center">
            Verification failed. The link may be invalid or expired.
        </p>
    );
}

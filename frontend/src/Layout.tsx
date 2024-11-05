import { Clipboard } from "lucide-react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="w-full flex flex-col items-center max-w-md space-y-8">
                <div className="flex justify-center">
                    <Clipboard className="h-16 w-16 text-primary" aria-hidden="true" />
                    <span className="sr-only">Easy Clipboard</span>
                </div>
                <h1 className="text-2xl font-bold text-center text-foreground">Easy Clipboard</h1>
                <Outlet />
            </div>
        </div>
    )
}

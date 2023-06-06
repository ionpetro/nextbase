import { Children, isValidElement, ReactNode } from "react";
import { Navigation } from "./Navigation"
import './layout.css'
import { Header } from "./Navbar";

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return <div>
        <Header />
        <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
            <div className="hidden lg:relative lg:block lg:flex-none">
                <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
                <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
                <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
                <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
                    <Navigation />
                </div>
            </div>
            {children}
        </div>
    </div>
}
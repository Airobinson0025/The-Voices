import Link from "next/link"
import { Button } from "../ui/button"

export function Hero() {
    return (
        <section className="flex items-center justify-center h-[600px] px-10">
            <div className="text-center space-y-7 sm:space-y-6">
                <h1 className="text-5xl lg:text-6xl tracking-tight">Find your<span className="pl-3">voice.</span></h1>
                <p className="text-md lg:text-lg max-w-3xl leading-7">Express your thoughts freely in a space where anonymity meets community. Share your journey, find connection in others&apos; stories, and discover the power of words without the weight of identity.</p>
                <Link href='/signup'>
                    <Button size='xl'>Write your story</Button>
                </Link>
            </div>
        </section>
    )
}
import Link from "next/link";
import { TextAnimate } from "../magicui/text-animate";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

export function Hero() {
  return (
    <section className="flex items-center justify-center h-[600px] pt-12">
      <div className="text-center space-y-7">
        <div className="space-y-2">
          <TextAnimate
            animation="blurInUp"
            by="character"
            duration={1}
            className="font-semibold text-5xl md:text-6xl tracking-tight"
          >
            Tell Your Story
          </TextAnimate>
          <TextAnimate
            animation="blurIn"
            by="character"
            duration={0.5}
            delay={1.3}
            className="font-semibold text-5xl text-indigo-500 sm:text-5xl md:text-6xl tracking-tight"
          >
            Privately.
          </TextAnimate>
        </div>
        <Link href="/auth/register">
          <InteractiveHoverButton className="tracking-tight lg:text-lg">
            Get Started
          </InteractiveHoverButton>
        </Link>
      </div>
    </section>
  );
}

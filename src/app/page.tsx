import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Studio from "@/components/Studio";
import Process from "@/components/Process";
import BlueprintSlider from "@/components/BlueprintSlider";
import Gallery from "@/components/Gallery";
import Testimonial from "@/components/Testimonial";
import Globe from "@/components/Globe";
import Footer from "@/components/Footer";
import NarrativeBreak from "@/components/NarrativeBreak";
import PressMarquee from "@/components/PressMarquee";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Press & Pedigree Marquee */}
      <PressMarquee />

      {/* Chapter 1: The Vision */}
      <Manifesto />
      <Studio />

      {/* Narrative Transition */}
      <NarrativeBreak
        topLabel="[ FROM VISION TO STRUCTURE ]"
        mainText="THE ANATOMY OF"
        serifText="raw space"
        bottomNote="CHAPTER II — IDEATION & CRAFT"
      />

      {/* Chapter 2: The Method */}
      <Process />
      <BlueprintSlider />

      {/* Narrative Transition */}
      <NarrativeBreak
        topLabel="[ REALIZED WORKS ]"
        mainText="ARCHITECTURE"
        serifText="in focus"
        bottomNote="CHAPTER III — TANGIBLE REALITY"
      />

      {/* Chapter 3: The Work */}
      <Gallery />
      <Testimonial />

      {/* Chapter 4: Global Reach */}
      <Globe />
      <Footer />
    </main>
  );
}

import { ArrowUp } from "lucide-react";
import { useScrolled } from "../../hooks/use-motion";

export function ScrollToTopButton() {
  const visible = useScrolled(600);

  const handleClick = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Sayfanın başına dön"
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#1B3A8F] text-white shadow-lg shadow-black/20 flex items-center justify-center transition-all duration-300 hover:bg-[#2547B5] hover:-translate-y-0.5 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" strokeWidth={2.25} />
    </button>
  );
}

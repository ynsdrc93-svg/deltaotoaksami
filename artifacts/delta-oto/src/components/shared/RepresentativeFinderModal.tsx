import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Mail, Phone, X } from "lucide-react";
import { cities } from "turkey-map-react/lib/data";
import { representativesForProvince, GENERAL_CONTACT, type Representative } from "@/lib/representatives";
import { TURKEY_PROVINCES, provinceByPlate } from "@/lib/turkey-regions";
import { PROVINCE_LABELS } from "@/lib/province-labels";
import type { Lang } from "@/lib/i18n";
import "./representative-finder.css";

const paths = new Map(cities.map(city => [city.plateNumber, city.path]));
const UI = {
  title: { tr: "Satış temsilcinizi bulun", en: "Find your sales representative" },
  hint: { tr: "Haritadan ilinizi seçin.", en: "Select your province on the map." },
  pan: { tr: "Haritayı sağa veya sola kaydırabilirsiniz.", en: "Swipe left or right to explore the map." },
  close: { tr: "Kapat", en: "Close" },
  map: { tr: "Türkiye illeri", en: "Provinces of Türkiye" },
  previous: { tr: "Önceki temsilci", en: "Previous representative" },
  next: { tr: "Sonraki temsilci", en: "Next representative" },
  general: { tr: "Genel satış", en: "General sales" },
};

function telHref(phone: string) {
  return `tel:+90${phone.replace(/\s+/g, "").replace(/^0/, "")}`;
}

function RepresentativeCard({ rep, lang }: { rep: Representative; lang: Lang }) {
  const side = rep.side && (lang === "tr" ? `${rep.side} Yakası` : rep.side === "Avrupa" ? "European Side" : "Anatolian Side");
  return (
    <article className="rep-card">
      <div className="rep-card-person">
        <img src={`${import.meta.env.BASE_URL}images/representatives/${rep.id}.webp`} alt={rep.name} width="400" height="480" />
        <div>
          <h4>{rep.name}</h4>
          <p>{[rep.general ? UI.general[lang] : rep.channel, side].filter(Boolean).join(" · ")}</p>
        </div>
      </div>
      <a href={telHref(rep.phone)}><Phone aria-hidden="true" />{rep.phone}</a>
      <a href={`mailto:${rep.email}`}><Mail aria-hidden="true" />{rep.email}</a>
    </article>
  );
}

function Representatives({ plate, lang }: { plate: number; lang: Lang }) {
  const province = provinceByPlate(plate)!;
  const reps = representativesForProvince(plate);
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.parentElement?.scrollIntoView({ block: "nearest", inline: "nearest" });
    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); el.removeEventListener("scroll", update); };
  }, []);

  function advance(direction: number) {
    const el = rail.current;
    if (!el || !el.firstElementChild) return;
    const step = el.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap);
    el.scrollBy({ left: direction * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section className="rep-results" aria-label={province.name}>
      <div className="rep-results-header">
        <h3 aria-live="polite">{province.name} <span>{reps.length} {lang === "tr" ? "temsilci" : reps.length === 1 ? "representative" : "representatives"}</span></h3>
        {!(edges.start && edges.end) && <div className="rep-controls">
          <button type="button" disabled={edges.start} onClick={() => advance(-1)} aria-label={UI.previous[lang]}><ArrowLeft /></button>
          <button type="button" disabled={edges.end} onClick={() => advance(1)} aria-label={UI.next[lang]}><ArrowRight /></button>
        </div>}
      </div>
      <div className="rep-rail" ref={rail}>
        {reps.map(rep => <RepresentativeCard key={rep.id} rep={rep} lang={lang} />)}
      </div>
    </section>
  );
}

export function RepresentativeFinderModal({ open, onClose, lang }: { open: boolean; onClose: () => void; lang: Lang }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selectedPlate, setSelectedPlate] = useState<number | null>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!open || !el) return;
    const previous = document.body.style.overflow;
    el.showModal();
    document.body.style.overflow = "hidden";
    return () => { el.close(); document.body.style.overflow = previous; };
  }, [open]);

  return (
    <dialog className="rep-finder" ref={dialog} aria-label={UI.title[lang]}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => {
        if (event.target !== dialog.current) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}>
      <header className="rep-header">
        <div><h2>{UI.title[lang]}</h2><p>{UI.hint[lang]} <span>{UI.pan[lang]}</span></p></div>
        <button type="button" onClick={onClose} aria-label={UI.close[lang]}><X /></button>
      </header>
      <div className="rep-body">
        <div className="rep-map-scroll">
          <svg className="rep-map" viewBox="10 132 1030 468" role="group" aria-label={UI.map[lang]}>
            {TURKEY_PROVINCES.map(({ plate, name }) => (
              <g key={plate} className="rep-province" role="button" tabIndex={0} aria-label={name} aria-pressed={plate === selectedPlate}
                onClick={() => setSelectedPlate(plate)}
                onKeyDown={event => {
                  if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedPlate(plate); }
                }}>
                <path d={paths.get(plate)} />
              </g>
            ))}
            {TURKEY_PROVINCES.map(({ plate, name }) => (
              <text key={plate} x={PROVINCE_LABELS[plate][0]} y={PROVINCE_LABELS[plate][1]}
                className={plate === selectedPlate ? "is-selected" : ""} aria-hidden="true"
                textAnchor="middle" dominantBaseline="central" onClick={() => setSelectedPlate(plate)}>{name}</text>
            ))}
          </svg>
        </div>
        {selectedPlate !== null && <Representatives key={selectedPlate} plate={selectedPlate} lang={lang} />}
      </div>
      <footer className="rep-footer">
        <span>{UI.general[lang]}</span>
        <a href={telHref(GENERAL_CONTACT.phone)}>{GENERAL_CONTACT.phone}</a>
        <a href={`mailto:${GENERAL_CONTACT.email}`}>{GENERAL_CONTACT.email}</a>
      </footer>
    </dialog>
  );
}

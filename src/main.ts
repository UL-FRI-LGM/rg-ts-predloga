import { preberiDatoteko } from "./bralnik";
import { Risalnik } from "./crke";

// Platno iz HTML dokumenta lahko pridobimo prek njegovega ID-ja.
// Ta ID smo nastavili v HTML datoteki (id="canvas")
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

// Za risanje na platno potrebujemo kontekst - vmesnik, ki nam
// ponuja funkcionalnosti risanja. Pridobimo ga s platna.
const ctx = canvas.getContext("2d");

// canvas.getContext("2d") lahko vrne vmesnik ali pa null.
// Za razliko od Jave moramo v Typescriptu primere, kadar
// je spremenjivka lahko null, eksplicitno preveriti.
if (!ctx) {
  throw new Error("Failed to get canvas context");
}

const risalnik = new Risalnik(ctx);

const podatki = await preberiDatoteko("data/podatki.json");

// R
const crkaR = podatki.crke.r;
risalnik.narisiR(crkaR.barva, { levo: crkaR.levo, zgoraj: crkaR.zgoraj });

// G
const crkaG = podatki.crke.g;
risalnik.narisiG(crkaG.barva, { levo: crkaG.levo, zgoraj: crkaG.zgoraj });

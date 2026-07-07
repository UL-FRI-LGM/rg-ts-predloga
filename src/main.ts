import { preberiDatoteko } from "./bralnik";
import { Risalnik } from "./crke";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

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

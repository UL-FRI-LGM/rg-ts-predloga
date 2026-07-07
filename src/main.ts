import { Risalnik } from "./crke";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Failed to get canvas context");
}

const risalnik = new Risalnik(ctx);

// R
risalnik.narisiR({ levo: 20, zgoraj: 20 });

// G
risalnik.narisiG({ levo: 320, zgoraj: 20 });

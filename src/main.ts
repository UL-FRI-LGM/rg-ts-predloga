import { preberiDatoteko, preberiNalozenoDatoteko } from "./bralnik";
import { Risalnik } from "./crke";

// Platno iz HTML dokumenta lahko pridobimo prek njegovega ID-ja.
// Ta ID smo nastavili v HTML datoteki (id="canvas").
const canvas = document.querySelector<HTMLCanvasElement>("#canvas");

/*
  funkcija document.querySelector lahko vrne html element ali pa null, 
  ča te ne obstaja. Za razliko od Jave moramo v TypeScriptu primere, kadar
  je spremenjivka lahko null, eksplicitno preveriti.
*/
if (!canvas) {
  throw new Error("Failed to get canvas context");
}

/*
  Za risanje na platno potrebujemo kontekst - vmesnik, ki nam
  ponuja funkcionalnosti risanja. Pridobimo ga s platna.

  Zakaj je na koncu te vrstice '!'? Kot smo omenili zgoraj TypeScript od
  nas zahteva, da eksplicitno preverimo, ali je spremenljivka null.
  Vendar pa vemo, da vsak modern brskalnik podpira 2D kontekst, 
  zato lahko uporabimo '!', da TypeScriptu obljubimo, da spremenljivka ctx
  zagotovo ni null.
*/
const ctx = canvas.getContext("2d")!;

const risalnik = new Risalnik(ctx);

const podatki = await preberiDatoteko("data/podatki.json");

/*
  V JavaScriptu in TypeScriptu lahko podatke v konzolo izpišemo s funkcijo console.log(). 
  Izpis lahko vidimo v brskalniku, če odpremo "Developer Tools" 
  (v Chrome: Ctrl+Shift+I ali F12, v Firefox: Ctrl+Shift+K ali F12).
  V kolikor uporabljamo razhroščevalnik opisan v Readme datoteki, 
  pa se izpis pojavi tudi v terminalu "Debug Console".
*/
console.log("Prebrani podatki:", podatki);

// R
const crkaR = podatki.crke.r;
risalnik.narisiR(crkaR.barva, { levo: crkaR.levo, zgoraj: crkaR.zgoraj });

// G
const crkaG = podatki.crke.g;
risalnik.narisiG(crkaG.barva, { levo: crkaG.levo, zgoraj: crkaG.zgoraj });

// -----------------
// Konfiguracija drag-and-drop funkcionalnosti
// -----------------

// Pridobimo skrit html element input, ki nam bo olajšal implementacijo.
const fileInput = document.querySelector<HTMLInputElement>("#fileInput")!;

/*
 V tej funkciji bomo definirali kaj se zgodi z datoteko ko jo uporabnik
 spusti na canvas ali izbere prek "file inputa".
 Fukcija prejme parameter tipa File, ki je vgrajen tip v JavaScriptu in TypeScriptu.
 Več o tem tipu si lahko preberete na:
 https://developer.mozilla.org/en-US/docs/Web/API/File
*/
async function obdelajDatoteko(file: File) {
  console.log("Obdelujem datoteko:", file.name, file.type);
  const podatki = await preberiNalozenoDatoteko(file);

  const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
  const ctx = canvas.getContext("2d")!;

  // S funkcijo clearRect počistimo platno, da se nove črke na bodo risale povrhu prejšnjih.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const risalnik = new Risalnik(ctx);
  const crkaR = podatki.crke.r;
  risalnik.narisiR(crkaR.barva, { levo: crkaR.levo, zgoraj: crkaR.zgoraj });

  const crkaG = podatki.crke.g;
  risalnik.narisiG(crkaG.barva, { levo: crkaG.levo, zgoraj: crkaG.zgoraj });
}

// Brez tega nam brskalnik ne bo dovolil spustiti datoteke na canvas.
canvas.addEventListener("dragover", (event) => {
  event.preventDefault();
});

/*
  Tu definiramo kaj se zgodi, ko uporabnik spusti datoteko na canvas.
  Datoteko pridobimo iz event.dataTransfer.files, ki je seznam vseh datotek, 
  ki jih je uporabnik spustil. Datoteko bi lahko obdelali kar tukaj, vendar 
  je boljša praksa, da to funkcionalnost definiramo v ločeni funkciji, saj jo 
  bomo potrebovali tudi, če datoteko izberemo prek uporabniškega vmesnika "file input".
*/
canvas.addEventListener("drop", (event) => {
  event.preventDefault();

  const file = event.dataTransfer?.files[0];
  if (!file) return;

  obdelajDatoteko(file);
});

/*
  Trik, s katerim omogočimo, da kliku na canvas odpre uporabniški vmesnik "file input".
*/
canvas.addEventListener("click", () => {
  fileInput.click();
});
/*
  Tu definiramo kaj se zgodi, ko uporabnik izbere datoteko prek
  uporabniškega vmesnika "file input".
  Podobno kot zgoraj, datoteko obdelamo v ločeni funkciji.
*/
fileInput.addEventListener("change", () => {
  const file = fileInput.files?.[0];
  if (!file) return;

  obdelajDatoteko(file);

  // Po obdelavi datoteke počistimo "file input", da lahko uporabnik
  // isto datoteko izbere večkrat.¸
  fileInput.value = "";
});

// Konec konfiguracije drag-and-drop

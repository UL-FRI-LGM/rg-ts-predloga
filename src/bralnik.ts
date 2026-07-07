interface Crka {
  levo: number;
  zgoraj: number;
  barva: string;
}

/*
    Interface (vmesnik) deluje podobno kot vmesniki v Javi, torej ga lahko 
    uporabimo pri definiranju razredov.
    Alternativno, kot smo to storili tu, pa lahko delujejo tudi samostojno
    kot opis tipa spremenljivke oz. funkcije.
    
    Več o vmesnikih v Typescriptu si lahko preberete na:
    https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces
*/
interface Podatki {
  crke: {
    r: Crka;
    g: Crka;
  };
}

/*
    V Javascriptu in Typescriptu so nekatere funkcije (npr. vgrajena funkcija fetch), 
    asinhrone, kar pomeni, da program ne čaka na njihovo izvedbo, temveč 
    nemudoma nadaljuje z naslednjim ukazom.
    To pogosto ni zaželeno, temu pa se lahko izognemo z uporabo ukaza
    "await" pred klicem asinhrone funkcije, kot smo to naredili spodaj.

    Asinhronost v Javascriptu in Typescriptu je pa sicer nekoliko kompleksnejša
    tema, kot jo lahko razloži nekajvrstični komentar, več o njej si lahko preberete tu: 
    https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS
*/
export async function preberiDatoteko(pot: string): Promise<Podatki> {
  const podatki: Podatki = await fetch("data/podatki.json").then((datoteka) =>
    datoteka.json(),
  );
  return podatki;
}

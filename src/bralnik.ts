interface Crka {
  levo: number;
  zgoraj: number;
  barva: string;
}

/*
    Interface (vmesnik) deluje podobno kot vmesniki v Javi, torej ga lahko 
    uporabimo pri definiranju razredov.
    Alternativno, kot smo to storili tu, pa lahko delujejo tudi samostojno, 
    kot opis tipa spremenljivke oz. funkcije.
    
    Več o vmesnikih v Typescript-u si lahko preberete na:
    https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces
*/
interface Podatki {
  crke: {
    r: Crka;
    g: Crka;
  };
}

/*
    V Javascript-u in Typescript-u se nekatere funkcije (npr. vgrajena funkcija fetch), 
    asinhrone, kar pomeni, da program ne čaka na njihovo izvedbo, temveč 
    nemudoma nadaljuje z naslednjim ukazom.
    To pogosto ni zaželjeno, temu pa se lahko izognemo z uporabo ukaza
    "await" pred klicem asinhrone funkcije kot smo to naredili spodaj.

    Asinhronost v Javascript-u in Typescript-u je pa sicer nekoliko kompleksnejša
    tema kot jo lahko razloži nekajvrstični komentar, več o njej si lahko preberete tu: 
    https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS
*/
export async function preberiDatoteko(pot: string): Promise<Podatki> {
  const podatki: Podatki = await fetch("data/podatki.json").then((datoteka) =>
    datoteka.json(),
  );
  return podatki;
}

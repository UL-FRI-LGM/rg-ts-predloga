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
  Funkcija fetch je vgrajena funkcija v Javascriptu in Typescriptu, ki omogoča 
  pošiljanje HTTP zahtevkov na strežnik. Ker smo naš projekt postavili tako, 
  da ga strežemo prek lokalnega strežnika, lahko s funkcijo fetch pridobimo 
  podatke iz lokalnega diska. Če je pridobljena datoteka v formatu JSON, jo
  lahko predvorimo v TypeScript objekt s funkcijo json().

  V Javascriptu in Typescriptu so nekatere funkcije (npr. funkcija fetch), 
  asinhrone, kar pomeni, da program ne čaka na njihovo izvedbo, temveč 
  nemudoma nadaljuje z naslednjim ukazom.
  To pogosto ni zaželeno, temu pa se lahko izognemo z uporabo ukaza
  "await" pred klicem asinhrone funkcije, kot smo to naredili spodaj.

  Asinhronost v Javascriptu in Typescriptu je pa sicer nekoliko kompleksnejša
  tema, kot jo lahko razloži nekajvrstični komentar, več o njej si lahko preberete tu: 
  https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS
*/
export async function preberiDatoteko(pot: string): Promise<Podatki> {
  // Spodnja koda je enakovredna temu:
  // const datoteka = await fetch(pot);
  // const podatki: Podatki = await datoteka.json();
  const podatki: Podatki = await fetch(pot).then((datoteka) => datoteka.json());
  return podatki;
}

/*
  Alternativno lahko podatke preberemo tudi iz datoteke, ki jo uporabnik naloži 
  prek "file inputa" ali pa drag-and-drop sistema.
  V tem primeru datoteko že imamo, tako da ne potrebujemo funkcije fetch, 
  temveč lahko njeno vsebino neposredno preberemo s funkcijo text(), ki vrne 
  niz z vsebino datoteke. Če je bila datoteka v formatu JSON, lahko pridobljen
  niz predvorimo v TypeScript objekt s funkcijo JSON.parse().
*/
export async function preberiNalozenoDatoteko(file: File): Promise<Podatki> {
  const text = await file.text();
  const podatki: Podatki = JSON.parse(text);
  return podatki;
}

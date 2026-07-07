interface Crka {
  levo: number;
  zgoraj: number;
  barva: string;
}

interface Podatki {
  crke: {
    r: Crka;
    g: Crka;
  };
}

export async function preberiDatoteko(pot: string): Promise<Podatki> {
  const podatki: Podatki = await fetch("data/podatki.json").then((datoteka) =>
    datoteka.json(),
  );
  return podatki;
}

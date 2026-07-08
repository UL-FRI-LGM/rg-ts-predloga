// Pred oznako class smo dodali export, da lahko našo razred izvozimo in ga
// uporabimo tudi v drugih datotekah. Podobno lahko storimo tudi z vmesniki in funkcijami.
export class Risalnik {
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  narisiR(
    barva: string,
    odmik: { levo: number; zgoraj: number } = { levo: 0, zgoraj: 0 },
  ) {
    // Našemu kontekstu izdamo navodila za risanje.

    // Najprej v atribut `strokeStyle` shranimo barvo "svinčnika".
    // Ta barva velja, dokler je ponovno ne nastavimo.
    this.ctx.strokeStyle = barva;

    // Risanje pravokotnika:
    // Z `beginPath` ponastavimo naš "svinčnik".
    this.ctx.beginPath();
    // Z `rect` začrtamo pravokotnik.
    this.ctx.rect(odmik.levo, odmik.zgoraj, 160, 140);
    // S `stroke` izrišemo trenutno obliko.
    this.ctx.stroke();

    // Risanje črt:
    // Z `beginPath` ponastavimo naš "svinčnik".
    this.ctx.beginPath();
    // Nato z `moveTo` premaknemo naš "svinčnik" na začetno točko.
    this.ctx.moveTo(140 + odmik.levo, 140 + odmik.zgoraj);
    // Potem z `lineTo` potegnemo črto do naslednje točke.
    this.ctx.lineTo(180 + odmik.levo, 300 + odmik.zgoraj);
    // S `stroke` izrišemo trenutno obliko.
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(odmik.levo, 140 + odmik.zgoraj);
    this.ctx.lineTo(odmik.levo, 300 + odmik.zgoraj);
    this.ctx.stroke();
  }

  narisiG(
    barva: string,
    odmik: { levo: number; zgoraj: number } = { levo: 0, zgoraj: 0 },
  ) {
    this.ctx.strokeStyle = barva;

    this.ctx.beginPath();
    this.ctx.moveTo(160 + odmik.levo, odmik.zgoraj);
    this.ctx.lineTo(odmik.levo, odmik.zgoraj);
    this.ctx.lineTo(odmik.levo, 300 + odmik.zgoraj);
    this.ctx.lineTo(160 + odmik.levo, 300 + odmik.zgoraj);
    this.ctx.lineTo(160 + odmik.levo, 150 + odmik.zgoraj);
    this.ctx.lineTo(80 + odmik.levo, 150 + odmik.zgoraj);
    this.ctx.stroke();
  }
}

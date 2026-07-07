export class Risalnik {
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  narisiR(odmik: { levo: number; zgoraj: number } = { levo: 0, zgoraj: 0 }) {
    this.ctx.beginPath();
    this.ctx.rect(odmik.levo, odmik.zgoraj, 160, 140);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(140 + odmik.levo, 140 + odmik.zgoraj);
    this.ctx.lineTo(180 + odmik.levo, 300 + odmik.zgoraj);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(odmik.levo, 140 + odmik.zgoraj);
    this.ctx.lineTo(odmik.levo, 300 + odmik.zgoraj);
    this.ctx.stroke();
  }

  narisiG(odmik: { levo: number; zgoraj: number } = { levo: 0, zgoraj: 0 }) {
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

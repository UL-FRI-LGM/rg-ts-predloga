# Predloga za delo z TypeScript-om pri Računalniški Grafiki


## Nekaj uporabnih povezav
#### TypeScript Dokumentacija: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
#### Asinhronost v Javascript-u (velja tudi da Typescript): [https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS)

## Postavitev okolja

### 1. Namestitev Node.js
Za delo z TypeScript-om je potrebno imeti nameščen [Node.js](https://nodejs.org/).

*Neposredno povezava do namestitvenega paketa za Windows: [LINK](https://nodejs.org/dist/v24.18.0/node-v24.18.0-x64.msi)*

Uspešnost namestitve, lahko preverimo verzijo Node.js in npm (Node Package Manager) z ukazom v terminalu:

```bash
node -v
npm -v
```

### 2. Namestitev knjižic
Podobno kot Python, tudi TypeScript uporablja knjižice (ang. packages), ki jih lahko namestimo preko npm. Za namestitev knjižic, se v terminalu premaknemo v mapo projekta in izvedemo ukaz:

```bash
npm install
```

Ta ukaz bo prebral datoteko `package.json` in namestil vse knjižice, ki so v njej navedene. Za delo pri predmetu drugih knjižic načeloma ne boste potrebovali.

### 3. Zagon strežnika
Za zagon strežnika, ki bo skrbel za osveževanje strani ob spremembah v kodi, se v terminalu premaknemo v mapo projekta in izvedemo ukaz:

```bash
npm run dev
```

Do strežnika lahko dostopamo preko povezave: [http://localhost:3000/](http://localhost:3000/). Če želimo strežnik ustaviti, lahko to storimo v terminalu s kombinacijo tipk `Ctrl + C`.

`npm run dev` je lastni ukaz, ki je definiran v datoteki `package.json`. Sam ukaz je sestavljen iz dveh delov, ki se izvajata vzporedno:
- `esbuild src/main.ts --bundle --format=esm --sourcemap --outdir=dist --watch`, ki skrbi za prevajanje TypeScript kode v JavaScript kodo, vsakič ko se spremeni katera od datotek povezana z `src/main.ts`.
- `serve -l 3000 .`, ki zažene strežnik v korenski mapi na naslovu localhost in vratih 3000.

#### Zakaj je potrebno prevajati TypeScript kodo v JavaScript kodo?
TypeScript je nadgradnja JavaScript-a, ki omogoča uporabo tipov in drugih funkcionalnosti, ki jih JavaScript ne podpira. Brskalniki pa ne razumejo TypeScript kode, zato je potrebno kodo najprej prevesti v JavaScript, ki ga brskalniki lahko interpretirajo. Če natančno pregledate vsebino projekta, boste opazili, da se je ob zagonu pojavila nova mapa `dist`, ki vsebuje prevedeno JavaScript kodo. V tej mapi se nahajajo datoteke, ki jih brskalnik dejansko naloži in interpretira. Prav tako lahko v `index.html` opazite, da se v `<script>` tagu nahaja povezava do datoteke `dist/main.js`, in ne do datoteke `src/main.ts`.

To prevajanje bi načeloma morali izvajati ročno, vendar je v tem primeru to avtomatizirano z uporabo značke `--watch`, ki spremlja spremembe v datotekah in ob vsaki spremembi ponovno prevede kodo. Ta značka je že vgrajena v ukaz `npm run dev`, če pa želite kodo le prevesti, brez zagona strežnika, lahko to storite z ukazom `npm run build`.

#### Zakaj je potrebno zagnati strežnik?
Brskalniki imajo varnostne omejitve, ki preprečujejo nalaganje datotek iz lokalnega datotečnega sistema. To nam povzroča probleme, ko želimo tekom programa brati dodatne datoteke z diska, kot so slike, teksture ali 3D modeli. Zagon strežnika pa omogoča, da brskalnik te datoteke naloži preko HTTP protokola,  kot bi to počeli pri prenašanju vsebin iz oddaljenih strežnikov.

### 4. Razhroščevanje z Visual Studio Code
Za lažje delo z TypeScript-om, priporočamo uporabo urejevalnika Visual Studio Code, saj je drugače razhroščevanje kode, ki se poganja v brskalniku nekoliko nerodno. Visual Studio Code pa ima že vgrajeno funkcionalnost razhroščevanje Typescript kode, vključno z podporo za "breakpoint-e" v brskalniku. Za lažje delo smo vam že pripravili konfiguracijo razhroščevanja, ki se nahaja v `.vscode/launch.json`, uporabite jo pa takole:
1. V terminalu zaženite strežnik (npr. z ukazom `npm run dev`).
2. Dodajte "breakpoint-e" v kodo, kjer želite, da se program ustavi.
3. V meniju `Run and Debug` (`Ctrl + Shift + D`) izberite možnost `Run and Debug`, nato pa izberite možnost `Debug with Chrome`.
4. Kliknite na gumb `Run` (zelena puščica) in počakajte, da se brskalnik odpre. Dostop do kontrol za razhroščevanje je na voljo preko menija, ki se ob razhroščevanju pojavi nad urejevalnikom kode.
5. Če žalite program ponovno zagnati, je dovolj da brskalnik osvežite, prav tako pa lahko "breakpoint-e" dodajate ali odstranjujete med izvajanjem programa.
# Predloga za delo s TypeScript-om pri Računalniški grafiki


## Nekaj uporabnih povezav
#### TypeScript Dokumentacija: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
#### Asinhronost v JavaScriptu (velja tudi za Typescript): [https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS)

## Postavitev okolja

### 1. Namestitev Node.js
Za delo z TypeScriptom si moramo namestiti [Node.js](https://nodejs.org/).

*Neposredno povezava do namestitvenega paketa za Windows: [LINK](https://nodejs.org/dist/v24.18.0/node-v24.18.0-x64.msi)*

Uspešnost namestitve lahko preverimo tako, da si izpišemo verzijo Node.js in npm (Node Package Manager) z ukazom v terminalu:

```bash
node -v
npm -v
```

Izpisati bi se moralo nekaj podobnega spodnjemu izpisu:
```console
> node -v
v24.16.0
> npm -v
11.16.0
```

### 2. Namestitev knjižnic
Podobno kot Python tudi TypeScript uporablja knjižnice (ang. *packages*), ki jih lahko namestimo preko npm. Za namestitev knjižnic se v terminalu premaknemo v mapo projekta in izvedemo ukaz:

```bash
npm install
```

Ta ukaz bo prebral datoteko `package.json` in namestil vse knjižnice, ki so v njej navedene. Za delo pri predmetu načeloma ne boste potrebovali drugih knjižnic.

Opazimo lahko, da imamo v naši korenski mapi novo mapo `node_modules`, v kateri so nameščene vse knjižnice. To mapo lahko odslej ignoriramo.

### 3. Zagon strežnika
Za zagon strežnika, ki bo skrbel za osveževanje strani ob spremembah v kodi, se v terminalu premaknemo v mapo projekta in izvedemo ukaz:

```bash
npm run dev
```

Do strežnika lahko dostopamo preko povezave: [http://localhost:3000/](http://localhost:3000/). Če želimo strežnik ustaviti, lahko to storimo v terminalu s kombinacijo tipk `Ctrl + C`.

`npm run dev` je lastni ukaz, ki je definiran v datoteki `package.json`. Sam ukaz je sestavljen iz dveh delov, ki se izvajata vzporedno:
- `esbuild src/main.ts --bundle --format=esm --sourcemap --outdir=dist --watch`, ki skrbi za prevajanje TypeScript kode v JavaScript kodo, vsakič ko se spremeni katera od datotek povezana z `src/main.ts`.
- `serve -l 3000 .`, ki zažene strežnik v korenski mapi na naslovu localhost in vratih 3000.

#### Zakaj je treba prevajati TypeScript kodo v JavaScript kodo?
TypeScript je nadgradnja JavaScripta, ki omogoča uporabo tipov in drugih funkcionalnosti, ki jih JavaScript ne podpira. Brskalniki pa ne razumejo TypeScript kode, zato je treba kodo najprej prevesti v JavaScript, ki ga brskalniki lahko interpretirajo. Če natančno pregledate vsebino projekta, boste opazili, da se je ob zagonu ukaza `npm run dev` pojavila nova mapa `dist`, ki vsebuje prevedeno JavaScript kodo. V tej mapi se nahajajo datoteke, ki jih brskalnik dejansko naloži in interpretira. Prav tako lahko v `index.html` opazite, da se v znački `<script>` nahaja povezava do datoteke `dist/main.js` in ne do datoteke `src/main.ts`.

To prevajanje bi načeloma morali izvajati ročno, vendar je v tem primeru to avtomatizirano z uporabo značke `--watch`, ki spremlja spremembe v datotekah in ob vsaki spremembi ponovno prevede kodo. Ta značka je že vgrajena v ukaz `npm run dev`, če pa želite kodo le prevesti brez zaganjanja strežnika, lahko to storite z ukazom `npm run build`.

#### Zakaj je treba zagnati strežnik?
Brskalniki imajo varnostne omejitve, ki preprečujejo nalaganje datotek iz lokalnega datotečnega sistema. To nam povzroča probleme, ko želimo tekom programa brati dodatne datoteke z diska, kot so slike, teksture ali 3D modeli. Zagon strežnika pa omogoča, da brskalnik te datoteke naloži preko HTTP protokola, kot bi to počeli pri prenašanju vsebin iz oddaljenih strežnikov.

### 4. Razhroščevanje z Visual Studio Code
Za lažje delo z TypeScriptom, priporočamo uporabo urejevalnika Visual Studio Code, saj je drugače razhroščevanje kode, ki se poganja v brskalniku, nekoliko nerodno. Visual Studio Code pa ima že vgrajeno funkcionalnost razhroščevanje TypeScript kode, vključno z podporo za "breakpointe" oz. zaustavitvene točke v brskalniku. Za lažje delo smo vam že pripravili konfiguracijo razhroščevanja, ki se nahaja v `.vscode/launch.json`, uporabite jo pa takole:

1. Prepričajte se, da imate na sistemu nameščen brskalnik iz družine Chromium, torej bodisi Google Chrome bodisi Brave, Vivaldi, Chromium itd.
    - Če uporabljate kaj drugega kot Google Chrome, boste morali v datoteki `.vscode/launch.json` kot nov parameter pod `sourceMaps` dodati `runtimeExecutable` s potjo do izvršljive datoteke vašega brskalnika, takole:
    ```json
    {
        "version": "0.2.0",
        "configurations": [
            {
            ...
            "sourceMaps": true,
            "runtimeExecutable": "/usr/bin/brave-browser-stable" <- v primeru brskalnika Brave na operacijskem sistemu Linux
            }
        ]
    }
    ```
2. V terminalu zaženite strežnik (npr. z ukazom `npm run dev`).
3. Dodajte zaustavitveno točko v kodo, kjer želite, da se program ustavi.
4. Premaknite se v meni `Run and Debug` (ikona predvajalnega gumba s hroščem) ali uporabite bližnjico `Ctrl + Shift + D`.
5. Kliknite na gumb `Run` (zelena puščica) in počakajte, da se brskalnik odpre. Dostop do kontrol za razhroščevanje je na voljo preko menija, ki se ob razhroščevanju pojavi nad urejevalnikom kode.
6. Če žalite program ponovno zagnati, je dovolj da brskalnik osvežite, prav tako pa lahko zaustavitvene točke dodajate ali odstranjujete med izvajanjem programa.

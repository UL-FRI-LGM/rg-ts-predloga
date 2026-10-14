# Predloga za delo s TypeScriptom pri predmetu Računalniška grafika

## Uvod

#### Kaj je razlika med JavaScriptom in TypeScriptom, zakaj zvenita tako podobno? 
JavaScript je programski jezik, ki ga brskalniki razumejo in izvajajo. Ta odločitev je padla ob koncu 20. stoletja in od takrat moramo živeti z njo. Kljub imenu nima nobene povezave z Javo, v mnogih pogledih je celo bolj podoben Pythonu. TypeScript je nadgradnja JavaScripta, ki omogoča uporabo tipov in s tem preprečuje številne napake, na katerih bi se spotaknili šele med izvajanjem (odpravljanje takih napak je v brskalniku za začetnike še posebej nerodno). Dandanes je TypeScript praktično industrijski standard za razvoj spletnih aplikacij, zato res ni posebnega razloga, da bi se ga otepali. Ker pa brskalniki ne razumejo TypeScripta, moramo kodo v TypeScriptu najprej prevesti v JavaScript, podobno kot je treba kodo v Javi ali C++ prevesti v strojno kodo, da jo lahko računalnik razume in izvede. Na srečo je danes prevajanje TypeScripta v JavaScript precej enostavno in smo ga za vaše potrebe pri tem predmetu popolnoma avtomatizirali.

### Čtivo (preskoči na lastno odgovornost)
#### Obvezno branje za tiste, ki se prvič srečujete s JavaScriptom oz. TypeScriptom:
- TypeScript za poznavalca Jave: [https://comp426-25s.github.io/readings/r02-TypeScript-for-Java-Developer](https://comp426-25s.github.io/readings/r02-TypeScript-for-Java-Developer)  
- Asinhronost: [https://web.mit.edu/6.102/www/sp24/classes/15-promises/](https://web.mit.edu/6.102/www/sp24/classes/15-promises/)

#### Za tiste, ki ste že precej domači z JavaScriptom:
- Kratek povzetek sintakse TypeScripta: [https://learnxinyminutes.com/typescript/](https://learnxinyminutes.com/typescript/)
- Uradni TypeScript priročnik: [https://www.typescriptlang.org/docs/handbook/intro.html](https://www.typescriptlang.org/docs/handbook/intro.html)
- Asinhronost: [https://web.mit.edu/6.102/www/sp26/classes/15-promises/](https://web.mit.edu/6.102/www/sp26/classes/15-promises/)

#### Nekaj uporabnih povezav:
- TypeScript Book: [https://gibbok.github.io/typescript-book/](https://gibbok.github.io/typescript-book/)
- TypeScript dokumentacija: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- Kratek povzetek sintakse JavaScripta (in mnogih mogočih grdobij v tem jeziku): [https://learnxinyminutes.com/javascript/](https://learnxinyminutes.com/javascript/)
- Pogljobljena asinhronost v JavaScriptu (velja tudi za TypeScript): [https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS)

## Opis predloge
Predloga vsebuje:
- osnovno strukturo TypeScript projekta, ki vključuje datoteko `package.json`, v kateri so definirane odvisnosti in skripte za prevajanje in zagon programa, in datoteko `tsconfig.json`, ki vsebuje nastavitve TypeScript prevajalnika,
- html datoteko `index.html`, ki vsebuje `<canvas>` element na katerega bomo risali,
- datoteko `src/main.ts`, ki je vstopna točka programa, vsebuje pa tudi implementacijo funkcionalnosti drag-and-drop za nalaganje datotek, ki vam zna priti prav pri domačih nalogah,
- datoteko `src/bralnik.ts`, ki vsebuje funkcijo za branje datoteke iz lokalnega diska in pretvorbo v TypeScript objekt,
- datoteko `src/risalnik.ts`, ki vsebuje razred, ki omogoča risanje črk na platno,

## Postavitev okolja

### 1. Namestitev Node.js
Za delo s TypeScriptom moramo namestiti [Node.js](https://nodejs.org/).

*Neposredna povezava do namestitvenega paketa za Windows: [LINK](https://nodejs.org/dist/v24.19.0/node-v24.19.0-x64.msi)*

Node.js je okolje za izvajanje TypeScripta in JavaScripta neposredno na vašem računalniku. Okolje moramo namestiti, podobno kot ste morali namestiti JDK za Javo oz. *Python* za Python. *No pri Javi, je ta, če ste uporabljali IntelliJ prišel kar nameščen z integriranim razvojnim okoljem.* Mi ga bomo uporabljali za prevajanje TypeScripta v JavaScript, končni program pa se bo izvedel v brskalniku. Natančneje bo za prevajanje v našem primeru skrbela knjižica [`Vite`](https://vite.dev/), ki je vključena v predlogo. Kako to počne in kaj se dogaja v ozadju ni predmet računalniške grafike, temveč spletnega programiranja, zato se s tem ne bomo ukvarjali.

Poleg Node.js se nam namesti tudi [`npm`](https://www.npmjs.com/), ki je upravljalnik knjižnic oz. paketov (angl. package manager) za Node.js, podobno kot `pip` za Python. `npm` omogoča enostavno namestitev knjižnic (angl. packages), ki jih bomo potrebovali pri vajah.

Uspešnost namestitve preverimo tako, da v terminalu izpišemo verzijo Node.js in `npm` z ukazoma:

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
Za namestitev knjižnic se v terminalu premaknemo v mapo projekta in izvedemo ukaz:

```bash
npm install
```

Ta ukaz prebere datoteko `package.json` in namesti vse knjižnice, ki so v njej navedene. Tekom vaj bomo v naš projekt dodali nekaj knjižnic, in sicer z ukazom `npm install`, ki samodejno posodobi `package.json` in namesti knjižnico. Vse knjižnice se namestijo v mapo `node_modules`, ki smo je dodali v `.gitignore`, da se ne bo po nepotrebnem kopirala v repozitorij če bosta za shrambo koda na vajah uporabljali Git. Poleg datoteke `package.json` je v našem projektu tudi datoteka `package-lock.json`, ki vsebuje natančne verzije vseh knjižnic, ki so bile nameščene. Te datoteke ne spreminjamo ročno, temveč jo neposredno posodablja `npm`, namenjena pa je zagotavljanju enakega delovanja projekta na različnih računalnikih.

### 3. Nastavitve prevajalnika

Nastavitve prevalnika TypeScripta so definirane v datoteki [`tsconfig.json`](https://www.typescriptlang.org/tsconfig/). Teh tekom predmeta na bomo spreminjali, definirajo pa predvsem tip pravajalnika, ki ga uporabljamo ter striknost preverjanja napak v kodi.

### 4. Zagon strežnika
Za zagon strežnika, ki skrbi za prevajanje in osveževanje strani ob spremembah v kodi, se v terminalu premaknemo v mapo projekta in izvedemo ukaz:

```bash
npm run dev
```

Do strežnika dostopamo preko povezave: [http://localhost:3000/](http://localhost:3000/). Če želimo strežnik ustaviti, to storimo v terminalu s kombinacijo tipk `Ctrl + C`.

`npm run dev` je ukaz, definiran v datoteki `package.json`. Ta preprosto zažene knjižnico `Vite`, ki poskrbi za prevajanje TypeScripta v JavaScript, zagon strežnika, ki servira vsebino mape in osveževanje strani ob spremembah v kodi. Z zastavico `--port 3000` smo določili, da bo strežnik poslušal na vratih 3000.

#### Izvajanje skript v PowerShellu
Če ste uporabniki Windowsa, se vam ob zagonu ukaza `npm run dev` prek PowerShella lahko pojavi napaka, ki pravi, da je izvajanje skript onemogočeno:
```powershell
npm : File C:\nvm4w\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

To je posledica varnostne nastavitve [Windows Execution Policy](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies), ki varuje sistem, predvsem pred vami in pa včasih tudi zlonamernimi skriptami. Kot naprednejši uporabniki, lahko to rešimo tako, da odpremo PowerShell kot administrator in izvedemo ukaz:
```powershell
Set-ExecutionPolicy RemoteSigned
```

#### O nepravilnosti postavitve okolja
Tisti, ki ste že kdaj uporabljali Vite za razvoj spletnih aplikacij boste opazili, da je ta struktura projekta nepravilna in [ne deluje v produkciji](https://vite.dev/guide/build). Z drugimi besedami, medtem ko lahko uporabimo ukaz `vite dev` za razvojno postavitev, nam `vite build` ne bi deloval pravilno. Vite namreč ob izgradnji ustvari mapo `dist` in vanjo postavi prevedene JavaScript datoteke, skupaj z vsebino mape `public`, ki je nato dostopna preko strežnika. To pa bi pomenilo, da do datotek v mapi `data` nebi imeli več dostopa. Seveda je vse to nastavljivo, vendar bi s tem vpletli le dodatne komplikacije saj bi se morali ob delu ukvarjati še s datotečno strukturo. Na kratko, za potrebe vaj in domačih nalog bo kar dovolj, da uporabljamo razvojno postavitev.

## Razhroščevanje z Visual Studio Code
Za lažje delo s TypeScriptom priporočamo uporabo urejevalnika Visual Studio Code, saj je razhroščevanje kode, ki se poganja v brskalniku, sicer nekoliko nerodno. Visual Studio Code ima že vgrajeno funkcionalnost razhroščevanja TypeScript kode, vključno s podporo za "breakpointe" oz. zaustavitvene točke v brskalniku. Za lažje delo smo vam že pripravili konfiguracijo razhroščevanja, ki se nahaja v `.vscode/launch.json`, uporabite pa jo takole:

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
5. Kliknite gumb `Run` (zelena puščica) in počakajte, da se brskalnik odpre. Dostop do kontrol za razhroščevanje je na voljo prek menija, ki se ob razhroščevanju pojavi nad urejevalnikom kode.
6. Če želite program ponovno zagnati, je dovolj, da brskalnik osvežite; zaustavitvene točke pa lahko dodajate ali odstranjujete tudi med izvajanjem programa.

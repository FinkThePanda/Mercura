# Sound System Configuration - CPQ Website

Dette projekt er en webapplikation til konfiguration af lydsystemer som en del af en CPQ (Configure, Price, Quote) løsning. Webapplikationen giver brugerne mulighed for at vælge mellem forskellige lydprodukter, farver og tilpasningsmuligheder. Projektet er bygget med React, Vite, TypeScript og Tailwind CSS.

## Teknologi Stack
- **React**: JavaScript bibliotek til brugergrænseflader
- **Vite**: Hurtigt bygge- og udviklingsværktøj
- **TypeScript**: Supersæt af JavaScript med statisk typechecking
- **Tailwind CSS**: CSS framework for hurtig styling

## Installation

Følg disse trin for at installere og køre projektet lokalt:

1. Klon repository:
   git clone https://github.com/din-bruger/repository-navn.git

2. Naviger til projektmappen:
    cd sound-system-configuration

3. Installer projektets afhængigheder ved hjælp af npm: 
    npm install
    
4. Start udviklingsserveren:
    npm run dev

5. Åbn din browser og naviger til:
    http://localhost:5173
    Projektet vil nu køre på din lokale maskine, og du kan se det i din browser på den angivne URL.

## Kørsel af projektet
For at køre projektet lokalt skal du følge disse trin:

1. Sørg for at have Node.js installeret.
2. Kør npm install for at installere afhængighederne.
3. Start udviklingsserveren med npm run dev.
4. Naviger til http://localhost:3000 i din browser for at se applikationen.
Hvis du vil opbygge projektet til produktion, kan du køre:
  npm run build
Dette vil generere en dist mappe med en optimeret version af applikationen, som kan implementeres.

## Projektstruktur
```bash
├── public/              # Offentlige ressourcer som billeder
├── src/
│   ├── assets/          # Billeder og andre mediefiler
│   ├── components/      # Genanvendelige React-komponenter
│   ├── data/            # Projektdata (produktkatalog, farvevalg)
│   ├── App.tsx          # Hovedapplikationen
│   ├── index.tsx        # Indgangspunkt for applikationen
│   └── ...
├── package.json         # Projektets afhængigheder og scripts
├── vite.config.ts       # Vite-konfiguration
└── README.md            # Denne fil
'''bash

## Funktioner
* Konfiguration af lydsystemer
* Vælg farver og tilpasningsmuligheder
* Responsivt design ved hjælp af Tailwind CSS

## Bidrag
Hvis du ønsker at bidrage til dette projekt, kan du følge disse trin:

1. Fork repository
2. Opret en ny branch (git checkout -b feature/dit-feature-navn)
3. Lav dine ændringer og commit dem (git commit -am 'Tilføj dit feature')
4. Push til din branch (git push origin feature/dit-feature-navn)
5. Opret en Pull Request

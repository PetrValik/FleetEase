## Přejděte do složky projektu:
cd backendTemplate

## Instalace závislostí:
 npm install

## Spuštění aplikace
Pro spuštění aplikace v vývojovém režimu použijte:

 npm start

Aplikace bude dostupná na adrese (http://localhost:3000).

## Hlavní funkce
- CRUD operace pro entity
- Správa entit přes API
- Napojení na databázi
- Strukturované kontrolery a modely
  
```
backendTemplate/
├── src/
│   ├── controllers/        # Logika pro zpracování požadavků (controllers)
│   │   └── template.js     # Kontroler pro manipulaci s daty
│   ├── database/           # Databázová logika
│   │   └── entityDatabase.js
│   ├── models/             # Modely a logika manipulace s daty
│   │   ├── createEntity.js
│   │   ├── deleteEntity.js
│   │   ├── getEntity.js
│   │   ├── listEntities.js
│   │   └── updateEntity.js
│   └── template/           # Šablony (pokud jsou použity)
├── test/                   # Testy pro aplikaci
├── .gitignore              # Seznam ignorovaných souborů pro git
├── app.js                  # Hlavní vstupní soubor aplikace
├── package-lock.json       # Zámek verzí závislostí
├── package.json            # Konfigurace projektu a závislosti
└── README.md               # Dokumentace projektu
```

## Dostupné skripty
- `npm start` - Spustí aplikaci v vývojovém režimu
- `npm test` - Spustí testy
- `npm run build` - Vytvoří produkční verzi aplikace (pokud je podporováno)
- `npm run dev` - Spustí aplikaci v režimu pro vývojáře (s nodemonem, pokud je nainstalován)

## Vývoj
Pro vývoj doporučujeme použít `npm run dev`, který spustí aplikaci s automatickým restartováním při změnách v kódu.

## Testování
Testy můžete spustit příkazem:

 npm test

## Produkční nasazení
Pro vytvoření produkční verze (pokud je podporováno) použijte:

 npm run build

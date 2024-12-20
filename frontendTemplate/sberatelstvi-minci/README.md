## Přejděte do složky projektu:
 cd sberatelstvi-mincicd sberatelstvi-minci

## Nainstalujte všechny závislosti:
 npm install

## Spuštění aplikace
Pro spuštění aplikace v vývojovém režimu použijte:
 npm start

Aplikace bude dostupná na adrese (http://localhost:3000).

## Hlavní funkce
- Správa sbírky mincí
- Vyhledávání a řazení mincí
- Diskuzní fórum
- Kalendář událostí
- Uživatelské profily

## Struktura projektu
```
 src/src/
  ├── components/    # Znovupoužitelné komponenty
  ├── routes/       # Komponenty pro jednotlivé stránky
  ├── assets/       # Obrázky a další statické soubory
  ├── styles/       # CSS soubory
  ├── App.js        # Hlavní komponenta aplikace
  └── index.js      # Vstupní bod aplikace
```

## Dostupné skripty
- `npm start` - Spustí aplikaci v vývojovém režimu
- `npm test` - Spustí testy
- `npm run build` - Vytvoří produkční verzi aplikace
- `npm run eject` - Vyexportuje konfigurační soubory (nevratná operace)


## Produkční nasazení
Pro vytvoření produkční verze použijte:

 npm run build

Tím se vytvoří složka `build` s optimalizovanými soubory připravenými k nasazení.

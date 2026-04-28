# Script PowerShell per aggiungere il campo 'cantina' a tutte le schede .md
# Legge il campo 'produttore', estrae il nome prima del ' · ' e lo usa come 'cantina'
# Esegui dalla cartella del progetto: .\aggiungi-cantina.ps1

$viniPath = "_vini"
$files = Get-ChildItem -Path $viniPath -Filter "*.md"
$count = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8

    # Salta se 'cantina:' è già presente
    if ($content -match "^cantina:") {
        Write-Host "SKIP (già presente): $($file.Name)" -ForegroundColor Yellow
        continue
    }

    # Estrai il valore di produttore
    if ($content -match "produttore:\s*(.+)") {
        $produttore = $matches[1].Trim()
        
        # Estrai solo la parte prima del ' · '
        $cantina = $produttore -split ' · ' | Select-Object -First 1
        $cantina = $cantina.Trim()

        # Aggiungi 'cantina:' subito dopo 'produttore:'
        $nuovoContenuto = $content -replace "(produttore:.+)", "`$1`ncantina: $cantina"

        # Salva il file
        Set-Content -Path $file.FullName -Value $nuovoContenuto -Encoding UTF8 -NoNewline
        Write-Host "OK: $($file.Name) → cantina: $cantina" -ForegroundColor Green
        $count++
    } else {
        Write-Host "WARN (produttore non trovato): $($file.Name)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Completato! $count file aggiornati." -ForegroundColor Cyan
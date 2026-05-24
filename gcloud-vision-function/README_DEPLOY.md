Deploy rapido (Google Cloud Functions)

1) Installa gcloud e autenticati:
   gcloud init
   gcloud auth login

2) Posizionati nella cartella della function:
   cd gcloud-vision-function

3) Imposta la variabile d'ambiente in modo sicuro (consigliato: Secret Manager), oppure usa --set-env-vars per test rapido.

Esempio deploy (region a scelta, qui europe-west1):

```bash
gcloud functions deploy vision \
  --entry-point=vision \
  --runtime=nodejs18 \
  --trigger-http \
  --allow-unauthenticated \
  --region=europe-west1 \
  --set-env-vars=GOOGLE_API_KEY=YOUR_NEW_KEY_HERE
```

Consiglio: dopo il deploy, vai su Cloud Console -> Cloud Functions -> vision -> Environment Variables e imposta `GOOGLE_API_KEY` oppure usa Secret Manager.

URL della function: lo trovi dopo il deploy nella Cloud Console. Copialo e sostituisci `REPLACE_WITH_YOUR_FUNCTION_URL` in `scansiona.html`.

Test post-deploy (curl):

```bash
curl -X POST <FUNCTION_URL> -H "Content-Type: application/json" -d '{"image":"data:image/jpeg;base64,/9j/4AAQ..."}'
```


# Tongue API

Progetto Node.js con API JSON RESTful per gestire:

- post
- utenti
- interazioni

Il progetto usa `Express` e `MySQL` con query parametrizzate (`prepared statements`) per evitare SQL Injection.

## Stack

- Node.js
- Express
- MySQL
- mysql2/promise

## Installazione

1. Installa le dipendenze:

```bash
npm install
```

2. Modifica il file `.env`.

3. Esegui lo script SQL presente in `migrations.sql`.

4. Avvia il server:

```bash
npm run dev
```

## Variabili ambiente

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=tongue_db
```

## Modello dati

### Users

- `id`
- `nickname`
- `age`
- `city`

### Posts

- `id`
- `title`
- `insertedAt`

### Interactions

- `id`
- `postId`
- `userId`
- `interactionType`
- `interactionTime`

## Endpoints

### Health check

- `GET /api/health`

### Posts

- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`

Filtri disponibili su `GET /api/posts`:

- `insertedAt=YYYY-MM-DD`
- `city=NomeCitta`
- `interactionDate=YYYY-MM-DD`

La risposta include gli aggregati:

- `totalInteractions`
- `totalLikes`
- `totalComments`

### Users

- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

### Interactions

- `GET /api/interactions`
- `GET /api/interactions/:id`
- `POST /api/interactions`
- `PUT /api/interactions/:id`
- `DELETE /api/interactions/:id`

## Esempi payload

### Creazione post

```json
{
  "title": "Plastic-free: 5 azioni concrete per la vita quotidiana",
  "insertedAt": "2026-04-05T10:30:00"
}
```

### Creazione utente

```json
{
  "nickname": "green_reader",
  "age": 27,
  "city": "Milano"
}
```

### Creazione interazione

```json
{
  "postId": 1,
  "userId": 1,
  "interactionType": "like",
  "interactionTime": "2026-04-05T11:15:00"
}
```

## Possibili miglioramenti

- aggiungere test automatici con Sinon
- usare un layer di validazione dedicato
- aggiungere paginazione e documentazione Swagger

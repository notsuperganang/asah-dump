# Dicoding Notes API

API untuk menyimpan catatan pribadi secara online. Digunakan untuk latihan kelas Dicoding Academy.

## Base URL

```
https://notes-api.dicoding.dev/v1
```

## Autentikasi

Gunakan **Bearer Token** pada header `Authorization` untuk endpoint yang membutuhkan autentikasi:

```
Authorization: Bearer <accessToken>
```

---

## Users

### Register

* **URL:** `/register`
* **Method:** `POST`
* **Request Body:**

  * `name` *(string)*
  * `email` *(string, unik)*
  * `password` *(string, minimal 6 karakter)*
* **Response:**

```json
{
  "status": "success",
  "message": "User Created"
}
```

### Login

* **URL:** `/login`
* **Method:** `POST`
* **Request Body:**

  * `email` *(string)*
  * `password` *(string)*
* **Response:**

```json
{
  "status": "success",
  "message": "User logged successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLXlqNXBjX0xBUkNfQWdLNjEiLCJpYXQiOjE2NDE3OTk5NDl9.flEMaQ7zsdYkxuyGbiXjEDXO8kuDTcI__3UjCwt6R_I"
  }
}
```

### Get User Logged In

* **URL:** `/users/me`
* **Method:** `GET`
* **Headers:** `Authorization: Bearer <accessToken>`
* **Response:**

```json
{
  "status": "success",
  "message": "User retrieved",
  "data": {
    "id": "user-yj5pc_LARC_AgK61",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## Notes

### Create Note

* **URL:** `/notes`
* **Method:** `POST`
* **Headers:** `Authorization: Bearer <accessToken>`
* **Request Body:**

  * `title` *(string)*
  * `body` *(string)*
* **Response:**

```json
{
  "status": "success",
  "message": "Note created",
  "data": {
    "id": "notes-_O6A6TJcCYUWO7t4",
    "title": "Hello, Notes!",
    "body": "My new notes.",
    "owner": "user-l-wposXQYGosf0ZA",
    "archived": false,
    "createdAt": "2022-07-28T10:12:12.396Z"
  }
}
```

### Get Notes (Non-Archived)

* **URL:** `/notes`
* **Method:** `GET`
* **Headers:** `Authorization: Bearer <accessToken>`
* **Response:**

```json
{
  "status": "success",
  "message": "Notes retrieved",
  "data": [
    {
      "id": "notes-jT-jjsyz61J8XKiI",
      "title": "Welcome to Notes, Dimas!",
      "body": "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
      "createdAt": "2022-07-28T10:03:12.594Z",
      "archived": false,
      "owner": "user-l-wposXQYGosf0ZA"
    }
  ]
}
```

### Get Archived Notes

* **URL:** `/notes/archived`
* **Method:** `GET`
* **Headers:** `Authorization: Bearer <accessToken>`
* **Response:**

```json
{
  "status": "success",
  "message": "Notes retrieved",
  "data": [
    {
      "id": "notes-jT-jjsyz61J8XKiI",
      "title": "Welcome to Notes, Dimas!",
      "body": "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
      "createdAt": "2022-07-28T10:03:12.594Z",
      "archived": true,
      "owner": "user-l-wposXQYGosf0ZA"
    }
  ]
}
```

### Get Single Note

* **URL:** `/notes/{note_id}`
* **Method:** `GET`
* **Headers:** `Authorization: Bearer <accessToken>`
* **Response:**

```json
{
  "status": "success",
  "message": "Note retrieved",
  "data": {
    "id": "notes-jT-jjsyz61J8XKiI",
    "title": "Welcome to Notes, Dimas!",
    "body": "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
    "createdAt": "2022-07-28T10:03:12.594Z",
    "archived": false,
    "owner": "user-l-wposXQYGosf0ZA"
  }
}
```

### Archive Note

* **URL:** `/notes/{note_id}/archive`
* **Method:** `POST`
* **Headers:** `Authorization: Bearer <accessToken>`
* **Response:**

```json
{
  "status": "success",
  "message": "Note archived"
}
```

### Unarchive Note

* **URL:** `/notes/{note_id}/unarchive`
* **Method:** `POST`
* **Headers:** `Authorization: Bearer <accessToken>`
* **Response:**

```json
{
  "status": "success",
  "message": "Note unarchived"
}
```

### Delete Note

* **URL:** `/notes/{note_id}`
* **Method:** `DELETE`
* **Headers:** `Authorization: Bearer <accessToken>`
* **Response:**

```json
{
  "status": "success",
  "message": "Note deleted"
}
```

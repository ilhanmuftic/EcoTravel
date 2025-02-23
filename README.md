# **EcoTravel - Hakaton Projekat** 🌍🚀  

## **Opis Projekta**  
**EcoTravel** je web aplikacija koja omogućava korisnicima da istraže i organizuju ekološki prihvatljiva putovanja kroz igru GeoGuessrBosnia. Projekat je razvijen koristeći moderne tehnologije i u potpunosti je **dockerizovan**, čime se olakšava razvoj, testiranje i deploy.  

---

## **Tehnologije**  

🔹 **Frontend:** React
🔹 **Backend:** Django (REST API)  
🔹 **Baza podataka:** PostgreSQL  
🔹 **Docker:** Korišćen za lokalni razvoj i produkciju  
🔹 **DigitalOcean:** Deployment server  
🔹 **Nginx:** Reverse proxy za frontend i backend  
🔹 **Postman kolekcija:** Dokumentacija svih API-ja sa testovima  

---

## **Arhitektura**  

Aplikacija je podeljena u **tri glavne komponente**:  

📌 **Frontend (React)** – Klijentska aplikacija, dostupna na portu **3000**  
📌 **Backend (Django)** – API server, dostupan na portu **8000**  
📌 **Baza podataka (PostgreSQL)** – Čuva podatke aplikacije, dostupna na portu **5432**  

Svi servisi međusobno komuniciraju unutar **Docker mreže**.

---

## **Docker Compose Arhitektura**  

Aplikacija se pokreće pomoću **Docker Compose**, koji upravlja sledećim servisima:  

- 🖥️ **backend** → Django API server  
- 🗄️ **db** → PostgreSQL baza podataka  
- 🎨 **react-app** → React frontend aplikacija  

Svaka komponenta može se pokrenuti **nezavisno** koristeći svoje `docker-compose.yml` fajlove.

---

## **Deployment na DigitalOcean**  

Aplikacija je **deployovana** na **DigitalOcean** server sa IP adresom:  

🔗 **[http://164.90.227.98](http://164.90.227.98)**  

Za rutiranje zahteva koristi se **Nginx** kao **reverse proxy**:  

📌 **Zahtjevi ka `/api/`** → Prosleđuju se **backend servisu**  
📌 **Zahtjevi za frontendom** → Služe se direktno iz React build-a  

---

## **Pokretanje Aplikacije**  

Za lokalno pokretanje svih servisa koristite komandu:  

```bash
docker compose up --build
```

🛠️ Ovo će podići **frontend, backend i bazu podataka** u povezanim Docker kontejnerima.  

🔹 **Alternativno:** Servisi mogu biti pokrenuti i **pojedinačno** iz svojih direktorijuma.

---

## **API Dokumentacija**  

📌 **Postman kolekcija** sadrži dokumentovane API-je sa **testovima** koji osiguravaju ispravnost sistema.  

---

## **Ograničenja**  

⚠ **Aplikacija trenutno nije optimizovana za mobilne uređaje** (nije u potpunosti responzivna).  
⚠ **Deployment koristi osnovnu Nginx konfiguraciju** za demonstraciju, ali može se proširiti dodavanjem **SSL podrške**.  

---

## **Zaključak**  

EcoTravel je **skalabilno i efikasno rešenje** za promovisanje ekološki prihvatljivih putovanja. Korišćenjem **modernih tehnologija** i **Dockerizovanog okruženja**, omogućili smo **jednostavan deployment** i **lako održavanje** sistema.  

Nadamo se da će naš projekat doprineti **podizanju svesti o održivom putovanju**! 🌿✨  

## **API Rute**  

Aplikacija koristi **Django REST Framework** za backend API. Svi API-jevi su dokumentovani u **Postman kolekciji**, uključujući testove za validaciju funkcionalnosti.  

### **📌 Autentifikacija**  
- `POST /register/` → Registracija korisnika  
- `POST /login/` → Prijava korisnika  
- `POST /token/refresh/` → Osvježavanje JWT tokena  

### **📌 Lokacije**  
- `GET /locations/` → Lista svih lokacija  
- `GET /locations/<id>/` → Detalji, ažuriranje ili brisanje određene lokacije  
- `GET /random-location/` → Dohvatanje nasumične lokacije  

### **📌 Rezultati i Rangiranje**  
- `POST /score/` → Slanje rezultata  
- `GET /leaderboard/` → Dohvatanje leaderboard-a (rang liste)  

### **📌 Ocjenjivanje Lokacija**  
- `POST /rate-location/` → Ocjenjivanje određene lokacije  
- `GET /top-locations/` → Prikaz najbolje ocijenjenih lokacija  

### **📌 Korisnički Profil**  
- `GET /user-profile/` → Pregled korisničkog profila  

---

### **🌍 Google Street View Integracija**
Aplikacija koristi Google Maps API za prikaz Street View panoramskih pregleda lokacija. 

📌 **Tim EcoTravel** 🚀
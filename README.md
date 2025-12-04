# Beyond the Doors

This repository contains the source for the "Beyond the Doors" static site. The project explores psychedelic journeys and includes a home page, the mission, and a way to get in touch.

## Pages

The site is made up of three HTML pages:

- **index.html** – landing page with a brief introduction
- **mission.html** – outlines the vision behind the project
- **contact.html** – provides contact information

Each page includes a shared navigation banner at the top so visitors can easily move between sections.

## Viewing Locally

Because the site is purely static, you can open any of the HTML files directly in your web browser. Simply double-click a page or use `File -> Open` in your browser to view it.

## Product API (Django) + Vue Cart

A lightweight Django backend now serves product data while the `products.html` page uses Vue to keep cart state in local storage.

### Backend setup (uv)

```bash
cd backend
uv sync          # creates .venv and installs Django from pyproject.toml
uv run python manage.py migrate
uv run python manage.py loaddata products
uv run python manage.py runserver
```

The product JSON lives at `http://localhost:8000/api/products/` and includes CORS headers for the static front end.

### Frontend cart

All frontend assets now live in the `frontend/` folder and run as a Vue 3 + Vite app. Start it with:

```bash
cd frontend
npm install   # or pnpm/yarn
npm run dev   # serves on http://localhost:5173
```

The cart uses `localStorage`, and all pages (home, mission, products, contact, cart) are Vue routes. The header cart widget stays in sync across routes.

## FastAPI Server Stack

If you'd prefer to serve the files through a small Python backend, the site works well with a FastAPI stack.

### Install dependencies

```bash
pip install fastapi uvicorn
```

### Example server

```python
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/", StaticFiles(directory=".", html=True), name="static")
```

### Run the server

```bash
uvicorn main:app --reload
```

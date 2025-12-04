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

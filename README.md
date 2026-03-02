# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## Docker development 🐳

A simple Docker setup is included to run the project inside a container. It uses the `Dockerfile` and `docker-compose.yml` in the repository.

### Start the container

```bash
# build the image and start services
docker-compose up --build

# then visit http://localhost:5173
```

Your local source is mounted into the container, so changes update live.

You can stop the container with `docker-compose down`.


# Comandos y Pruebas para Demostrar la CI

Este documento contiene los comandos necesarios para ejecutar localmente lo mismo que corre el workflow de GitHub Actions, y los pasos para demostrar que la **Integracion Continua** funciona (incluyendo un fallo intencional).

> El workflow esta definido en `.github/workflows/ci.yml` con matriz de Node.js 20 y 22.

---

## 1. Replicar la CI localmente

Estos son los mismos pasos que ejecuta el job `build-and-test` de GitHub Actions, en orden:

```bash
# 1. Instalar dependencias exactamente como en CI
npm ci

# 2. Linting
npm run lint

# 3. Pruebas unitarias
npm test

# 4. Pruebas con cobertura
npm run test:cov

# 5. Pruebas end-to-end
npm run test:e2e

# 6. Compilacion del proyecto
npm run build
```

Si los seis pasos pasan en local, el workflow tambien pasara en GitHub.

---

## 2. Levantar la aplicacion y probar manualmente

```bash
# Iniciar el servidor en modo desarrollo (con recarga automatica)
npm run start:dev

# o en modo produccion (requiere build previo)
npm run build
npm run start:prod
```

Una vez iniciado el servidor en `http://localhost:3000`:

- **Landing page:** abrir `http://localhost:3000/` en el navegador y hacer clic en el boton **"Probar Swagger"**.
- **Swagger UI:** disponible en `http://localhost:3000/api`.

### Pruebas manuales con curl

```bash
# Crear una pelicula
curl -X POST http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{"title":"Inception","year":2010}'

# Listar peliculas
curl http://localhost:3000/movies

# Obtener una pelicula por id
curl http://localhost:3000/movies/1

# Actualizar una pelicula
curl -X PATCH http://localhost:3000/movies/1 \
  -H "Content-Type: application/json" \
  -d '{"year":2011}'

# Eliminar una pelicula
curl -X DELETE http://localhost:3000/movies/1

# Validacion: payload invalido debe responder 400
curl -X POST http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{"title":"","year":"no-es-numero"}'
```

---

## 3. Demostrar la CI en GitHub

### 3.1 Flujo exitoso (workflow en verde)

```bash
git add .
git commit -m "feat: agrega CRUD de peliculas con swagger"
git push origin main
```

Luego ir a la pestana **Actions** del repositorio en GitHub. Se debe ver:
- Un workflow `CI con Matriz` en estado **success** (check verde).
- Dos jobs corriendo en paralelo: `build-and-test (20)` y `build-and-test (22)`.

### 3.2 Flujo fallido (forzar un error de linting)

Para demostrar que la CI bloquea codigo defectuoso, agregar temporalmente al final de `src/app.service.ts`:

```typescript
const unusedVariable = 'esto causara un error de linting';
```

Luego:

```bash
git checkout -b test/forzar-fallo-ci
git add src/app.service.ts
git commit -m "test: fuerza fallo de linting en CI"
git push origin test/forzar-fallo-ci
```

Abrir un **Pull Request** desde esa rama hacia `main`. Resultados esperados:
- El workflow se ejecuta automaticamente en el PR.
- El paso **"Ejecutar linting"** falla con una X roja.
- GitHub bloquea el merge (si la regla de proteccion de rama esta activa).

### 3.3 Restaurar y confirmar que vuelve a pasar

```bash
git checkout main
git branch -D test/forzar-fallo-ci   # eliminar localmente
git push origin --delete test/forzar-fallo-ci   # eliminar remoto
```

O bien revertir el cambio en la rama y volver a hacer push para ver el workflow en verde.

---

## 4. Configurar proteccion de rama (una sola vez)

En GitHub: **Settings -> Branches -> Add rule** sobre la rama `main`:

1. Activar **Require status checks to pass before merging**.
2. Buscar y seleccionar los checks:
   - `build-and-test (20)`
   - `build-and-test (22)`
3. (Opcional) Activar **Require a pull request before merging**.
4. Guardar la regla.

A partir de ese momento, ningun PR podra ser fusionado a `main` sin que los dos jobs del workflow esten en verde.

---

## 5. Resumen de evidencias para el INFORME.md

1. **Historial de Actions:** captura de la pestana Actions mostrando varios runs.
2. **Workflow exitoso con cobertura:** captura del detalle de un run en verde con los logs de `npm test`.
3. **Workflow fallido:** captura del run en rojo con el log del paso de linting fallando.
4. **Proteccion de rama:** captura de Settings -> Branches mostrando la regla con los status checks requeridos.
5. **PR bloqueado:** captura de un Pull Request mostrando el banner "Required statuses must pass before merging".

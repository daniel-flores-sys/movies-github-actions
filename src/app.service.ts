import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getLandingPage(): string {
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Movies API</title>
  <style>
    body {
      font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      background: linear-gradient(135deg, #1e3c72, #2a5298);
      color: #fff;
      min-height: 100vh;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .card {
      background: rgba(0, 0, 0, 0.35);
      padding: 3rem 4rem;
      border-radius: 14px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    h1 { margin: 0 0 0.5rem; font-size: 2.2rem; }
    p { margin: 0 0 2rem; opacity: 0.9; }
    a.btn {
      display: inline-block;
      padding: 0.9rem 2rem;
      background: #ff9800;
      color: #fff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: background 0.2s;
    }
    a.btn:hover { background: #fb8c00; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Movies API</h1>
    <p>CRUD de peliculas con NestJS - demo de Integracion Continua</p>
    <a class="btn" href="/api">Probar Swagger</a>
  </div>
</body>
</html>`;
  }
}

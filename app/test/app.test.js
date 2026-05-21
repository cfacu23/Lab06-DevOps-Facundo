const request = require("supertest");
const app = require("../server");

describe("Pruebas de la API del Laboratorio 06", () => {
  test("GET /health debe responder con estado ok", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.service).toBe("lab06-devops");
  });

  test("GET /version debe devolver la versión de la aplicación", async () => {
    const response = await request(app).get("/version");

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Lab06-DevOps-Facundo");
  });

  test("Una ruta inexistente debe devolver error 404", async () => {
    const response = await request(app).get("/ruta-inexistente");

    expect(response.statusCode).toBe(404);
  });
});

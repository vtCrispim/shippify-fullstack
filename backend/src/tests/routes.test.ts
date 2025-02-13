import request from "supertest";
import { app } from "../server/Server";

describe("Testando rotas", () => {

    it("Deve listar veículos de uma companhia", async () => {
        const company = 'LogisticX';

        const response = await request(app)
            .get(`/vehicle/get?company=${company}`)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });

    it("Deve listar companhias existentes", async () => {
        const response = await request(app)
            .get(`/company/get`)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });

    it("Deve retornar erro de veiculo já existente", async () => {
        const dataVehicle = {
            "driverId": 1,
            "capacity": "750kg",
            "model": "FIAT",
            "plate": "ABD-123",
            "type": "truck"
        }
        const response = await request(app)
            .post(`/vehicle/create`)
            .send(dataVehicle)
            .expect(500);

        expect(response.body).toHaveProperty("message", "Veículo já existente.");
    });

    it("Deve listar motoristas existentes", async () => {
        const response = await request(app)
            .get(`/drivers/get`)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });
});

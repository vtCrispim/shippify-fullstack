import VehicleInterface from "../interface/VehicleInterface";
import { VeichleModel } from "../models/VehicleModel";
import { DriverModel } from "../models/DriverModel";

const MODELVEHICLE = new VeichleModel()
const MODELDRIVER = new DriverModel()


export class VehicleService {

    async createVehicle(params: VehicleInterface) {
        await this.validatorDataNewVehicle(params)
        await MODELVEHICLE.create(params)
    }

    private async validatorDataNewVehicle(params: VehicleInterface): Promise<void> {
        const plateRegex = /^[A-Z]{3}-\d{3}$/;

        const [vehicle, driver] = await Promise.all([
            MODELVEHICLE.getVehicles({ plate: params.plate }),
            MODELDRIVER.getDriver(params.driver_id)
        ]);

        if (!plateRegex.test(params.plate)) throw new Error(`Formato da placa incorreto. Use o formato XXX-000.`)

        if (vehicle.length) throw new Error(`Veículo já existente.`)

        if (!driver) throw new Error(`Motorista não encontrado.`)

    }
}
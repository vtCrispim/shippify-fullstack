import { Knex } from "../knex";
import VehicleInterface from "../interface/VehicleInterface";

export class VeichleModel {

    async create(params: VehicleInterface): Promise<void> {
        await Knex('vehicle').insert(params)

    }

    async getVehicles({ company, plate }: { company?: string, plate?: string }) {
        const query = Knex('vehicle')
            .select(
                'vehicle.id',
                'driver.first_name',
                'driver.last_name',
                'company.name as company',
                'vehicle.plate',
                'vehicle.model',
                'vehicle.type',
                'vehicle.capacity'
            )
            .leftJoin('driver', 'driver.id', 'vehicle.driver_id')
            .leftJoin('company', 'company.id', 'driver.company_id')
            .whereNotNull('driver.company_id')
            .whereNotNull('vehicle.plate')

        if (company) return await query.where('company.name', company)

        if (plate) return await query.where('vehicle.plate', plate)

        return await query
    }
}
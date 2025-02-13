import { Knex } from "../knex";


export class DriverModel {
    async getDriver(driverId?: number) {
        const query = Knex('driver')
            .select(
                'id',
                'first_name',
                'last_name'
            )

        if (driverId) {
            return await query
                .where('driver.id', driverId)
                .first()
        }

        return await query
    }
}
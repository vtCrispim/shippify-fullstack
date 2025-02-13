import { Knex } from "../knex";

export class CompanyModel {
    async getCompany() {
        return await Knex('company')
            .select(
                'id',
                'name',
                'status'
            )
    }
}
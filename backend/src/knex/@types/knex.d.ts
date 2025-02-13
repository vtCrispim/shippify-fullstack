import DriverInterface from "../../interface/DriverInterface";
import VehicleInterface from "../../interface/VehicleInterface";
import CompanyInterface from "../../interface/CompanyInterface";

declare module "knex/type/tables" {
    interface Tables {
        driver: DriverInterface
        vehicle: VehicleInterface
        company: CompanyInterface
    }
}
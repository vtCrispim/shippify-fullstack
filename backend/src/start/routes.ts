import { Router } from "express";
import { createVehicle, getVehicle } from "../controller/VehicleController";
import { getCompany } from "../controller/CompanyController";
import { getDrivers } from "../controller/DriverController";

const router = Router()

router.post("/vehicle/create", createVehicle)
router.get("/vehicle/get", getVehicle)
router.get("/company/get", getCompany)
router.get("/drivers/get", getDrivers)


export { router }
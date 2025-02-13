import { Request, Response } from "express";
import { DriverModel } from "../models/DriverModel"

const MODELDRIVER = new DriverModel()

export const getDrivers = async (request: Request, response: Response) => {
    try {
        const data = await MODELDRIVER.getDriver()
        return response.status(200).send(data)
    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: `Erro ao consultar motoristas.` })
    }

}


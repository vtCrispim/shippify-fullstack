import { VeichleModel } from '../models/VehicleModel';
import { VehicleService } from '../service/VehicleService';
import { Request, Response } from 'express'

export const createVehicle = async (request: Request, response: Response) => {
    const { driverId: driver_id, plate, model, type, capacity } = request.body
    try {
        await new VehicleService().createVehicle({
            driver_id,
            capacity,
            model,
            plate,
            type
        })
        return response.status(201).send({ message: `Veículo de placa ${plate} criado com sucesso.` })
    } catch (error: any) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
}

export const getVehicle = async (request: Request, response: Response) => {
    try {
        const { company } = request.query
        const data = await new VeichleModel().getVehicles({ company: company as string })
        return response.status(200).send(data)
    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: `Erro ao consultar veiculos` })
    }
}
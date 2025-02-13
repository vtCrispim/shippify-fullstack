import { Request, Response } from "express";
import { CompanyModel } from "../models/CompanyModel";

const MODELCOMPANY = new CompanyModel()

export const getCompany = async (request: Request, response: Response) => {
    try {
        const data = await MODELCOMPANY.getCompany()

        return response.status(200).send(data)
    } catch (error) {
        return response.status(500).send({message: `Erro ao listar companhias.`})
    }
}
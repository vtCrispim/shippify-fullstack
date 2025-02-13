import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './VehicleList.module.css'

interface Vehicle {
    id: string;
    plate: string;
    model: string;
    type: string;
    capacity: number;
    company: string;
}

interface Company {
    id: number;
    name: string;
    status: string;
}

const VehicleTable = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        fetch("http://127.0.0.1:3333/vehicle/get")
            .then(res => res.json())
            .then(data => setVehicles(data))
            .catch(err => console.error("Erro ao buscar veículos", err));

        fetch("http://127.0.0.1:3333/company/get")
            .then(res => res.json())
            .then(data => setCompanies(data))
            .catch(err => console.error("Erro ao buscar companhias", err));
    }, []);


    const filteredVehicles = selectedCompany
        ? vehicles.filter(vehicle => vehicle.company === selectedCompany)
        : vehicles;

    return (
        <div>
            <header className={styles.header}>
                <h2 className={styles.headerTitle}>Lista de Veículos</h2>
                <div className={styles.filterContainer}>
                    <label htmlFor="companyFilter" className={styles.filterLabel}>Filtrar por Companhia</label>
                    <select
                        id="companyFilter"
                        value={selectedCompany}
                        onChange={e => setSelectedCompany(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="">Todas as Companhias</option>
                        {companies.map(company => (
                            <option key={company.id} value={company.name}>{company.name}</option>
                        ))}
                    </select>
                </div>
            </header>


            <div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Modelo</th>
                            <th>Tipo</th>
                            <th>Capacidade</th>
                            <th>Companhia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVehicles.map(vehicle => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.plate}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.type}</td>
                                <td>{vehicle.capacity}</td>
                                <td>{vehicle.company}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.btnContainer}>
                <button
                    className={styles.btnPrimary}
                    onClick={() => navigate("/vehicles/create")}
                >Criar Novo Veículo</button>

            </div>
        </div>
    );
};

export default VehicleTable;


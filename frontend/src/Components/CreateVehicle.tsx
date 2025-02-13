import React from "react";
import { useEffect, useState } from "react";
import styles from './CreateVehicle.module.css'
import { useNavigate } from "react-router-dom";

interface Company {
    id: string;
    name: string;
}

interface Driver {
    id: number;
    first_name: string;
    last_name: string;
}

const VehicleForm = () => {
    const navigate = useNavigate()
    const [companies, setCompanies] = useState<Company[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [formData, setFormData] = useState({
        driverId: "",
        plate: "",
        model: "",
        type: "",
        capacity: "",
        company: ""
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:3333/drivers/get")
            .then(res => res.json())
            .then(data => setDrivers(data))
            .catch(err => console.error("Erro ao buscar motoristas", err));

        fetch("http://127.0.0.1:3333/company/get")
            .then(res => res.json())
            .then((data: Company[]) => setCompanies(data))
            .catch(err => console.error("Erro ao buscar companhias", err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://127.0.0.1:3333/vehicle/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setFormData({ driverId: "", plate: "", model: "", type: "", capacity: "", company: "" });
            } else {
                setMessage("Erro ao cadastrar veículo: " + data.message);
            }
        } catch (error) {
            setMessage("Erro ao conectar com o servidor.");
        }
    };

    return (
        <div className={styles.formContainer}>
            <button className={styles.closeButton} onClick={() => navigate("/")} >×</button>
            <h2 className={styles.formTitle}>Cadastrar Veículo</h2>
            {message && <p className={styles.message}>{message}</p>}

            <form onSubmit={handleSubmit} className={styles.form}>
                <select
                    name="driverId"
                    value={formData.driverId}
                    onChange={handleChange}
                    className={styles.input}
                    required
                >
                    <option value="">Selecione um Motorista</option>
                    {drivers.map((driver) => (
                        <option key={driver.id} value={driver.id}>{driver.first_name}</option>
                    ))}
                </select>

                <input
                    type="text"
                    name="plate"
                    placeholder="Placa"
                    value={formData.plate}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />

                <input
                    type="text"
                    name="model"
                    placeholder="Modelo"
                    value={formData.model}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />

                <input
                    type="text"
                    name="type"
                    placeholder="Tipo"
                    value={formData.type}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />

                <input
                    type="number"
                    name="capacity"
                    placeholder="Capacidade"
                    value={formData.capacity}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />

                <select
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={styles.input}
                    required
                >
                    <option value="">Selecione uma Companhia</option>
                    {companies.map((company) => (
                        <option key={company.name} value={company.name}>{company.name}</option>
                    ))}
                </select>

                <button type="submit" className={styles.btnPrimary}>Cadastrar</button>
            </form>
        </div>

    );
};

export default VehicleForm;
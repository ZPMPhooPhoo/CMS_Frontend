import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button } from '../../components/button.component';
import { Input } from '../../components/input.component';

export const ContractCreateContent: React.FC = () => {
    const location = useLocation();
    const searchID = new URLSearchParams(location.search);
    const customerID = searchID.get("id");
    const id = searchID.get("quotation_ID")?.toString();
    let q_id = 0;
    if (id !== undefined) {
        q_id = parseInt(id);
    } else {
        q_id = 0;
    }
    const [contract, setContract] = useState<File | undefined>();
    const [description, setDescription] = useState('');
    const [contract_date, setContractDate] = useState('');
    const [quotation_id, setQuotation_id] = useState<number>(q_id);
    const [errMsg, setErrMsg] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("contract", contract as File);
        formData.append("description", description);
        formData.append("contract_date", contract_date);
        formData.append("quotation_id", String(quotation_id));
        axios
            .post("http://127.0.0.1:8000/api/contracts", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then((response: any) => {
                navigate(`/client-project-lists?id=${customerID}`)
            })
            .catch((error: any) => {
                if (error.response && error.response.data && error.response.data.message) {
                    const apiErrorMessage = error.response.data.message;
                    setErrMsg(apiErrorMessage);
                  } else {
                    setErrMsg('An error has occurred during the API request.');
                  }
            })
    }
    return (
        <>
            <div className="register add-middle">
                <div className="main_client_create">
                    <h1>ADD A CONTRACT</h1>
                    <div className="form-wrap">
                        <form onSubmit={handleSubmit}>
                            <div className="client_phoneNO">
                                <div className="client_phone_parent">
                                    <input
                                        type="file"
                                        id="contract"
                                        onChange={(e: any) => {
                                            const file = e.target.files?.[0];
                                            setContract(file);
                                        }} />
                                </div>
                            </div>
                            <div className="client_phoneNO">
                                <div className="client_phone_parent">
                                    <Input
                                        onChange={(e: any) => setDescription(e.target.value)}
                                        id="description"
                                        name="description"
                                        type="text"
                                        value={description}
                                        placeholder="Enter Description"
                                    />
                                </div>
                            </div>

                            <div className="client_phoneNO">
                                <div className="client_phone_parent">
                                    <Input
                                        type="date"
                                        id="contract_date"
                                        value={contract_date}
                                        onChange={(e: any) => setContractDate(e.target.value)} placeholder={''} name={''} />
                                </div>
                            </div>
                            <div className="allbtn">
                                <Button type="submit" className="button" text="ADD" />
                                <Link to={`/quotation-create?id=${customerID}&projectID=${localStorage.getItem("project_id")}`}>
                                    <Button type="button" className="button" text="BACK"
                                    />
                                </Link>
                            </div>
                            <p className="error-message">{errMsg && errMsg}</p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
import { useEffect, useState } from "react";
import PatientModel from "./PatientModel";

export const Patient = () => {
    const [patients, setPatients] = useState<PatientModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {

        const fetchPatients = async () => {

            const url: string = "http://localhost:8080/patlist";
           const response = await fetch(url);
            

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            setPatients(responseData);

            setIsLoading(false);

        };

        fetchPatients().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })

    }, []);



    if (isLoading) {
        return (
            <div className="contain m-5">
                <p>Loading ...</p>
            </div>
        );
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );

    }

    const patientList = patients.map(pat => {

        return (
            <tr>
                <th scope='row'>{pat.patid}</th>
                <td>{pat.name}</td>
                <td>{pat.gender}</td>
                <td>{pat.email}</td>
                <td>{pat.phone}</td>
                <td>{pat.birthday}</td>
                <td>{pat.address}</td>
            </tr>
        )

    });

    return (
        <div className='text-white' id='container' style={{ backgroundColor: "#202124", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: "82vh" }}>
            <div style={{ width: "95%" }}>
                <div style={{ float: "left" }}><h3>Patients</h3></div>
                <div style={{ clear: "both" }}>
                    <hr />
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Birthday</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider table-divider-color">
                            {patientList}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
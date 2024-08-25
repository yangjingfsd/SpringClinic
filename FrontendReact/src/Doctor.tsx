import { useEffect, useState } from "react";
import DoctorModel from "./DoctorModel";

export const Doctor = () => {
    const [doctors, setDoctors] = useState<DoctorModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {

        const fetchDoctors = async () => {

            const url: string = "http://localhost:8080/doclist";
           const response = await fetch(url);
            

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            setDoctors(responseData);

            setIsLoading(false);

        };

        fetchDoctors().catch((error: any) => {
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

    const doctorList = doctors.map(doc => {

        return (
            <tr>
                <th scope='row'>{doc.docid}</th>
                <td>{doc.name}</td>
                <td>{doc.gender}</td>
                <td>{doc.email}</td>
                <td>{doc.phone}</td>
                <td>{doc.expertise}</td>
            </tr>
        )

    });

    return (
        <div className='text-white' id='container' style={{ backgroundColor: "#202124", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: "82vh" }}>
            <div style={{ width: "95%" }}>
                <div style={{ float: "left" }}><h3>Doctors in panel</h3></div>
                <div style={{ clear: "both" }}>
                    <hr />
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>DOCID</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Expertise</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider table-divider-color">
                            {doctorList}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
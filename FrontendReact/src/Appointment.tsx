import { useEffect, useState } from "react";
import AppointmentModel from "./AppointmentModel";

export const Appointment = () => {
    const [appointments, setAppointments] = useState<AppointmentModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {

        const fetchAppointments = async () => {

            const baseUrl: string = "http://localhost:8080/appointments";
            const url: string = `${baseUrl}?page=0&size=9`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();
//            const responseData = responseJson._embedded.appointments;
            const loadedAppointments: AppointmentModel[] = [];

            for (const key in responseData) {
                loadedAppointments.push({
                    appid: responseData[key].appid,
                    docname: responseData[key].docname,
                    patname: responseData[key].patname,
                    date: responseData[key].date,
                    time: responseData[key].time,
                    service: responseData[key].service,
                });
            }

            setAppointments(loadedAppointments);

            setIsLoading(false);

        };

        fetchAppointments().catch((error: any) => {
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

    const appointmentList = appointments.map(app => {

        return (
            <tr>
                <th scope='row'>{app.appid}</th>
                <td>{app.docname}</td>
                <td>{app.patname}</td>
                <td>{app.date}</td>
                <td>{app.time}</td>
                <td>{app.service}</td>
                <td><button className="btn btn-danger btn-sm" onClick={()=>remove(app.appid)}>Delete</button>&nbsp;
                <a href={"/appointment/"+app.appid} className="btn btn-info btn-sm">Edit</a></td>
            </tr>
        )

    });

    const remove = async (id:number) => {
        await fetch(`http://localhost:8080/appointment/${id}`,{
            method: 'DELETE'
        }).then(() => {
            let updatedAppointments = [...appointments].filter(i => i.appid !== id);
            setAppointments(updatedAppointments);
        });
    } 

    return (
        <div className='text-white' id='container' style={{ backgroundColor: "#202124", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: "82vh" }}>
            <div style={{ width: "95%" }}>
                <div style={{ float: "left" }}><h3>Appointment Manage System</h3></div>
                <div style={{ float: "right" }}><a href="/appointment/new" className="btn btn-primary btn-sm mb-3">Make a new Appointment</a></div>
                <div style={{ clear: "both" }}>
                    <hr />
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Doctor</th>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Service</th>
                                <th style={{ textAlign: "center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider table-divider-color">
                            {appointmentList}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorModel from "./DoctorModel";

export const AppointmentForm = () => {

    const initialFormState = {
        appid: null,
        docid: null,
        patid: null,
        date: '',
        time: '',
        service: ''
    };

    const [appointment, setAppointment] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();
    const [doctors, setDoctors] = useState<DoctorModel[]>([]);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        if ( id !== 'new') {
            const baseUrl: string = "http://localhost:8080/appointments";
            const url: string = `${baseUrl}/${id}`;
            fetch(url)
            .then(response => response.json())
            .then(data => setAppointment(data));
        }

        const fetchDoctors = async () => {

            const url: string = "http://localhost:8080/doclist";
          const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();
/*            const loadedDoctors: DoctorModel[] = [];

             for (const key in responseData) {
                loadedDoctors.push({
                    docid: responseData[key].docid,
                    name: responseData[key].name,
                    gender: responseData[key].gender,
                    email: responseData[key].email,
                    phone: responseData[key].phone,
                    expertise: responseData[key].expertise,
                });
            }
 */
            setDoctors(responseData);
        };

        fetchDoctors().catch((error: any) => {
            setHttpError(error.message);
        })

    }, [id, setAppointment]);

    const handleChange = (event:any) => {
        const {name, value} = event.target

        setAppointment({ ...appointment, [name]: value});
    }

    const handleSubmit = async (event:any) => {

        event.preventDefault();

         await fetch(`http://localhost:8080/appointment${appointment.appid ? `/${appointment.appid}` : ''}`,
            {method: (appointment.appid) ? 'PUT' : 'POST',
             headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
             body: JSON.stringify(appointment)
            }
        );
        
        setAppointment(initialFormState);

        navigate('/appointments')
    }

    const doctorList = doctors.map(doc => {

        return (
        <option value={doc.docid}>{doc.name}</option>
        )
    });


    return (

        <div className='text-white' id='container' style={{ backgroundColor: "#202124", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: "82vh" }}>

            <div style={{ width: "30%" }}>

                <p className="h4 mb-4">{appointment.appid ? 'Edit Appointment' : 'Add Appointment'}</p>

                <hr />

                <form onSubmit={handleSubmit} >

                    <input type="hidden" name="appid" value={appointment.appid || ''}/>

<div>
<select className="form-select" aria-label="Default select example" name="docid" onChange={handleChange} value={appointment.docid || 0}>
<option value={0}>Choose Doctor</option>
{doctorList}
</select>
</div>


                    <br />
                        <div className="form-floating">
                            <input type="text" name="patid" id="authorText" className="form-control md-4" value={appointment.patid || ''} onChange={handleChange}/>
                            <label className="form-label" htmlFor="authorText">Patient</label>
                        </div>
                    <br />
                        <div className="form-floating">
                            <input type="text" name="date" id="isbnText" className="form-control md-4" value={appointment.date || ''} onChange={handleChange}/>
                            <label className="form-label" htmlFor="isbnText">Date</label>
                        </div>
                    <br />
                        <div className="form-floating">
                            <input type="text" name="time" id="priceText" className="form-control md-4" value={appointment.time || ''} onChange={handleChange}/>
                            <label className="form-label" htmlFor="priceText">Time</label>
                        </div>
                    <br />
                        <div className="form-floating">
                            <input type="text" name="service" id="serviceText" className="form-control md-4" value={appointment.service || ''} onChange={handleChange}/>
                            <label className="form-label" htmlFor="serviceText">Service</label>
                        </div>
                    <br></br>

                    <button type="submit" className="btn btn-info col-2">Save</button>{'  '}
                    <a href="/appointments" className="btn btn-secondary col-2">Cancel</a>
                </form>

            </div>
        </div>
    );
}

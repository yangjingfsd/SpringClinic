class AppointmentModel {
    appid: number;
    docname: string;
    patname?: string;
    date?: string;
    time?: string;
    service?: string;

    constructor (appid: number, docname: string, patname: string, date: string, time: string, service: string) {
        this.appid = appid;
        this.docname = docname;
        this.patname = patname;
        this.date = date;
        this.time = time;
        this.service = service;
    }
}

export default AppointmentModel;
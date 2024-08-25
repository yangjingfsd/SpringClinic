class DoctorModel {
    docid: number;
    name: string;
    gender?: string;
    email?: string;
    phone?: string;
    expertise?: string;

    constructor (docid: number, name: string, gender: string, email: string, phone: string, expertise: string) {
        this.docid = docid;
        this.name = name;
        this.gender = gender;
        this.email = email;
        this.phone = phone;
        this.expertise = expertise;
    }
}

export default DoctorModel;
class PatientModel {
    patid: number;
    name: string;
    gender?: string;
    email?: string;
    phone?: string;
    birthday?: string;
    address?: string;

    constructor (patid: number, name: string, gender: string, email: string, phone: string, birthday: string, address: string) {
        this.patid = patid;
        this.name = name;
        this.gender = gender;
        this.email = email;
        this.phone = phone;
        this.birthday = birthday;
    }
}

export default PatientModel;
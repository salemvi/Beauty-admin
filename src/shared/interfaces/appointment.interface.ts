export interface IAppointment {
        "id": number,
        "date": string,
        "name": string,
        "service": string,
        "phone": string,
        "canceled": boolean,
}

export interface IAppointmentActive {
    "id": number,
    "date": string,
    "name": string,
    "service": string,
    "phone": string,
}
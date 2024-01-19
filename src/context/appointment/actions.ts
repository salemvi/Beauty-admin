import { IAppointment, IAppointmentActive } from "../../shared/interfaces/appointment.interface";


export enum ActionsTypes  {
    SET_ACTIVE_APPOINTMENTS = 'SET_ACTIVE_APPOINTMENTS',
    SET_ALL_APPOINTMENTS = 'SET_ALL_APPOINTMENTS',
}

export type IAppointmentAction = {
    type: ActionsTypes.SET_ACTIVE_APPOINTMENTS,
    payload: IAppointmentActive[],
} | {
    type: ActionsTypes.SET_ALL_APPOINTMENTS,
    payload: IAppointment[],
}
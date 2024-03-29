import { IAppointment, IAppointmentActive } from "../../shared/interfaces/appointment.interface";
import { AppointmentAction, ActionsTypes } from "./actions";
import { loadingStatusOptions } from "../../hooks/http.hooks"; 
export interface IAppointmentState {
    allAppointments: IAppointment[] | [],
    activeAppointments: IAppointmentActive[] | [],
    appointmentLoadingStatus: loadingStatusOptions,
}


export default function reducer(
    state: IAppointmentState,
    action: AppointmentAction,
): IAppointmentState {
    switch(action.type) {
        case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
            return {...state, activeAppointments: action.payload, appointmentLoadingStatus: 'idle'}
        case ActionsTypes.SET_ALL_APPOINTMENTS: 
            return {...state, allAppointments: action.payload, appointmentLoadingStatus: 'idle'}
        case ActionsTypes.FETCHING_APPOINTMENTS:
            return {...state, appointmentLoadingStatus: 'loading'}
        case ActionsTypes.ERROR_FETCHING_APPOINTMENTS:
            return {...state, appointmentLoadingStatus: 'error'}
        default: 
            return state
    }
}


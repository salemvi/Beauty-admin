import { IAppointment, IAppointmentActive } from "../../shared/interfaces/appointment.interface";
import { IAppointmentAction, ActionsTypes } from "./actions";

export interface IInitialState {
	allAppointments: IAppointment | [],
	activeAppointments: IAppointmentActive | [],
}

export default function reducer(
    state: IInitialState,
    action: IAppointmentAction
) {
    switch(action.type) {
        case ActionsTypes.SET_ALL_APPOINTMENTS: 
            return{...state, allAppointments: action.payload}
        case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
            return{...state, activeAppointments: action.payload}
        default:
            return state;
    }
}


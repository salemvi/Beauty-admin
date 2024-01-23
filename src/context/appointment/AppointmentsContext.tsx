import { createContext, useReducer } from "react";
import { IAppointmentState } from "./reducer";
import reducer from "./reducer";
import {useAppointmentService} from '../../services/AppointmentService'
import { ActionsTypes } from "./actions";


const initialState: IAppointmentState = {
	allAppointments: [],
	activeAppointments: [],
    appointmentLoadingStatus: 'idle',

}

interface ProviderProps {
    children: React.ReactNode
}

interface AppointmentContextValue extends IAppointmentState {
    getAppointments: () => void
    getAllActiveAppointments: () => void

}

export const AppointmentContext = createContext<AppointmentContextValue>({
    allAppointments: initialState.allAppointments,
    activeAppointments: initialState.activeAppointments,
    appointmentLoadingStatus: initialState.appointmentLoadingStatus,
    getAppointments: () => {},
    getAllActiveAppointments: () => {}

})

const AppointmentContextProvider = ({children}: ProviderProps) => {
    const {loadingStatus, getAllAppointments, getActiveAppointments } = useAppointmentService()

    const [state, dispatch] = useReducer(reducer, initialState)
    const value: AppointmentContextValue = {
        allAppointments: state.allAppointments,
        activeAppointments: state.activeAppointments,
        appointmentLoadingStatus: loadingStatus,
        getAppointments: () => {
            getAllAppointments().then((data) => {
                dispatch({type: ActionsTypes.SET_ALL_APPOINTMENTS , payload: data})
            })
        },

        getAllActiveAppointments: () => {
            getActiveAppointments().then((data) => {
                dispatch({type: ActionsTypes.SET_ACTIVE_APPOINTMENTS, payload: data})
            })
        },
    }

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    )
}
export default  AppointmentContextProvider 

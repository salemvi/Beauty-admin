import { useHttp } from "../hooks/http.hooks";
import hasRequiredFields from '../utils/hasRequiredFields'
import { IAppointment, IAppointmentActive } from "../shared/interfaces/appointment.interface";

const requiredFields = ['id', 'date', 'name', 'service', 'phone', 'canceled'];

export const useAppointmentService = () => {
    const {loadingStatus, request} = useHttp();
    const _apiBase = 'http://localhost:3001/appointments';

    const getAllAppointments = async (): Promise<IAppointment[]> => {
        const res = await request({url: _apiBase })

        if (res.every((item: IAppointment) =>  hasRequiredFields(item, requiredFields) )) 
        {
            return res;
        } else {
            throw new Error('Data doesnt have all the fields');
        }
    };

    const getActiveAppointments = async () => {
        const baseService = await getAllAppointments();

        const transformedActive: IAppointmentActive[]  = baseService.map((item) => {
            const {id, date, name, service, phone} = item
            return {
                id,
                date,
                name,
                service,
                phone,
            }
        })
        return transformedActive
    }

    return  { loadingStatus, getAllAppointments, getActiveAppointments}
}
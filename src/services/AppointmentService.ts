import { useHttp } from "../hooks/http.hooks";
import hasRequiredFields from '../utils/hasRequiredFields'
import { IAppointment, IAppointmentActive } from "../shared/interfaces/appointment.interface";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from "dayjs";

dayjs.extend(customParseFormat)

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

        const transformedActive: IAppointmentActive[]  = 
            baseService.filter((item) => !item.canceled &&
            dayjs(item.date).diff(undefined, 'minute') > 0).map((item)  => {
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

    const cancelOneAppointment = async (id: number) => {
        return await request({
            url: `${_apiBase}/${id}`,
            method: 'PATCH',
            body: JSON.stringify({canceled: true})
        })
    }

    const createNewAppointment =  async (body: IAppointment) => {
        const id = new Date().getTime();
        body['id'] = id
        body['date'] = dayjs(body['date'], 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm')
        return await request({
            url: _apiBase,
            method: 'POST',
            body: JSON.stringify(body),

        })
    }

    return  { 
        loadingStatus, 
        getAllAppointments,
        getActiveAppointments,
        cancelOneAppointment,
        createNewAppointment,
        }
}
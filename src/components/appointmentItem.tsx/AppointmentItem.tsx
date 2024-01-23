import { useEffect, useState, memo } from "react";
import "./appointmentItem.scss";
import { IAppointment } from "../../shared/interfaces/appointment.interface";
import dayjs from "dayjs";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

type AppointmentProps = Optional<IAppointment, 'canceled'> & {
	handleModal: (state: number) => void;
	getAllActiveAppointments : () => void;
}

const AppointmentItem: React.FC<AppointmentProps> = memo(
({
	id, date, name, service, phone, canceled, handleModal, getAllActiveAppointments
}: AppointmentProps) => {
	const [timeLeft, setTimeLeft] = useState<string | null>(null)
	const formattedDate = dayjs(date).format('DD/MM/YYYY HH:mm')

	useEffect(() => {
		setTimeLeft(`${dayjs(date).diff(undefined, 'h')}:${dayjs(date).diff(undefined, 'minute')}`)
		const intervalId = setInterval(() => {
			if (dayjs(date).diff(undefined, 'm') <= 0) {
				if (getAllActiveAppointments) {
					getAllActiveAppointments()
				}
				clearInterval(intervalId)
			} else {
				setTimeLeft(`${dayjs(date).diff(undefined, 'h')}:${dayjs(date).diff(undefined, 'minute')}`)
			}
		},600000)
		return () => {
			clearInterval(intervalId)
		}
	}, [date])

	return (
		<div className="appointment">
			<div className="appointment__info">
				<span className="appointment__date">Date: {formattedDate} </span>
				<span className="appointment__name">Name: {name}</span>
				<span className="appointment__service">Service: {service}</span>
				<span className="appointment__phone">Phone: {phone}</span>
			</div>
			{ !canceled ? (
				<>
					<div className="appointment__time">
						<span>Time left:</span>
						<span className="appointment__timer">{timeLeft}</span>
					</div>
					<button onClick={() => {handleModal(id)}} 
						className="appointment__cancel">Cancel</button>
				</>
			): null}

				{canceled ? (
					<div className="appointment__canceled">Canceled</div>
				): null}
		</div>
	);
})

export default AppointmentItem;

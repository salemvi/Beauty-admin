import { useContext, useEffect, useState, useCallback } from "react";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointment/AppointmentsContext";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";
function AppointmentList() {

	const { getAllActiveAppointments, activeAppointments, appointmentLoadingStatus} = useContext(AppointmentContext)

	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, selectId] = useState(0)


	useEffect(() => {
		getAllActiveAppointments()
	}, [])

	const handleOpenModal = useCallback((id: number) => {
		setIsOpen(true)
		selectId(id)
	}, [])
	console.log(appointmentLoadingStatus);
	if (appointmentLoadingStatus === 'loading') {
		return <Spinner/>
	} else if (appointmentLoadingStatus === 'error') {
		return (
			<>
				<Error/>
				<button onClick={getAllActiveAppointments} className="schedule__reload">
					Try to reload
				</button>
			</>
		)
	}

	return (
		<>
			{activeAppointments.map((item) => {
				return <AppointmentItem 
				{...item} 
				key={item.id} 
				handleModal={handleOpenModal}
				getAllActiveAppointments={getAllActiveAppointments}
				/>
			})}
			<CancelModal 
				handleClick={setIsOpen} 
				selectedId={selectedId}
				isOpen={isOpen}/>
		
		</>
	);
}

export default AppointmentList;

import Portal from "../portal/portral";
import { useEffect, useRef, useState, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { useAppointmentService } from "../../services/AppointmentService";
import { AppointmentContext } from "../../context/appointment/AppointmentsContext";
import "./modal.scss";
interface IModalProps {
	handleClick: (state: boolean) => void
	selectedId: number
	isOpen: boolean
}

function CancelModal({handleClick, selectedId, isOpen}: IModalProps) {
	const nodeRef = useRef<HTMLDivElement>(null)
	const cancelStatusRef = useRef<boolean | null>(null)

	const [btnDisabled, setBtnDisabled] = useState(false)
	const [cancelStatus, setCancelStatus] = useState<boolean | null>(null)

	const {getAllActiveAppointments} = useContext(AppointmentContext)
	const {cancelOneAppointment} = useAppointmentService()

	const handleCancelAppointment = (id: number) => {
		setBtnDisabled(true);
		cancelOneAppointment(id)
			.then(() => {
				console.log('done');
				setCancelStatus(true)

		})
		.catch(() => {
			console.log('error');
				setBtnDisabled(false)
				setCancelStatus(false)
		})
	}
	
	const closeModal = () => {
		handleClick(false)
		if (cancelStatus || cancelStatusRef.current) {
		getAllActiveAppointments()

		}
	}

	const closeOnEscapeKey = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeModal()
		}
	};
	
	useEffect(() => {
		cancelStatusRef.current = cancelStatus
	}, [cancelStatus])

	useEffect(() => {
		document.body.addEventListener('keydown', closeOnEscapeKey)
		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey);
		}
	}, [handleClick]);

	return (
		<Portal>
			<CSSTransition 
				in={isOpen}
				timeout={{enter: 500, exit: 500}}
				unmountOnExit
				classNames={'modal'}
				nodeRef={nodeRef}
				>
				<div className="modal" ref={nodeRef}>
					<div className="modal__body">
						<span className="modal__title">
							Are you sure you want to delete the appointment N{selectedId}?
						</span>
						<div className="modal__btns">
							<button onClick={() => 
								handleCancelAppointment(selectedId)} 
								disabled={btnDisabled}
								className="modal__ok">Ok</button>
							<button onClick={() => closeModal()} className="modal__close">Close</button>
						</div>
						  <div className="modal__status">
						  {cancelStatus === null
								? ""
								: cancelStatus
								? "Success"
								: "Error, please try again"}
						 </div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;

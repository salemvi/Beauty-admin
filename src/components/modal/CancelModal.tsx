import Portal from "../portal/portral";
import { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./modal.scss";
interface IModalProps {
	handleClick: (state: boolean) => void
	selectedId: number
	isOpen: boolean
}

function CancelModal({handleClick, selectedId, isOpen}: IModalProps) {
	const nodeRef = useRef<HTMLDivElement>(null)

	const closeOnEscapeKey = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			handleClick(false)
		}
	};

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
							<button onClick={() => handleClick} className="modal__ok">Ok</button>
							<button onClick={() => handleClick(false)} className="modal__close">Close</button>
						</div>
						<div className="modal__status">Success</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;

import AppointmentContextProvider from "../../context/appointment/AppointmentsContext";import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
// import HistoryPage from "../../pages/history/HistoryPage";
// import CancelModal from "../modal/CancelModal";
import "./app.scss";



function App() {

	return (
		<main className="board">
			<Header />
			<AppointmentContextProvider>
				<SchedulePage />
			</AppointmentContextProvider>
			{/* <HistoryPage /> */}
			{/* <CancelModal /> */}
		</main>
	);
}

export default App;

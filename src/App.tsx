import { useState } from "react";
import { Home } from "./pages/Home";

const versionKey = "meeting-timer-version";

const App = () => {
	const [updated, setUpdated] = useState(() => localStorage.getItem(versionKey) === "updated");

	function changeVersion(checked: boolean) {
		localStorage.setItem(versionKey, checked ? "updated" : "legacy");
		setUpdated(checked);
	}

	return (
		<div className="container">
			<header className="d-flex flex-wrap align-items-center justify-content-between gap-2 py-3 border-bottom border-secondary text-light">
				<h1 className="h5 mb-0">Tempo da Reunião</h1>
			<label className="version-switch form-check form-switch d-flex align-items-center gap-2 lh-1 m-0 p-0">
					<span className={updated ? "text-white-50" : "fw-semibold"}>Legado</span>
					<input
						type="checkbox"
						role="switch"
						aria-label="Modo Atualizado"
						className="form-check-input flex-shrink-0 float-none m-0"
						checked={updated}
						onChange={(event) => changeVersion(event.target.checked)}
					/>
					<span className={updated ? "fw-semibold" : "text-white-50"}>Atualizado</span>
				</label>
			</header>
			<Home updated={updated} />
		</div>
	);
};

export default App;

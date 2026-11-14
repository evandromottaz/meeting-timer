import { List, Moon, Palette, Sun } from "@phosphor-icons/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Home } from "./pages/Home";

const versionKey = "meeting-timer-version";
const themeKey = "meeting-timer-theme";
const themes = [
	{ value: "light", label: "Claro", Icon: Sun },
	{ value: "dark", label: "Escuro", Icon: Moon },
] as const;
type Theme = typeof themes[number]["value"];

const App = () => {
	const [updated, setUpdated] = useState(() => localStorage.getItem(versionKey) === "updated");
	const [theme, setTheme] = useState<Theme>(() => localStorage.getItem(themeKey) === "light" ? "light" : "dark");
	const [menuOpen, setMenuOpen] = useState(false);
	const menu = useRef<HTMLDivElement>(null);
	const menuButton = useRef<HTMLButtonElement>(null);

	useLayoutEffect(() => {
		document.documentElement.dataset.bsTheme = theme;
	}, [theme]);

	useEffect(() => {
		if (!menuOpen) return;

		function closeOnOutsideClick(event: PointerEvent) {
			if (event.target instanceof Node && !menu.current?.contains(event.target)) {
				setMenuOpen(false);
			}
		}

		function closeOnEscape(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setMenuOpen(false);
				menuButton.current?.focus();
			}
		}

		document.addEventListener("pointerdown", closeOnOutsideClick);
		document.addEventListener("keydown", closeOnEscape);

		return () => {
			document.removeEventListener("pointerdown", closeOnOutsideClick);
			document.removeEventListener("keydown", closeOnEscape);
		};
	}, [menuOpen]);

	function changeVersion(checked: boolean) {
		localStorage.setItem(versionKey, checked ? "updated" : "legacy");
		setUpdated(checked);
	}

	function changeTheme(value: Theme) {
		localStorage.setItem(themeKey, value);
		setTheme(value);
	}

	return (
		<div className="container">
			<header className="d-flex flex-wrap align-items-center justify-content-between gap-2 py-3 border-bottom border-secondary">
				<h1 className="h5 mb-0">Tempo da Reunião</h1>
				<div className="position-relative ms-auto" ref={menu}>
					<button
						ref={menuButton}
						type="button"
						className="version-menu-button btn btn-outline-secondary"
						aria-label="Menu de configurações"
						aria-expanded={menuOpen}
						aria-controls="version-menu"
						onClick={() => setMenuOpen((open) => !open)}
					>
						<List size={24} aria-hidden="true" />
					</button>
					<div id="version-menu" className="version-menu rounded p-3 shadow" hidden={!menuOpen}>
						<label className="version-switch form-check form-switch d-flex align-items-center gap-2 lh-1 m-0 p-0">
							<span className={updated ? "text-body-secondary" : "fw-semibold"}>Legado</span>
							<input
								type="checkbox"
								role="switch"
								aria-label="Modo Atualizado"
								className="form-check-input flex-shrink-0 float-none m-0"
								checked={updated}
								onChange={(event) => changeVersion(event.target.checked)}
							/>
							<span className={updated ? "fw-semibold" : "text-body-secondary"}>Atualizado</span>
						</label>
						<fieldset className="theme-picker border-top mt-3 pt-3">
							<legend className="float-none d-flex align-items-center gap-2 fs-6 mb-2">
								<Palette size={20} aria-hidden="true" />
								Tema
							</legend>
							<div className="d-flex gap-2">
								{themes.map(({ value, label, Icon }) => (
									<div key={value} className="flex-fill">
										<input
											className="btn-check"
											type="radio"
											name="meeting-theme"
											id={`meeting-theme-${value}`}
											checked={theme === value}
											onChange={() => changeTheme(value)}
										/>
										<label className="theme-option btn d-flex align-items-center justify-content-center gap-1" htmlFor={`meeting-theme-${value}`}>
											<Icon size={16} aria-hidden="true" />
											{label}
										</label>
									</div>
								))}
							</div>
						</fieldset>
					</div>
				</div>
			</header>
			<Home updated={updated} />
		</div>
	);
};

export default App;

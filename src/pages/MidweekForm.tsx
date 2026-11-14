import { ChatsCircle, Plant, PlayCircle, SketchLogo, StopCircle } from "@phosphor-icons/react";
import { KeyboardEvent, useEffect, useRef, useState, useSyncExternalStore } from "react";
import ExportButton from "../components/button/ExportButton";
import Fieldset from "../components/fieldset/Fieldset";
import Form from "../components/form/Form";
import HeadingTimer from "../components/heading/Heading";
import Input from "../components/input/Input";
import { meetingSections } from "../constants/meetingSections";
import { QUERY } from "../constants/query";
import ChristianLife from "../templates/ChristianLife";
import MinistryField from "../templates/MinistryField";
import Treasures from "../templates/Treasures";
import "./midweek-form.css";

const mobileQuery = "(max-width: 767.98px)";

function subscribeToMobileLayout(onChange: () => void) {
	const query = window.matchMedia(mobileQuery);
	query.addEventListener("change", onChange);
	return () => query.removeEventListener("change", onChange);
}

function isMobileLayout() {
	return window.matchMedia(mobileQuery).matches;
}

const sections = [
	{ id: "opening", label: "Abertura", Icon: PlayCircle },
	{ id: "treasures", label: meetingSections.treasures, Icon: SketchLogo },
	{ id: "ministry", label: meetingSections.ministry, Icon: ChatsCircle },
	{ id: "christian-life", label: meetingSections.christianLife, Icon: Plant },
	{ id: "closing", label: "Encerramento", Icon: StopCircle },
] as const;

type SectionId = typeof sections[number]["id"];

export default function MidweekForm({ updated }: { updated: boolean }) {
	const mobile = useSyncExternalStore(subscribeToMobileLayout, isMobileLayout);
	const tabbed = updated && mobile;
	const [activeSection, setActiveSection] = useState<SectionId>("opening");
	const [invalidField, setInvalidField] = useState<HTMLInputElement | null>(null);
	const tabs = useRef<Partial<Record<SectionId, HTMLButtonElement | null>>>({});

	useEffect(() => {
		if (!invalidField) return;
		invalidField.reportValidity();
		setInvalidField(null);
	}, [invalidField]);

	function selectSection(id: SectionId) {
		if (id === activeSection) return;
		setActiveSection(id);
		window.scrollTo(0, 0);
	}

	function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
		let nextIndex: number;

		switch (event.key) {
			case "ArrowLeft":
				nextIndex = (index - 1 + sections.length) % sections.length;
				break;
			case "ArrowRight":
				nextIndex = (index + 1) % sections.length;
				break;
			case "Home":
				nextIndex = 0;
				break;
			case "End":
				nextIndex = sections.length - 1;
				break;
			default:
				return;
		}

		event.preventDefault();
		const { id } = sections[nextIndex];
		selectSection(id);
		tabs.current[id]?.focus();
	}

	function revealInvalidField(field: HTMLInputElement) {
		const section = sections.find(({ id }) => field.closest(`#midweek-${id}-panel`));
		if (section) selectSection(section.id);
		setInvalidField(field);
	}

	const content = {
		opening: (
			<Fieldset title={tabbed ? sections[0].label : undefined}>
				<Input name={QUERY.PRESIDENT} placeholder="Presidente" aria-label="Presidente" />
				<Input
					name={QUERY.MEETING.START}
					placeholder="Horário que a reunião começou"
					aria-label="Horário que a reunião começou"
				/>
				<HeadingTimer name={QUERY.COMMENTS.INITIAL}>
					Comentários Iniciais
				</HeadingTimer>
			</Fieldset>
		),
		treasures: <Treasures updated={updated} />,
		ministry: <MinistryField updated={updated} />,
		"christian-life": <ChristianLife updated={updated} />,
		closing: (
			<>
				{tabbed && <h2 className="fieldset__title p-3 text-light my-3">{sections[4].label}</h2>}
				<HeadingTimer name={QUERY.COMMENTS.END}>
					Comentários Finais
				</HeadingTimer>
				<Input
					className="mt-3"
					name={QUERY.MEETING.END}
					placeholder="Horário que a reunião acabou"
					aria-label="Horário que a reunião acabou"
				/>
				<ExportButton updated={updated} />
			</>
		),
	};

	return (
		<div className={tabbed ? "midweek-form--tabbed" : undefined}>
			{tabbed && (
				<div role="tablist" aria-label="Seções da reunião de meio de semana" className="midweek-tabs">
					{sections.map(({ id, label, Icon }, index) => {
						const active = activeSection === id;
						const selectedWeight = id === "treasures" ? "duotone" : "fill";
						return (
							<button
								key={id}
								ref={(element) => { tabs.current[id] = element; }}
								type="button"
								role="tab"
								id={`midweek-${id}-tab`}
								aria-controls={`midweek-${id}-panel`}
								aria-label={label}
								aria-selected={active}
								tabIndex={active ? 0 : -1}
								onClick={() => selectSection(id)}
								onKeyDown={(event) => handleTabKey(event, index)}
							>
								<Icon size={26} weight={active ? selectedWeight : "regular"} aria-hidden="true" />
							</button>
						);
					})}
				</div>
			)}
			<Form updated={updated} onInvalidField={tabbed ? revealInvalidField : undefined}>
				{sections.map(({ id }) => (
					<div
						key={id}
						id={`midweek-${id}-panel`}
						role={tabbed ? "tabpanel" : undefined}
						aria-labelledby={tabbed ? `midweek-${id}-tab` : undefined}
						tabIndex={tabbed ? 0 : undefined}
						hidden={tabbed && activeSection !== id}
					>
						{content[id]}
					</div>
				))}
			</Form>
		</div>
	);
}

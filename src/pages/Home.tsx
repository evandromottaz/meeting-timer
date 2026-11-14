import { KeyboardEvent, useRef, useState } from "react";
import Form from "../components/form/Form";
import Fieldset from "../components/fieldset/Fieldset";
import Input from "../components/input/Input";
import HeadingTimer from "../components/heading/Heading";
import Treasures from "../templates/Treasures";
import Button from "../components/button/Button";
import { FilePng, FileText } from "@phosphor-icons/react";
import { QUERY } from "../constants/query";
import MinistryField from "../templates/MinistryField";
import ChristianLife from "../templates/ChristianLife";
import { weekendSchedule } from "../constants/schedule";

const ExportButton = ({ updated }: { updated: boolean }) => {
	if (updated) {
		return (
			<Button type="submit" className="text-light" aria-label="Gerar PNG">
				<FilePng size={40} aria-hidden="true" />
			</Button>
		);
	}
	return (
		<Button type="submit" className="text-light">
			<span>Gerar PDF</span>
			<FileText size={40} />
		</Button>
	);
};

const MidweekForm = ({ updated }: { updated: boolean }) => {
	return (
		<Form updated={updated}>
			<Fieldset>
				<Input
					name={QUERY.PRESIDENT}
					placeholder="Presidente"
				/>
				<Input
					name={QUERY.MEETING.START}
					placeholder="Horário que a reunião começou"
				/>
				<HeadingTimer name={QUERY.COMMENTS.INITIAL}>
					Comentários Iniciais
				</HeadingTimer>
			</Fieldset>

			<Treasures updated={updated} />

			<MinistryField updated={updated} />

			<ChristianLife updated={updated} />

			<HeadingTimer name={QUERY.COMMENTS.END}>
				Comentários Finais
			</HeadingTimer>

			<Input className="mt-3"
				name={QUERY.MEETING.END}
				placeholder="Horário que a reunião acabou"
			/>

			<ExportButton updated={updated} />
		</Form>
	);
};

const WeekendForm = ({ updated }: { updated: boolean }) => {
	return (
		<Form updated={updated} weekend>
			<Fieldset>
				<Input
					name={QUERY.MEETING.START}
					placeholder={weekendSchedule.meeting.start.pdfText}
					aria-label={weekendSchedule.meeting.start.pdfText}
				/>
				<HeadingTimer name="speech.time">{weekendSchedule.speech.pdfText}</HeadingTimer>
				<HeadingTimer name="watchtower.time">{weekendSchedule.watchtower.pdfText}</HeadingTimer>
				<Input
					name={QUERY.MEETING.END}
					placeholder={weekendSchedule.meeting.end.pdfText}
					aria-label={weekendSchedule.meeting.end.pdfText}
				/>
			</Fieldset>
			<ExportButton updated={updated} />
		</Form>
	);
};

const meetingTabs = [
	{ id: "midweek", label: "Meio de semana" },
	{ id: "weekend", label: "Final de semana" },
] as const;

type MeetingTab = typeof meetingTabs[number]["id"];

export const Home = ({ updated }: { updated: boolean }) => {
	const [weekend, setWeekend] = useState(false);
	const [openedWeekend, setOpenedWeekend] = useState(false);
	const tabs = useRef<Partial<Record<MeetingTab, HTMLButtonElement | null>>>({});
	const activeTab = weekend ? "weekend" : "midweek";

	function selectTab(tab: MeetingTab) {
		setWeekend(tab === "weekend");
		if (tab === "weekend") setOpenedWeekend(true);
	}

	function handleTabKey(event: KeyboardEvent<HTMLButtonElement>) {
		let nextTab: MeetingTab;
		switch (event.key) {
			case "ArrowLeft":
			case "ArrowRight":
				nextTab = weekend ? "midweek" : "weekend";
				break;
			case "Home":
				nextTab = "midweek";
				break;
			case "End":
				nextTab = "weekend";
				break;
			default:
				return;
		}
		event.preventDefault();
		selectTab(nextTab);
		tabs.current[nextTab]?.focus();
	}

	return (
		<main>
			<div role="tablist" aria-label="Tipo de reunião" className="meeting-tabs nav nav-tabs nav-fill mt-3">
				{meetingTabs.map(({ id, label }) => (
					<button
						key={id}
						ref={(element) => { tabs.current[id] = element; }}
						type="button"
						role="tab"
						id={`${id}-tab`}
						aria-controls={`${id}-panel`}
						aria-selected={activeTab === id}
						tabIndex={activeTab === id ? 0 : -1}
						className={`nav-link${activeTab === id ? " active" : ""}`}
						onClick={() => selectTab(id)}
						onKeyDown={handleTabKey}
					>
						{label}
					</button>
				))}
			</div>
			<div role="tabpanel" id="midweek-panel" aria-labelledby="midweek-tab" hidden={weekend}>
				<MidweekForm updated={updated} />
			</div>
			<div role="tabpanel" id="weekend-panel" aria-labelledby="weekend-tab" hidden={!weekend}>
				{openedWeekend && <WeekendForm updated={updated} />}
			</div>
		</main>
	);
};

import { KeyboardEvent, useRef, useState } from "react";
import Form from "../components/form/Form";
import Fieldset from "../components/fieldset/Fieldset";
import ExportButton from "../components/button/ExportButton";
import Input from "../components/input/Input";
import HeadingTimer from "../components/heading/Heading";
import { QUERY } from "../constants/query";
import { weekendSchedule } from "../constants/schedule";
import MidweekForm from "./MidweekForm";

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
		<main className={updated ? "meeting--updated" : undefined}>
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

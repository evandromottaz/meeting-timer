import { FormProvider, useForm } from "react-hook-form";
import { Fragment, ReactNode, useState } from "react";
import { meetingSchedule, weekendSchedule } from "../../constants/schedule";
import usePDF from "../../hooks/usePDF";
import {
	loadMeetingTimer,
	cacheMeetingTimer,
} from "../../utils/localStorage";
import { MeetingSchedule } from "../../types/meetingSchedule";
import downloadMeetingPNG from "../../utils/downloadMeetingPNG";

export function Form({ children, updated, weekend = false }: { children: ReactNode; updated: boolean; weekend?: boolean }) {
	const schedule = weekend ? weekendSchedule : meetingSchedule;
	const [defaultValues] = useState(() => loadMeetingTimer(updated, weekend) ?? schedule);
	const { watch, reset, ...methods } = useForm({ defaultValues });
	const { handleSubmit } = methods;
	const renderPDF = usePDF();
	const [exportError, setExportError] = useState<"PDF" | "PNG" | null>(null);
	const [meetingNumber, setMeetingNumber] = useState(0);

	const allFields = watch();
	cacheMeetingTimer(allFields, weekend);

	async function onSubmit(data: MeetingSchedule) {
		try {
			if (updated) {
				await downloadMeetingPNG(data);
			} else {
				renderPDF(data);
			}
		} catch {
			setExportError(updated ? "PNG" : "PDF");
			return;
		}

		setExportError(null);
		reset(schedule);
		setMeetingNumber((number) => number + 1);
	}

	return (
		<FormProvider {...{ watch, reset, ...methods }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Fragment key={meetingNumber}>{children}</Fragment>
				{exportError && (
					<p role="alert" className="text-light mt-3">
						Não foi possível gerar o {exportError}. Tente novamente.
					</p>
				)}
			</form>
		</FormProvider>
	);
}

export default Form;

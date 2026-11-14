import { FormProvider, useForm } from "react-hook-form";
import { FormEvent, Fragment, ReactNode, useState } from "react";
import { meetingSchedule, weekendSchedule } from "../../constants/schedule";
import usePDF from "../../hooks/usePDF";
import {
	loadMeetingTimer,
	cacheMeetingTimer,
} from "../../utils/localStorage";
import { MeetingSchedule } from "../../types/meetingSchedule";
import downloadMeetingPNG from "../../utils/downloadMeetingPNG";

type FormProps = {
	children: ReactNode;
	updated: boolean;
	weekend?: boolean;
	onInvalidField?: (field: HTMLInputElement) => void;
};

export function Form({ children, updated, weekend = false, onInvalidField }: FormProps) {
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

	function submitForm(event: FormEvent<HTMLFormElement>) {
		if (onInvalidField) {
			const invalidField = event.currentTarget.querySelector<HTMLInputElement>("input:invalid");
			if (invalidField) {
				event.preventDefault();
				onInvalidField(invalidField);
				return;
			}
		}

		return handleSubmit(onSubmit)(event);
	}

	return (
		<FormProvider {...{ watch, reset, ...methods }}>
			<form noValidate={Boolean(onInvalidField)} onSubmit={submitForm}>
				<Fragment key={meetingNumber}>{children}</Fragment>
				{exportError && (
					<p role="alert" className="text-body mt-3">
						Não foi possível gerar o {exportError}. Tente novamente.
					</p>
				)}
			</form>
		</FormProvider>
	);
}

export default Form;

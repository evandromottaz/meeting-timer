import { FormProvider, useForm } from "react-hook-form";
import usePDF from "../../hooks/usePDF";
import { ReactNode } from "react";
import { meetingSchedule } from "../../constants/schedule";
import {
	loadMeetingTimer,
	cacheMeetingTimer,
	removeCacheMeetingTimer,
} from "../../utils/localStorage";
import { FormValuesProps } from "../../types/meetingSchedule";

const loadData = loadMeetingTimer();
const defaultValues = loadData ? loadData : meetingSchedule;

export const Form = ({ children }: { children: ReactNode }) => {
	const { watch, reset, ...methods } = useForm({ defaultValues });
	const { handleSubmit } = methods;
	const renderPDF = usePDF();

	const allFields = watch();
	cacheMeetingTimer(allFields);

	function onSubmit(data: FormValuesProps) {
		renderPDF(data);
		removeCacheMeetingTimer();
		reset(meetingSchedule);
	}

	return (
		<FormProvider {...{ watch, reset, ...methods }}>
			<form onSubmit={handleSubmit(onSubmit)}>{children}</form>
		</FormProvider>
	);
};

export default Form;

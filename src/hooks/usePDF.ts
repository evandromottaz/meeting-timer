import jsPDF from "jspdf";
import { FormValuesProps } from "../types/meetingSchedule";
import MeetingStart from "../factories/MeetingStart";
import President from "../factories/President";
import MeetingEnd from "../factories/MeetingEnd";
import Treasures from "../factories/Treasures";
import FirstComments from "../factories/FirstComments";
import LastComments from "../factories/LastComments";
import MinistryFields from "../factories/MinistryFields";
import ChristianLife from "../factories/ChristianLife";

const usePDF = () => {
	const pdf = new jsPDF();

	const date = new Date()
	const fullDate = new Intl.DateTimeFormat("pt-BR").format(date)

	pdf.text(`Data da reunião: ${fullDate}`, 10, 10);

	function renderPDF(data: FormValuesProps) {
		const x = 10;
		const y = 10
		let line = 10;

		const rows = [
			new President(data),
			new MeetingStart(data),
			new FirstComments(data),
			new Treasures(data),
			new MinistryFields(data),
			new ChristianLife(data),
			new LastComments(data),
			new MeetingEnd(data),
		].filter(item => item.getData().length)

		for (let i = 1; i < rows.length; i++) {
			const title = rows[i].getTitle()
			const rowData = rows[i].getData()
			line += y

			if (title) {
				line += y
				pdf.text(title, x, line, { renderingMode: "fillThenStroke" });
			}

			if (Array.isArray(rowData)) {
				rowData.forEach((rowInner, index) => {
					line += y
					pdf.text(rowInner, x, line);
				})
				continue
			}
			pdf.text(rowData, x, line);
		}

		pdf.save(`Reunião dia ${fullDate.replaceAll("/", "-")}.pdf`);
	}

	return renderPDF;
};

export default usePDF;

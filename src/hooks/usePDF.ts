import jsPDF from "jspdf";
import { MeetingSchedule } from "../types/meetingSchedule";
import MeetingStart from "../factories/MeetingStart";
import President from "../factories/President";
import MeetingEnd from "../factories/MeetingEnd";
import Treasures from "../factories/Treasures";
import FirstComments from "../factories/FirstComments";
import LastComments from "../factories/LastComments";
import MinistryFields from "../factories/MinistryFields";
import ChristianLife from "../factories/ChristianLife";

const usePDF = () => {
	function renderPDF(data: MeetingSchedule) {
		const pdf = new jsPDF();
		const fullDate = new Intl.DateTimeFormat("pt-BR").format(new Date());
		pdf.text(`Data da reunião: ${fullDate}`, 10, 10);
		const fileDate = fullDate.replaceAll("/", "-");

		if ("speech" in data) {
			pdf.text("Reunião de final de semana", 10, 20);
			const parts = [data.meeting.start, data.speech, data.watchtower, data.meeting.end];
			parts.forEach(({ pdfText, time }, index) => {
				pdf.text(`${pdfText}: ${time}`, 10, 30 + index * 10);
			});
			pdf.save(`Reunião de final de semana ${fileDate}.pdf`);
			return;
		}

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

		pdf.save(`Reunião dia ${fileDate}.pdf`);
	}

	return renderPDF;
};

export default usePDF;

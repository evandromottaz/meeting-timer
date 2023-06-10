import React from "react";
import jsPDF from "jspdf";
import { FormValues } from "../types/meetingSchedule";

const usePDF = () => {
	const pdf = new jsPDF();

	function renderPDF(data: FormValues) {
		const x = 10;
		const y = 10;

		Object.entries(data).forEach(([key, value], index) => {
			console.log(`${key}: ${value}`);
			const row = `${key}: ${value}`;

			pdf.text(row, x, y + index * 10);
		});

		pdf.save("dados.pdf");
	}

	return renderPDF;
};

export default usePDF;

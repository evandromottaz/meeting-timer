import { meetingSections } from "../constants/meetingSections";
import { MeetingSchedule } from "../types/meetingSchedule";
import { getTimeInSeconds } from "./getTimeInSeconds";

type TimedPart = {
	pdfText?: string;
	name?: string;
	assistantName?: string;
	advice?: string;
	limitTime?: string;
	time: string;
};

const width = 1000;
const margin = 36;
const cardWidth = width - 2 * margin;
const textX = margin + 24;
const limitX = 778;
const timeX = width - margin - 24;
const partWidth = 560;
const titleFont = "700 34px system-ui, sans-serif";
const sectionFont = "700 24px system-ui, sans-serif";
const partFont = "600 22px system-ui, sans-serif";
const detailFont = "20px system-ui, sans-serif";
const columnFont = "600 18px system-ui, sans-serif";
const timeFont = "700 23px monospace";
const ink = "#262134";
const muted = "#5c5469";

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
	const lines: string[] = [];
	let line = "";

	for (const word of text.trim().split(/\s+/)) {
		const candidate = line ? `${line} ${word}` : word;
		if (context.measureText(candidate).width <= maxWidth) {
			line = candidate;
			continue;
		}

		if (line) lines.push(line);
		if (context.measureText(word).width <= maxWidth) {
			line = word;
			continue;
		}

		line = "";
		for (const character of word) {
			if (context.measureText(line + character).width > maxWidth) {
				lines.push(line);
				line = "";
			}
			line += character;
		}
	}

	return [...lines, line];
}

export default async function downloadMeetingPNG(data: MeetingSchedule) {
	const date = new Intl.DateTimeFormat("pt-BR").format(new Date());
	const weekend = "speech" in data;
	const sections = weekend ? [
		{ title: "Final de semana", parts: [data.meeting.start, data.speech, data.watchtower, data.meeting.end] },
	] : [
		{ title: "Abertura", parts: [data.meeting.start, data.comments.initial] },
		{ title: meetingSections.treasures, parts: [data.treasures.treasure, data.treasures.findTreasures] },
		{ title: meetingSections.ministry, parts: data.ministryField.fields },
		{ title: meetingSections.christianLife, parts: data.christianLife.fields },
		{ title: "Encerramento", parts: [data.comments.end, data.meeting.end] },
	];
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	if (!context) throw new Error("Não foi possível criar a imagem do relatório.");

	const purple = getComputedStyle(document.documentElement).getPropertyValue("--jw-color").trim() || "#5b3d87";
	const measureLines = (text: string, font: string, maxWidth = partWidth) => {
		context.font = font;
		return wrapText(context, text, maxWidth);
	};
	const president = weekend ? [] : measureLines(`Presidente: ${data.president.name || "—"}`, detailFont, cardWidth - 48);
	const headerHeight = 104 + president.length * 28;
	const sectionHeaderHeight = 54;
	const sectionGap = 20;
	const cards = sections.filter(({ parts }) => parts.length).map(({ title, parts }) => ({
		title,
		rows: parts.map((part: TimedPart) => {
			const label = measureLines(part.pdfText?.trim() || "Parte", partFont);
			const details = part.name?.trim() ? measureLines(part.name, detailFont) : [];
			if (part.assistantName?.trim()) {
				details.push(...measureLines(`Ajudante: ${part.assistantName}`, detailFont));
			}
			const advice = getTimeInSeconds(part.advice) > 0 ? part.advice : undefined;
			return { ...part, label, details, advice, height: 30 + label.length * 29 + (details.length + Number(Boolean(advice))) * 26 };
		}),
	}));
	const cardsHeight = cards.reduce((height, card) =>
		height + sectionGap + sectionHeaderHeight + card.rows.reduce((sum, row) => sum + row.height, 0), 0);

	canvas.width = width;
	canvas.height = 2 * margin + headerHeight + 50 + cardsHeight;
	context.textBaseline = "top";

	const fillRect = (color: string, x: number, y: number, w: number, height: number) => {
		context.fillStyle = color;
		context.fillRect(x, y, w, height);
	};

	const drawText = (text: string, font: string, color: string, x: number, y: number, maxWidth?: number, align: CanvasTextAlign = "left") => {
		context.font = font;
		context.fillStyle = color;
		context.textAlign = align;
		context.fillText(text, x, y, maxWidth);
	};

	fillRect("#f1eef5", 0, 0, width, canvas.height);
	fillRect("#ffffff", margin, margin, cardWidth, headerHeight);
	fillRect(purple, margin, margin, cardWidth, 6);
	drawText("Relatório da reunião", titleFont, ink, textX, margin + 20);
	drawText(`Data da reunião: ${date}`, detailFont, muted, textX, margin + 69);
	president.forEach((line, index) => drawText(line, detailFont, ink, textX, margin + 98 + index * 28));

	let y = margin + headerHeight + 24;
	drawText("Parte", columnFont, muted, textX, y);
	if (!weekend) drawText("Previsto", columnFont, muted, limitX, y, 140, "right");
	drawText("Registrado", columnFont, muted, timeX, y, 140, "right");
	y += 26;

	for (const { title, rows } of cards) {
		y += sectionGap;
		fillRect(purple, margin, y, cardWidth, sectionHeaderHeight);
		drawText(title, sectionFont, "#ffffff", textX, y + 13, cardWidth - 48);
		y += sectionHeaderHeight;

		for (const [index, row] of rows.entries()) {
			fillRect(index % 2 === 0 ? "#ffffff" : "#f9f7fb", margin, y, cardWidth, row.height);
			row.label.forEach((line, lineIndex) => drawText(line, partFont, ink, textX, y + 15 + lineIndex * 29));
			row.details.forEach((line, lineIndex) => drawText(line, detailFont, muted, textX, y + 15 + row.label.length * 29 + lineIndex * 26));
			if (!weekend) {
				drawText(row.limitTime ? `${row.limitTime} min` : "—", detailFont, muted, limitX, y + 16, 140, "right");
			}
			drawText(row.time?.trim() || "—", timeFont, purple, timeX, y + 15, 140, "right");
			if (row.advice) {
				const adviceY = y + 15 + row.label.length * 29 + row.details.length * 26;
				drawText("Conselho", detailFont, muted, textX, adviceY);
				drawText(row.advice, timeFont, purple, timeX, adviceY, 140, "right");
			}
			y += row.height;
		}
	}

	const image = await new Promise<Blob | null>((resolve) => {
		canvas.toBlob(resolve, "image/png");
	});
	if (!image) throw new Error("Não foi possível gerar o PNG.");

	const url = URL.createObjectURL(image);
	const link = document.createElement("a");
	link.href = url;
	const fileTitle = weekend ? "Reunião de final de semana" : "Reunião dia";
	link.download = `${fileTitle} ${date.replaceAll("/", "-")}.png`;
	document.body.append(link);
	link.click();
	link.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}

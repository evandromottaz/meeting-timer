import { FilePng, FileText } from "@phosphor-icons/react";
import Button from "./Button";

export default function ExportButton({ updated }: { updated: boolean }) {
	return updated ? (
		<Button type="submit" className="text-light" aria-label="Gerar PNG">
			<FilePng size={40} aria-hidden="true" />
		</Button>
	) : (
		<Button type="submit" className="text-light">
			<span>Gerar PDF</span>
			<FileText size={40} aria-hidden="true" />
		</Button>
	);
}

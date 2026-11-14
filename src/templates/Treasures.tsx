import { InputTimer } from "../components/input/Input";
import Fieldset from "../components/fieldset/Fieldset";
import Timer from "../components/timer/Timer";
import { QUERY } from "../constants/query";
import { meetingSections } from "../constants/meetingSections";
import { useFormContext } from "react-hook-form";

const Treasures = ({ updated }: { updated: boolean }) => {
	const { watch } = useFormContext();
	const [treasureDefaultTime, findTreasuresDefaultTime] = watch([
		QUERY.TREASURES.TREASURE.TIME,
		QUERY.TREASURES.FIND_TREASURES.TIME,
	]);
	return (
		<Fieldset title={updated ? meetingSections.treasures : "Tesouros da Palavra de Deus"}>
			<section className="d-flex">
				<InputTimer
					name={QUERY.TREASURES.TREASURE.NAME}
					timerName={QUERY.TREASURES.TREASURE.TIME}
					placeholder="Orador"
				/>
				<Timer
					name={QUERY.TREASURES.TREASURE.TIME}
					defaultTime={treasureDefaultTime}
				/>
			</section>

			<section className="d-flex">
				<InputTimer
					name={QUERY.TREASURES.FIND_TREASURES.NAME}
					timerName={QUERY.TREASURES.FIND_TREASURES.TIME}
					placeholder="Dirigente"
				/>
				<Timer
					name={QUERY.TREASURES.FIND_TREASURES.TIME}
					defaultTime={findTreasuresDefaultTime}
				/>
			</section>
		</Fieldset>
	);
};

export default Treasures;

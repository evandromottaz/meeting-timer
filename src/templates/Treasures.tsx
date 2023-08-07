import { InputTimer } from "../components/input/Input";
import Fieldset from "../components/fieldset/Fieldset";
import Timer from "../components/timer/Timer";
import { meetingSchedule } from "../constants/schedule";
import { QUERY } from "../constants/query";

const Treasures = () => {
	return (
		<Fieldset title="Tesouros da Palavra de Deus">
			<section className="row">
				<InputTimer
					name={QUERY.TREASURES.TREASURE.NAME}
					timerName={QUERY.TREASURES.TREASURE.TIME}
					placeholder={meetingSchedule.treasures.treasure.placeholder}
				/>
				<Timer name={QUERY.TREASURES.TREASURE.TIME} />
			</section>

			<section className="row">
				<InputTimer
					name={QUERY.TREASURES.FIND_TREASURES.NAME}
					timerName={QUERY.TREASURES.FIND_TREASURES.TIME}
					placeholder={
						meetingSchedule.treasures.findTreasures.placeholder
					}
				/>
				<Timer name={QUERY.TREASURES.FIND_TREASURES.TIME} />
			</section>
		</Fieldset>
	);
};

export default Treasures;

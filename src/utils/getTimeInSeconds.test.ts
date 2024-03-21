import { getTimeInSeconds } from "./getTimeInSeconds";

describe("getTimeSeconds(time)", () => {
	it("00:02 should return 2", () => {
		const seconds = getTimeInSeconds("00:02");
		expect(seconds).toEqual(2);
	});

	it("00:04 should return 4", () => {
		const seconds = getTimeInSeconds("00:04");
		expect(seconds).toEqual(4);
	});

	it("01:22 should return 82", () => {
		const seconds = getTimeInSeconds("01:22");
		expect(seconds).toEqual(82);
	});

	it("03:42 should return 222", () => {
		const seconds = getTimeInSeconds("03:42");
		expect(seconds).toEqual(222);
	});

	it("undefined should return 0", () => {
		const seconds = getTimeInSeconds();
		expect(seconds).toEqual(0);
	});

	it("04:50 should return 290", () => {
		const seconds = getTimeInSeconds("04:50");
		expect(seconds).toEqual(290);
	});

	it("null should return 0", () => {
		const seconds = getTimeInSeconds(null);
		expect(seconds).toEqual(0);
	});
});

import React from "react";
import { render } from "@testing-library/react";

import ToxicityRecognizer from "./ToxicityRecognizer";

describe("ToxicityRecognizer", () => {
	test("Toxicity Recognizer is mounted", () => {
		render(
			<ToxicityRecognizer>
				<input />
			</ToxicityRecognizer>
		);
	});
});

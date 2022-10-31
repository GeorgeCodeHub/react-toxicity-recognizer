import React, { useState, useEffect, useRef } from "react";

import * as toxicity from "@tensorflow-models/toxicity";

import Toast from "./Toast";
import "./Toast.css";

import "./Toxicity.css";

ToxicityRecognizer.defaultProps = {
	children: <></>,
	position: "bottom-right",
	delay: 500,
	messageDisplayTime: 5000,
	toxicityThreshold: 0.8,
	showMessage: true,
	showColorError: true,
	showLoadingIcon: true,
	customTitle: null,
	customMessage: null,
	onTextValidate: () => {}
};

function ToxicityRecognizer({
	children,
	position,
	delay,
	messageDisplayTime,
	toxicityThreshold,
	showMessage,
	showColorError,
	showLoadingIcon,
	customTitle,
	customMessage,
	onTextValidate
}: {
	children: JSX.Element;
	position: string;
	delay: number;
	messageDisplayTime: number;
	toxicityThreshold: number;
	showMessage: boolean;
	showColorError: boolean;
	showLoadingIcon: boolean;
	customTitle?: null | JSX.Element;
	customMessage?: null | JSX.Element;
	onTextValidate?: (predictions: any) => void;
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [toastVisible, setToastVisible] = useState(false);

	const [toxicityIndicators, setToxicityIndicators] = useState<{
		indicators: string[];
		toxicityTitle: string | JSX.Element;
		toxicityMessage: string | JSX.Element;
	}>({
		indicators: [],
		toxicityTitle: "",
		toxicityMessage: ""
	});

	const inputRef = useRef<any>();

	const onToastClose = () => {
		setToastVisible(false);
	};

	useEffect(() => {
		let timer: any | null = null;

		let inputElement = inputRef.current;

		// Check if input is nested inside other elements
		if (inputRef.current.type !== "text" && inputRef.current.type !== "area") {
			inputElement = inputRef.current.getElementsByTagName("input")[0];
		}

		const checkTextInput = () => {
			// If the user keeps on typing then the timeout is cleared and restarted
			if (timer) clearTimeout(timer);

			timer = setTimeout(() => {
				toxicity.load(toxicityThreshold, []).then((model) => {
					const sentences = [inputElement.value];

					showMessage && setToastVisible(false);
					showLoadingIcon && setIsLoading(true);

					model.classify(sentences).then((predictions) => {
						// `predictions` is an array of objects, one for each prediction head,
						// that contains the raw probabilities for each input along with the
						// final prediction in `match` (either `true` or `false`).
						// If neither prediction exceeds the threshold, `match` is `null`.

						// Return results outside of the wrapper for the user to handle them on their own
						onTextValidate && onTextValidate(predictions);

						// Fix labels to be more readable
						const indicators = predictions
							.filter((item) => item.results[0].match === true)
							.map((item) => item.label.replace("_", " "));

						// Hide loading icon
						showLoadingIcon && setIsLoading(false);

						if (indicators.length) {
							let toxicityTitle = "Not Toxic";

							switch (indicators.length) {
								case 1:
									toxicityTitle = "Toxic";
									if (indicators.some((indicator) => indicator === "obscene"))
										toxicityTitle = "Not Toxic, or Hard to say";

									break;
								case 2:
								case 3:
									toxicityTitle = "Very Toxic";
									break;
								default:
									break;
							}

							showMessage && setToastVisible(true);

							setToxicityIndicators({
								indicators: indicators,
								toxicityTitle: customTitle || toxicityTitle,
								toxicityMessage:
									customMessage || `Your text holds ${indicators.join(", ").replace(/, ([^,]*)$/, " and $1")} content.`
							});

							showMessage &&
								setTimeout(() => {
									setToastVisible(false);
								}, messageDisplayTime);
						} else {
							setToxicityIndicators((state) => ({ ...state, toxicityTitle: "" }));
						}
					});
				});
			}, delay);
		};

		// Set listener and start timeout
		inputElement?.addEventListener("keyup", checkTextInput);

		return () => {
			// Remove listener when unmounting
			inputElement?.removeEventListener("keyup", checkTextInput);
		};
	}, [toxicityThreshold, customTitle, customMessage, messageDisplayTime, delay]);

	return (
		<>
			{React.Children.map(children, (child) =>
				React.cloneElement(child, {
					ref: (ref: any) => (inputRef.current = ref),
					style: { borderColor: showColorError && toxicityIndicators.toxicityTitle ? "#ff2121" : "initial" }
				})
			)}
			<Toast
				position={position}
				isLoading={isLoading}
				toastVisible={toastVisible}
				onToastClose={onToastClose}
				title={toxicityIndicators.toxicityTitle}
				message={`Your text holds ${toxicityIndicators.indicators
					.join(", ")
					.replace(/, ([^,]*)$/, " and $1")} content.`}
			/>

			<div className={`notification-container ${position}`}>
				{isLoading && <div className="toxicity-loader"></div>}
				{toastVisible && (
					<div className={`notification toast ${position}`}>
						<button onClick={onToastClose}>X</button>
						<div>
							<p className="notification-title">{toxicityIndicators.toxicityTitle}</p>
							<p className="notification-message">{toxicityIndicators.toxicityMessage}</p>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default ToxicityRecognizer;

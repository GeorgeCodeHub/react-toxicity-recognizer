import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ToxicityRecognizer from "./ToxicityRecognizer";

export default {
	title: "Example/ToxicityRecognizer",
	component: ToxicityRecognizer,
	argTypes: {
		backgroundColor: { control: "color" }
	}
} as ComponentMeta<typeof ToxicityRecognizer>;

const Template: ComponentStory<typeof ToxicityRecognizer> = (args) => <ToxicityRecognizer {...args} />;

export const SimpleInput = Template.bind({});
SimpleInput.args = {
	children: <input autoFocus type="text" autoComplete="off" placeholder="Type here..." />,
	position: "bottom-right",
	showMessage: true,
	showColorError: true,
	showLoadingIcon: true,
	customTitle: null,
	customMessage: null,
	onTextValidate: () => {}
};

export const NestedInput = Template.bind({});
NestedInput.args = {
	children: (
		<div>
			<input type="area" autoComplete="off" placeholder="Type here..." />
		</div>
	),
	position: "top-left",
	showMessage: true,
	showColorError: true,
	showLoadingIcon: true,
	customTitle: null,
	customMessage: null,
	onTextValidate: () => {}
};

export const DoubleNestedInput = Template.bind({});
DoubleNestedInput.args = {
	children: (
		<div>
			<div>
				<input type="text" autoComplete="off" className="live-search-field" placeholder="Search here..." />
			</div>
		</div>
	),
	position: "bottom-right",
	showMessage: true,
	showColorError: true,
	showLoadingIcon: true,
	customTitle: null,
	customMessage: null,
	onTextValidate: (predictions: any) => {
		console.log(predictions);
	}
};

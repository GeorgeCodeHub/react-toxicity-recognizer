import React from "react";

function Toast({
	position,
	isLoading,
	toastVisible,
	onToastClose,
	title,
	message
}: {
	position: string;
	isLoading: boolean;
	toastVisible: boolean;
	onToastClose: () => void;
	title: string | JSX.Element;
	message: string | JSX.Element;
}) {
	return (
		<div className={`notification-container ${position}`}>
			{isLoading && <div className="toxicity-loader"></div>}
			{toastVisible && (
				<div className={`notification toast ${position}`}>
					<button onClick={onToastClose}>X</button>
					<div>
						<p className="notification-title">{title}</p>
						<p className="notification-message">{message}</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default Toast;

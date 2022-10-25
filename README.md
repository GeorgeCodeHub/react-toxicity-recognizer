# React Toxicity Recognizer

A React toxicity recognition wrapper capable of detecting toxic content from user's input.

## Installation

`npm install react-toxicity-recognizer`

## Usage

```
import ToxicityRecognizer from "react-toxicity-recognizer";

function App() {
    return (
        <ToxicityRecognizer>
	        <input autoFocus type="text"  placeholder="Type here..." />
        </ToxicityRecognizer>
    )
}
```

## API

| Property           | Default          | Description                                                                                                |
| ------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| position           | `"bottom-right"` | Position of Toast warning. Possible values: `"bottom-right"`, `"bottom-left"`, `"top-right"`, `"top-left"` |
| delay              | 500              | How long to wait before checking the user's input                                                          |
| messageDisplayTime | 5000             | How long the warning message will be shown                                                                 |
| toxicityThreshold  | 0.8              | How sensitive the classifier would be                                                                      |
| showMessage        | true             | Enable/Disable the warning message of toxicity                                                             |
| showColorError     | true             | Enable/Disable indicator of toxic input                                                                    |
| showLoadingIcon    | true             | Enable/Disable loading indicator                                                                           |
| customTitle        | null             | Change default title                                                                                       |
| customMessage      | null             | Change default description                                                                                 |
| onTextValidate     | () => {}         | Returns the raw classification of your input                                                               |

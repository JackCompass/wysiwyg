import 'remirror/styles/all.css';
import {BoldExtension, ItalicExtension} from 'remirror/extensions';
import {Remirror, useRemirror, EditorComponent, useHelpers, useKeymap} from "@remirror/react";
import {useCommands} from "@remirror/react";
import {useCallback, useState} from "react";


const extensions = () => [new BoldExtension(), new ItalicExtension()];


const hooks = [
	() => {
		const {getText} = useHelpers();
		const handleSaveShortcut = useCallback(
			({state}) => {
				const value = getText(state);
				console.log(value);

				return true; // Prevents any further key handlers from being run.
			},
			[getText],
		);
		// "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
		useKeymap('Mod-s', handleSaveShortcut);
	}
]


const Menu = () => {

	const {focus} = useCommands();
	const {getText} = useHelpers();

	const printData = ({state}) => {
		const value = getText(state);
		console.log(value);
	}

	return (
		<>
			<button onClick={printData}>Focus Editor</button>
		</>
	)
}

const Editor = () => {
	const {text, setText} = useState("");
	const {manager, state} = useRemirror({
		extensions,
		content: '<p>Hello World</p>',
		stringHandler: 'html',
		selections: 'end'
	});

	const handleSubmit = () => {
		console.log(state);
		console.log('Handle submit function is called...')
	}

	return (
		<div className={'remirror-theme'}>
			<Remirror manager={manager} initialContent={state} hooks={hooks}>
				<Menu/>
				<EditorComponent/>
				<div>
					<button>Submit Details</button>
				</div>
			</Remirror>

			<div>
				<h2>Here is the values stored in the text: {text}</h2>
			</div>
		</div>
	)
}

export default Editor;
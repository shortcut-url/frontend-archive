import { createGlobalStyle } from 'styled-components';

const fontFace = (
  name: string,
  src: string,
  fontWeight: string | number = 'normal',
  fontStyle: string = 'normal'
) => `
	@font-face{
		font-family: "${name}";
		src: url(${require(`../../../public/fonts/${src}.ttf`)})  format("truetype");

		font-style: ${fontStyle};
		font-weight: ${fontWeight};
	}
`;

export const GlobalStyle = createGlobalStyle`
	${fontFace('Open Sans', 'OpenSans-Light', 300)};
	${fontFace('Open Sans', 'OpenSans-Regular', 400)};
	${fontFace('Open Sans', 'OpenSans-Bold', 700)};

	body {
		margin: 0;
		font-family: 'Open Sans', sans-serif;
		font-weight: 400;
		font-size: 15px;
		height: 100vh;
	};

	#root {
		display: flex;
		align-items: stretch;
		flex-flow: column nowrap;
		height: 100vh;
	};

	h1,h2,h3,h4,h5,h6 {
		margin: 0;
		font-size: 100%;
	}

	* {
		box-sizing: border-box;
	}
`;
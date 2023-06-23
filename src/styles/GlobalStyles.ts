import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	:root {
		--step--2: clamp(0.69rem, calc(0.66rem + 0.18vw), 0.80rem);
		--step--1: clamp(0.83rem, calc(0.78rem + 0.29vw), 1.00rem);
		--step-0: clamp(1.00rem, calc(0.91rem + 0.43vw), 1.25rem);
		--step-1: clamp(1.20rem, calc(1.07rem + 0.63vw), 1.56rem);
		--step-2: clamp(1.44rem, calc(1.26rem + 0.89vw), 1.95rem);
		--step-3: clamp(1.73rem, calc(1.48rem + 1.24vw), 2.44rem);
		--step-4: clamp(2.07rem, calc(1.73rem + 1.70vw), 3.05rem);
		--step-5: clamp(2.49rem, calc(2.03rem + 2.31vw), 3.82rem);

		--size-8: 0.5rem;
		--size-16: 1rem;
		--size-24: 1.5rem;
		--size-32: 2rem;
		--size-48: 3rem;

		--fw-regular: 400;
		--fw-bold: 700;
		--fw-black: 900;

		--fs-400: var(--step-0);
		--fs-500: var(--step-1);
		--fs-600: var(--step-2);
		--fs-600: var(--step-3);
		--fs-700: var(--step-4);
		--fs-800: var(--step-5);

		--primary-color: ${({ theme }) => theme.colors.red[400]};

		@media (prefers-color-scheme: light) {
			--bg: ${({ theme }) => theme.colors.white};
			--text: ${({ theme }) => theme.colors.black[900]};
			--text-inverse: ${({ theme }) => theme.colors.white};
		}

		@media (prefers-color-scheme: dark) {
			--bg: ${({ theme }) => theme.colors.black[900]};
			--text: ${({ theme }) => theme.colors.black[100]};
			--text-inverse: ${({ theme }) => theme.colors.black[900]};
		}

		font-family: ${({ theme }) => theme.fonts.join(',')};		
		line-height: 1.5;
		font-size: var(--step-0);
		font-weight: var(--fw-regular);

		color-scheme: light dark;

		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-size-adjust: 100%;
	}

	html {
		box-sizing: border-box;
		scroll-behavior: smooth;
		height: 100%;

		@media (prefers-reduced-motion: reduce) {
			scroll-behavior: auto;

			body * {
				animation-duration: 0s !important;
				animation-delay: 0s !important;
			}
		}  
	}

	*,
	*::after,
	*::before {
		box-sizing: inherit;
	}

	body {
		background-color: var(--bg);
		color: var(--text);	
	}

	blockquote,
	body,
	figure,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	hr,
	li,
	ol,
	p,
	pre,
	ul {
		margin: 0;
		padding: 0;
	}

	ul:where([class]) {
		list-style: none;
	}

	button,
	input,
	select,
	textarea {
		color: inherit;
		letter-spacing: inherit;
		font: inherit;
	}

	input[type="text"],
	textarea {
		width: 100%;
	}

	fieldset {
		padding: 0;
		border: none;
	}

	legend {
		margin-bottom: 0.5rem;
		max-width: 100%;
	}

	button,
	input,
	textarea {
		border: 1px solid gray;
	}

	button * {
		pointer-events: none;
	}

	button:hover {
		cursor: pointer;
	}

	embed,
	iframe,
	img,
	object,
	svg,
	video {
		display: block;
		max-width: 100%;
	}

	table {
		width: 100%;
		table-layout: fixed;
	}

	[hidden] {
		display: none !important;
	}

	noscript {
		display: block;
		margin-top: 1em;
		margin-bottom: 1em;
	}

	[tabindex="-1"] {
		outline: none !important;
		box-shadow: none !important;
	}
`;

export default GlobalStyles;

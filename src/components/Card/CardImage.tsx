import { Variants, motion } from 'framer-motion';
import styled from 'styled-components';

interface CardImageProps {
	src: string;
	alt: string;
	aspectRatio: '3 / 4' | '663 / 1024';
}

const Image = styled(motion.img)`
	object-fit: cover;
	object-position: top center;
	width: 100%;
	transition: filter 0.5s ease-in-out;
`;

const imgVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.5,
	},
	show: {
		opacity: 1,
		scale: 1,
		transition: {
			delay: 0.8,
		},
	},
};

export default function CardImage({ src, alt, aspectRatio }: CardImageProps) {
	return <Image src={src} alt={alt} variants={imgVariants} style={{ aspectRatio: aspectRatio }} />;
}

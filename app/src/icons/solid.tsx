import { Svg, Path } from 'react-native-svg';

interface IconProps {
	svgClassName: string;
}

const defaultStyle = 'w-6 h-6 text-white';

const SvgWrapper: React.FC<{
	children: React.ReactNode;
	svgClassName: string;
}> = ({ children, svgClassName }) => (
	<Svg
		className={svgClassName || defaultStyle}
		fill='currentColor'
		viewBox='0 0 24 24'
	>
		{children}
	</Svg>
);

export const PieChartIcon = ({ svgClassName }: IconProps) => (
	<SvgWrapper svgClassName={svgClassName}>
		<Path
			clipRule='evenodd'
			fillRule='evenodd'
			d='M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z'
		></Path>
		<Path
			clipRule='evenodd'
			fillRule='evenodd'
			d='M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z'
		></Path>
	</SvgWrapper>
);

export const BookIcon = ({ svgClassName }: IconProps) => (
	<SvgWrapper svgClassName={svgClassName}>
		<Path d='M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z'></Path>
	</SvgWrapper>
);

export const PencilIcon = ({ svgClassName }: IconProps) => (
	<SvgWrapper svgClassName={svgClassName}>
		<Path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z'></Path>
	</SvgWrapper>
);

export const HeartIcon = ({ svgClassName }: IconProps) => (
	<SvgWrapper svgClassName={svgClassName}>
		<Path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z'></Path>
	</SvgWrapper>
);

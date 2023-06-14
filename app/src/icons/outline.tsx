import { Svg, Path } from 'react-native-svg';

interface IconProps {
	svgClassName: string;
	strokeWidth?: number;
}

const defaultStyle = 'w-6 h-6 text-white';

const SvgWrapper: React.FC<{
	children: React.ReactNode;
	svgClassName: string;
	strokeWidth?: number;
}> = ({ children, svgClassName, strokeWidth = 1.5 }) => (
	<Svg
		className={svgClassName || defaultStyle}
		fill='none'
		viewBox='0 0 24 24'
		strokeWidth={strokeWidth}
		stroke='currentColor'
	>
		{children}
	</Svg>
);

export const UserIcon: React.FC<IconProps> = ({
	svgClassName,
	strokeWidth,
}) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</SvgWrapper>
);

export const ChevronDownIcon: React.FC<IconProps> = ({
	svgClassName,
	strokeWidth,
}) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M19.5 8.25l-7.5 7.5-7.5-7.5'
		/>
	</SvgWrapper>
);

export const ChevronUpIcon: React.FC<IconProps> = ({
	svgClassName,
	strokeWidth,
}) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M4.5 15.75l7.5-7.5 7.5 7.5'
		/>
	</SvgWrapper>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({
	svgClassName,
	strokeWidth,
}) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M15.75 19.5L8.25 12l7.5-7.5'
		/>
	</SvgWrapper>
);

export const ChevronRightIcon: React.FC<IconProps> = ({
	svgClassName,
	strokeWidth,
}) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M8.25 4.5l7.5 7.5-7.5 7.5'
		/>
	</SvgWrapper>
);

export const BellIcon: React.FC<IconProps> = ({
	svgClassName,
	strokeWidth,
}) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
		/>
	</SvgWrapper>
);

export const CalendarIcon: React.FC<IconProps> = ({
	svgClassName,
	strokeWidth,
}) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'
		/>
	</SvgWrapper>
);

export const PieChartIcon: React.FC<IconProps> = ({
	svgClassName,
	strokeWidth,
}) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z'
		/>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z'
		/>
	</SvgWrapper>
);

export const BookIcon: React.FC<IconProps> = ({
	svgClassName,
	strokeWidth,
}) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
		/>
	</SvgWrapper>
);

export const PlusIcon: React.FC<IconProps> = ({
	svgClassName,
	strokeWidth,
}) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M12 4.5v15m7.5-7.5h-15'
		/>
	</SvgWrapper>
);

export const XIcon: React.FC<IconProps> = ({ svgClassName, strokeWidth }) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M6 18L18 6M6 6l12 12'
		/>
	</SvgWrapper>
);

export const DotsHorizontalIcon: React.FC<IconProps> = ({
	svgClassName,
	strokeWidth,
}) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
		/>
	</SvgWrapper>
);

export const QrIcon: React.FC<IconProps> = ({ svgClassName, strokeWidth }) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z'
		></Path>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z'
		></Path>
	</SvgWrapper>
);

export const PencilSquareIcon: React.FC<IconProps> = ({
	svgClassName,
	strokeWidth,
}) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
		></Path>
	</SvgWrapper>
);

export const HeartIcon: React.FC<IconProps> = ({
	svgClassName,
	strokeWidth,
}) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
		></Path>
	</SvgWrapper>
);

export const CogIcon: React.FC<IconProps> = ({ svgClassName, strokeWidth }) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z'
		></Path>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
		></Path>
	</SvgWrapper>
);

export const RecentIcon: React.FC<IconProps> = ({ svgClassName, strokeWidth }) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path
			strokeLinecap='round'
			strokeLinejoin='round'
			d="M9.682,18.75a.75.75,0,0,1,.75-.75,8.25,8.25,0,1,0-6.189-2.795V12.568a.75.75,0,0,1,1.5,0v4.243a.75.75,0,0,1-.751.75H.75a.75.75,0,0,1,0-1.5H3a9.75,9.75,0,1,1,7.433,3.44A.75.75,0,0,1,9.682,18.75Zm2.875-4.814L9.9,11.281a.754.754,0,0,1-.22-.531V5.55a.75.75,0,1,1,1.5,0v4.889l2.436,2.436a.75.75,0,1,1-1.061,1.06Z" transform="translate(1.568 2.25)" fill="#141124" />
	</SvgWrapper>
);

export const ClockIcon: React.FC<IconProps> = ({ svgClassName, strokeWidth }) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></Path>
	</SvgWrapper>
);

export const CheckIcon: React.FC<IconProps> = ({ svgClassName, strokeWidth }) => (
	<SvgWrapper svgClassName={svgClassName} strokeWidth={strokeWidth}>
		<Path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></Path>
	</SvgWrapper>
);
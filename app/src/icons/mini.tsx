import { Svg, Path } from 'react-native-svg';

interface IconProps {
    svgClassName: string;
}

const defaultStyle = 'w-6 h-6 text-white';

const SvgWrapper: React.FC<{
    children: React.ReactNode;
    svgClassName: string;
    viewBox?: string;
}> = ({ children, svgClassName, viewBox = '0 0 20 20' }) => (
    <Svg
        className={svgClassName || defaultStyle}
        fill='currentColor'
        viewBox={viewBox}
    >
        {children}
    </Svg>
);

export const TrophyIcon = ({ svgClassName }: IconProps) => (
    <SvgWrapper svgClassName={svgClassName}>
        <Path fillRule="evenodd" d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 00-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 00-.552.698 5 5 0 004.503 5.152 6 6 0 002.946 1.822A6.451 6.451 0 017.768 13H7.5A1.5 1.5 0 006 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 00-1.5-1.5h-.268a6.453 6.453 0 01-.684-2.202 6 6 0 002.946-1.822 5 5 0 004.503-5.152.75.75 0 00-.552-.698A31.804 31.804 0 0016 2.562v-.387a.75.75 0 00-.629-.74A33.227 33.227 0 0010 1zM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 01-1.855-2.68zm14.95 0a3.503 3.503 0 01-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332z" clipRule="evenodd" />
    </SvgWrapper>
);

export const StarIcon = ({ svgClassName }: IconProps) => (
    <SvgWrapper svgClassName={svgClassName}>
        <Path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
    </SvgWrapper>
);

export const ScaleIcon = ({ svgClassName }: IconProps) => (
    <SvgWrapper svgClassName={svgClassName}>
        <Path fill-rule="evenodd" d="M10 2a.75.75 0 01.75.75v.258a33.186 33.186 0 016.668.83.75.75 0 01-.336 1.461 31.28 31.28 0 00-1.103-.232l1.702 7.545a.75.75 0 01-.387.832A4.981 4.981 0 0115 14c-.825 0-1.606-.2-2.294-.556a.75.75 0 01-.387-.832l1.77-7.849a31.743 31.743 0 00-3.339-.254v11.505a20.01 20.01 0 013.78.501.75.75 0 11-.339 1.462A18.558 18.558 0 0010 17.5c-1.442 0-2.845.165-4.191.477a.75.75 0 01-.338-1.462 20.01 20.01 0 013.779-.501V4.509c-1.129.026-2.243.112-3.34.254l1.771 7.85a.75.75 0 01-.387.83A4.98 4.98 0 015 14a4.98 4.98 0 01-2.294-.556.75.75 0 01-.387-.832L4.02 5.067c-.37.07-.738.148-1.103.232a.75.75 0 01-.336-1.462 32.845 32.845 0 016.668-.829V2.75A.75.75 0 0110 2zM5 7.543L3.92 12.33a3.499 3.499 0 002.16 0L5 7.543zm10 0l-1.08 4.787a3.498 3.498 0 002.16 0L15 7.543z" clip-rule="evenodd" />
    </SvgWrapper>
);
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';


const DoughnutChart: React.FC<{
    svgClassName: string;
    data: {
        value: number;
        color: string;
    }[]
    strokeWidth: number;
}> = ({ svgClassName, data, strokeWidth }) => {
    const innerRadius = 50 - strokeWidth / 2;
    const circumfrence = 2 * Math.PI * innerRadius;

    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    let rotation = -90;

    if (total === 0) {
        return (
            <Svg
                className={`${svgClassName} text-zinc-500`}
                viewBox={`0 0 100 100`}
            >
                <Circle
                    cx={50}
                    cy={50}
                    r={innerRadius}
                    fill='transparent'
                    stroke='currentColor'
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumfrence / 8} ${circumfrence / 14}`}
                    strokeDashoffset={0}
                />
            </Svg>
        )
    }

    return (
        <View className='relative'>
            {data.map((item, index) => {
                const percentage = item.value / total;
                rotation += percentage * 360;

                return (
                    <Svg
                        key={index}
                        className={`${item.color} top-0 ${svgClassName}`}
                        style={{
                            position: index !== data.length - 1 ? 'absolute' : 'relative',
                            transform: [{
                                rotate: `${rotation - 360 * percentage}deg`
                            }]
                        }}
                        viewBox={`0 0 100 100`}
                    >
                        <Circle
                            cx={50}
                            cy={50}
                            r={innerRadius}
                            fill='transparent'
                            stroke='currentColor'
                            strokeWidth={strokeWidth}
                            strokeDasharray={`${circumfrence} ${circumfrence}`}
                            strokeDashoffset={circumfrence * (1 - percentage)}
                        />
                    </Svg>
                )
            })}
        </View>
    );
};

export default DoughnutChart;

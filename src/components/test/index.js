import React from 'react'
import Svg,{ G, Rect, Image, Circle } from 'react-native-svg'
import screen from '../../helpers/ScreenSize'
import images from '../../assets/images'

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Svg
        height={screen.height}
        width={screen.width}
      >
        <G
          x={0}
          y={0}
        >
          <Image
            x={(screen.width / 2) - 50}
            y={-(screen.height / 2) + 94.46}
            width="100"
            height="189.9"
            preserveAspectRatio="xMidYMid slice"
            opacity="1"
            href={images.bateau}
          />
          <Rect
            width={50}
            height={50}
            x={(screen.width / 2) - 25}
            y={(screen.height / 2) - 25}
            scale={1}
            fill="#0071e9"
          />
        </G>
      </Svg>
    );
  }
}
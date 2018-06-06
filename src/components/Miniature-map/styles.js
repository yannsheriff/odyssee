import { StyleSheet } from 'react-native'
import screen from '../../helpers/ScreenSize'

const styles = StyleSheet.create({
    infoContainer: {
      width: screen.width,
      height: 100,
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center"
    },
    windDirText: {
      color: '#ffffff',
      textAlign: 'center',
      width: screen.width / 3
    },
    windDirIcon: {
      textAlign: 'center',
      width: screen.width / 3
    }

})

export default styles

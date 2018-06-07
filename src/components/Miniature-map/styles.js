import { StyleSheet } from 'react-native'
import screen from '../../helpers/ScreenSize'

const styles = StyleSheet.create({
    infoContainer: {
      width: screen.width,
      height: 100,
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center"
    },
    windDirText: {
      color: '#ffffff',
      textAlign: 'center',
      width: screen.width / 3,
      fontFamily: 'Infini-Regular',
      fontSize: 35
    },
    windDirIcon: {
      width: screen.width / 3
    },
    windForceContainer: {
      width: screen.width / 3,
      height: 100,
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center"
    },
    windForce: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#ffffff',
      borderRadius: 14
    }
})

export default styles

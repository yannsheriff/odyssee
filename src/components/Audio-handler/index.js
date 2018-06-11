import React from 'react';
import { View, Text, Animated, Alert } from 'react-native';
import Sound from 'react-native-sound'
import { musique } from '../../assets/sound'
import styles from './styles';

import { connect } from 'react-redux'



class AudioHandler extends React.Component {
  constructor(props) {
    super(props);


    this.musiques = []
    this.state = {
      actualMusique: this.props.sound,
      isPlaying: false
    }
  }


  componentWillMount (nextProps) {
    var homeMusique = new Sound(musique.home, (error) => {
      this.musiques.push({
        id: 0,
        musique: homeMusique
      })
    });

    var sailingMusique = new Sound(musique.sailing, (error) => {
      this.musiques.push({
        id: 1,
        musique: sailingMusique
      })
    });

    var IslandMusique = new Sound(musique.island, (error) => {
      this.musiques.push({
        id: 2,
        musique: IslandMusique
      })
    });

    var awaitME = new Promise(function(resolve, reject) {
      setTimeout(resolve, 1000, 'foo');
    });

    Promise.all([homeMusique, sailingMusique, IslandMusique, awaitME ]).then(()=>{
      // this.playActualMusique() 
    })
  }

  componentDidMount() {
    Sound.setCategory('Ambient');
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.sound !== this.state.actualMusique) {
      this.setState({actualMusique: nextProps.sound}, ()=> {
        this.playActualMusique()
      })
    }
  }


  playActualMusique() {
    switch (this.state.actualMusique) {
      case "Home":
        // this.play(0)
        this.fadeOut(this.state.isPlaying)
        break;
    
      case "Sailing":
        this.play(1, 2000, 3000)
        break;

      case "Island":
        this.play(2, 5000, 5000)
        break;

      case "Introduction":
        this.fadeOut(this.state.isPlaying)
        break;
    
      default:
        break;
    }
  }


  async play(index, timing = 2000, delay = 3000) {
    if(this.state.isPlaying !== false ) {
      await this.fadeOut(this.state.isPlaying, 3000)
      setTimeout(()=> {
        this.setState({isPlaying: index}, ()=> {
          this.musiques.forEach(element => {
            if(element.id === index) {
              element.musique.setVolume(0)
              element.musique.setNumberOfLoops(-1);
              element.musique.play()
              this.fadeIn(element.id, timing, delay)
            }
          })
        })
      }, 1000 )
      
    } else {
      this.setState({isPlaying: index}, ()=> {
        this.musiques.forEach(element => {
          if(element.id === index) {
            element.musique.setVolume(0)
            element.musique.setNumberOfLoops(-1);
            element.musique.play()
            this.fadeIn(element.id, timing, delay)
          } 
        })
      })
    }
  }


  async fadeOut(index, timing = 2000) {
    var nbIteration = timing / 200 
    var subtraction = 0.7 / nbIteration 
    var volume = 0.7
    var fade = setInterval(()=> {
      if(volume > 0) {
        volume = volume - subtraction
      } else if (volume < 0) {
        volume = 0
      }
      this.musiques.forEach(element => {
        if(element.id === index) {
            element.musique.setVolume(volume)
        }
      })
    }, 200)
    setTimeout(()=>{
      clearInterval(fade)
      this.musiques.forEach(element => {
        if(element.id === index) {
            element.musique.stop()
            return true
        }
      })
    }, timing)
  }

  async fadeIn(index, timing = 2000, delay = 0) {
    var volume = 0
    var nbIteration = timing / 200 
    var addition = 0.7 / nbIteration 
    setTimeout( ()=> {
      var fade = setInterval(()=> {
      if(volume < 1) {
        volume = volume + addition
      } else if (volume > 0.7) {
        volume = 0.7
      }
      this.musiques.forEach(element => {
        if(element.id === index) {
          element.musique.setVolume(volume)
        }
      })
    }, 200)
    setTimeout(()=>{clearInterval(fade)}, timing)
  }, delay )
  }

  render() {


      return (
        <View style={ styles.container}>

        </View>
    );
  }
}



/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */
  
  const mapStateToProps = state => {
    return {
        sound: state.sound
      }
  }
  
  const componentContainer = connect(
    mapStateToProps,
  )(AudioHandler)
  
  export default componentContainer
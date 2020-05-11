/* eslint-disable import/prefer-default-export */
import { Audio } from 'expo-av';
const bellRing = require('../assets/Sounds/bell-ring.mp3');
const one = require('../assets/Sounds/fastCountings/1.mp3');
const two = require('../assets/Sounds/fastCountings/2.mp3');
const three = require('../assets/Sounds/fastCountings/3.mp3');
const four = require('../assets/Sounds/fastCountings/4.mp3');
const five = require('../assets/Sounds/fastCountings/5.mp3');
const six = require('../assets/Sounds/fastCountings/6.mp3');
const seven = require('../assets/Sounds/fastCountings/7.mp3');
const eight = require('../assets/Sounds/fastCountings/8.mp3');
const nine = require('../assets/Sounds/fastCountings/9.mp3');
const ten = require('../assets/Sounds/fastCountings/10.mp3');
const success = require('../assets/Sounds/success.mp3');
const boxingBell = require('../assets/Sounds/boxingBell.mp3');
const kyai = require('../assets/Sounds/boxingBell.mp3');
const longBeep = require('../assets/Sounds/boxingBell.mp3');

const playSound = async (audioFile: any, volume = 1.0) => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(audioFile);
    await soundObject.setVolumeAsync(volume);
    await soundObject.playAsync();
  } catch (error) {
    console.log('no play:', error);
    // An error occurred!
  }
};

export const playBell = () => playSound(bellRing);
export const playSuccess = () => playSound(success);
export const playWarning = () => playSound(boxingBell, 0.5);
export const playKyai = () => playSound(kyai);
export const playLongBeep = () => playSound(longBeep);

export const playCount = (currCount: number) => {
  if (currCount === 0) {
    return;
  }

  switch (currCount % 10) {
    case 1:
      playSound(one);
      break;
    case 2:
      playSound(two);
      break;
    case 3:
      playSound(three);
      break;
    case 4:
      playSound(four);
      break;
    case 5:
      playSound(five);
      break;
    case 6:
      playSound(six);
      break;
    case 7:
      playSound(seven);
      break;
    case 8:
      playSound(eight);
      break;
    case 9:
      playSound(nine);
      break;
    default:
      playSound(ten);
  }
};

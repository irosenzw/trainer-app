/* eslint-disable import/prefer-default-export */
// import { Audio } from 'expo-av';
/*import bellRing from '../assets/Sounds/bell-ring.mp3';
import one from '../assets/Sounds/fastCountings/1.mp3';
import two from '../assets/Sounds/fastCountings/2.mp3';
import three from '../assets/Sounds/fastCountings/3.mp3';
import four from '../assets/Sounds/fastCountings/4.mp3';
import five from '../assets/Sounds/fastCountings/5.mp3';
import six from '../assets/Sounds/fastCountings/6.mp3';
import seven from '../assets/Sounds/fastCountings/7.mp3';
import eight from '../assets/Sounds/fastCountings/8.mp3';
import nine from '../assets/Sounds/fastCountings/9.mp3';
import ten from '../assets/Sounds/fastCountings/10.mp3';
import success from '../assets/Sounds/success.mp3';
import boxingBell from '../assets/Sounds/boxingBell.mp3';
import kyai from '../assets/Sounds/kyai.mp3';
import longBeep from '../assets/Sounds/longBeep.mp3';

const playSound = async (audioFile, volume = 1.0) => {
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

export const playCount = (currCount) => {
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
*/

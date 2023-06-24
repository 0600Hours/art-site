import i00 from './00.png';
import i01 from './01.png';
import i02 from './02.png';
import i03 from './03.png';
import i04 from './04.png';
import i05 from './05.png';
import i06 from './06.png';
import i07 from './07.png';
import i08 from './08.png';
import i09 from './09.png';
import i13 from './13.png';
import i14 from './14.png';
import i15 from './15.png';
import i16 from './16.png';
import i17 from './17.png';
import i19 from './19.png';
import i20 from './20.png';
import i21 from './21.png';
import i22 from './22.png';
import i23 from './23.png';
import i24 from './24.png';
import i25 from './25.jpg';
import i27 from './27.jpg';
import i28 from './28.jpg';
import i29 from './29.png';
import i30 from './30.png';

const imageArray = [
  i00, i28, i16,
  i27, i17, i21,
  i15, i23, i06,
  i25, i05, i01,
  i02, i03, i19,
  i04, i24, i07,
  i08, i09, i20,
  i22, i13, i14,
  i29, i30,
];

export const portfolioImages = imageArray.map((image, index) => { return {src: image, id: index }});
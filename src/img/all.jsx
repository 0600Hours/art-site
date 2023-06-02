import i00 from '../img/00.png';
import i01 from '../img/01.png';
import i02 from '../img/02.png';
import i03 from '../img/03.png';
import i04 from '../img/04.png';
import i05 from '../img/05.png';
import i06 from '../img/06.png';
import i07 from '../img/07.png';
import i08 from '../img/08.png';
import i09 from '../img/09.png';
import i11 from '../img/11.png';
import i13 from '../img/13.png';
import i14 from '../img/14.png';
import i15 from '../img/15.png';
import i16 from '../img/16.png';
import i17 from '../img/17.png';
import i19 from '../img/19.png';
import i20 from '../img/20.png';
import i21 from '../img/21.png';
import i22 from '../img/22.png';
import i23 from '../img/23.png';
import i24 from '../img/24.png';
import i25 from '../img/25.jpg';
import i26 from '../img/26.png';
import i27 from '../img/27.jpg';

const imageArray = [
  i00, i15, i16,
  i27, i17, i21,
  i22, i23, i06,
  i25, i05, i01,
  i02, i03, i19,
  i04, i24, i07,
  i08, i09, i20,
  i11, i13, i14,
];

export const images = imageArray.map((image, index) => { return {src: image, id: index }});
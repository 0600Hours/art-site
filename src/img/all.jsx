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
import i10 from '../img/10.png';
import i11 from '../img/11.png';
import i13 from '../img/13.png';
import i14 from '../img/14.png';
import i15 from '../img/15.png';
import i16 from '../img/16.png';
import i17 from '../img/17.png';
import i18 from '../img/18.jpg';

const imageArray = [
  i00, i15, i16, i17, i01, i02, i03, i04, i18, i05,
  i06, i07, i08, i09, i10, i11, i13, i14,
];

export const images = imageArray.map((image, index) => { return {src: image, id: index }});
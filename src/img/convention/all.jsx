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

const imageArray = [
  i00, i01, i02,
  i03, i04, i05,
  i06, i07, i08,
  i09,
];

export const conventionImages = imageArray.map((image, index) => { return {src: image, id: index }});
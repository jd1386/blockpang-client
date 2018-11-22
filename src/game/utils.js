const getRandColor = brightness => {
  // Six levels of brightness from 0 to 5, 0 being the darkest
  let rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
  let mix = [brightness * 51, brightness * 51, brightness * 51]; //51 => 255/5
  let mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(
    function(x) {
      return Math.round(x / 2.0);
    }
  );
  return 'rgb(' + mixedrgb.join(',') + ')';
};

const sayHi = () => {
  alert('Hi');
};

export default {
  getRandColor,
  sayHi
};

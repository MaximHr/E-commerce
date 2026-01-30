export default function getColor(secondaryColor, i) {
	console.log(secondaryColor, i)
	let {hue, saturation, lightness} = convertColor(secondaryColor);
	// if((i % 4 ) == 0 || (i % 4) == 3) {
	// 	hue += 180;
	// } 
	hue += (90 * i);
	hue %= 360;
	if(saturation > 90) {
		saturation = 90;
	}
	if(lightness  < 55) {
		lightness = 55;
	} else if(lightness > 75) {
		lightness = 75;
	}
	return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function convertColor(hex) {
	// Convert hex to RGB
	hex = hex.replace('#', '');
	let r = parseInt(hex.substring(0, 2), 16) / 255;
	let g = parseInt(hex.substring(2, 4), 16) / 255;
	let b = parseInt(hex.substring(4, 6), 16) / 255;

	// Get the min and max values of RGB
	let max = Math.max(r, g, b);
	let min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;
	// Calculate Hue
	if (max === min) {
			h = s = 0; // Achromatic (gray)
	} else {
			let d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
					case r: h = (g - b) / d + (g < b ? 6 : 0); break;
					case g: h = (b - r) / d + 2; break;
					case b: h = (r - g) / d + 4; break;
			}
			h = Math.round(h * 60);
	}

	s = Math.round(s * 100);
	l = Math.round(l * 100);

	return { hue: h, saturation: s, lightness: l };
}

let colors = ["#f9c80e", "#f86624", "#ea3546", "#662e9b", "#43bccd", "#fb62f6", "#645dd7","#F5D942"];

function setup() {
	createCanvas(800, 800);
	noLoop();
}

function draw() {
	background(241);
	translate(width / 2, height / 2);
	scale(0.9);
	translate(-width / 2, -height / 2);
	grid();
}

function grid() {
	let seg1 = int(random(2, 7));
	let seg2 = int(random(2, 7));
	let w = width / seg1;
	let h = height / seg2;
	for (let i = 0; i < seg1; i++) {
		for (let j = 0; j < seg2; j++) {
			let x = i * w;
			let y = j * h;
			let off = 10;
			shuffle(colors, true);
			stroke(0);
			strokeWeight(2);
			fill(colors[0]);
			rect(x, y, w - off, h - off);
			for (let n = 0; n < 4; n++) {
				randomShape(x, y, w - off, h - off, colors[n + 1]);
			}
		}
	}
}

function randomShape(x_, y_, w_, h_, col) {
	let grfx = createGraphics(w_, h_);
	let rnd = int(random(6));
	let num = int(random(1, 4));
	grfx.rectMode(CENTER);
	grfx.fill(col);
	grfx.stroke(9);
	grfx.strokeWeight(1.35);
	for (let i = 0; i < num; i++) {
		let w = random(5, w_ * 0.35);
		let h = random(5, h_ * 0.35);
		let x = (random(1.4) - 0.2) * grfx.width;
		let y = (random(1.4) - 0.2) * grfx.height;

		if (rnd == 0) {
			if (random(1) < 0.1) grfx.noFill();
			grfx.circle(x, y, w);
		}
		if (rnd == 1) {
			if (random(1) < 0.1) grfx.noFill();
			grfx.push();
			grfx.translate(x, y);
			grfx.rotate(int(random(8)) * TAU / 8);
			grfx.rect(0, 0, w, h);
			grfx.pop();
		}
		if (rnd == 2) {
			grfx.beginShape();
			grfx.vertex(x + w, h_);
			grfx.vertex(x, h_ - h);
			grfx.vertex(x - w, h_);
			grfx.endShape(CLOSE);
		}
		if (rnd == 3) {
			h *= 2;
			grfx.beginShape();
			grfx.vertex(x + w, h_);
			grfx.vertex(x + w, h_ - h);
			grfx.vertex(x - w, h_ - h);
			grfx.vertex(x - w, h_);
			grfx.endShape(CLOSE);
		}
		if (rnd == 4) {
			grfx.push();
			grfx.translate(x, y);
			grfx.rotate(int(random(8)) * TAU / 8);
			grfx.line(0, 0, w * h, 0);
			grfx.pop();
		}
		if (rnd == 7) {
			if (random(1) < 0.1) grfx.noFill();
			grfx.push();
			grfx.translate(x, y);
			grfx.rotate(PI * 0.5 + int(random(2)) * PI);
			if (random(1) < 0.1) grfx.noFill();
			grfx.beginShape();
			for (let j = 0; j < 3; j++) {
				let t = (TAU / 3) * j;
				grfx.vertex(w * cos(t), w * sin(t));
			}
			grfx.endShape(CLOSE);
			grfx.pop();
		}
	}
	image(grfx, x_, y_);
}
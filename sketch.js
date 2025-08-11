// Kandinsky-inspired animated abstract painting
// p5.js sketch

let shapes = [];

function setup() {
  createCanvas(800, 600);
  noStroke();
  // Create a set of animated abstract shapes
  for (let i = 0; i < 25; i++) {
    shapes.push({
      type: random(["circle", "rect", "triangle", "line"]),
      x: random(width),
      y: random(height),
      size: random(30, 120),
      col: color(random(255), random(255), random(255), random(150, 255)),
      dx: random(-1, 1),
      dy: random(-1, 1),
      rot: random(TWO_PI),
      drot: random(-0.01, 0.01)
    });
  }
}

function draw() {
  background(240, 240, 235);

  // Large background circles/arcs for depth
  for (let i = 0; i < 5; i++) {
    fill(random(255), random(255), random(255), 40);
    noStroke();
    ellipse(
      width * noise(frameCount * 0.001 + i),
      height * noise(frameCount * 0.001 + i + 100),
      300,
      300
    );
  }

  // Draw and animate shapes
  for (let s of shapes) {
    push();
    translate(s.x, s.y);
    rotate(s.rot);
    fill(s.col);

    if (s.type === "circle") {
      ellipse(0, 0, s.size);
    } else if (s.type === "rect") {
      rectMode(CENTER);
      rect(0, 0, s.size, s.size * 0.6);
    } else if (s.type === "triangle") {
      triangle(
        -s.size / 2,
        s.size / 2,
        s.size / 2,
        s.size / 2,
        0,
        -s.size / 2
      );
    } else if (s.type === "line") {
      stroke(s.col);
      strokeWeight(random(2, 6));
      line(-s.size / 2, 0, s.size / 2, 0);
      noStroke();
    }

    pop();

    // Animate movement
    s.x += s.dx;
    s.y += s.dy;
    s.rot += s.drot;

    // Bounce off edges
    if (s.x < 0 || s.x > width) s.dx *= -1;
    if (s.y < 0 || s.y > height) s.dy *= -1;
  }

  // Extra moving black lines for Kandinsky flair
  stroke(0, 150);
  strokeWeight(2);
  for (let i = 0; i < 6; i++) {
    let x1 = (frameCount * 0.5 + i * 100) % width;
    let y1 = noise(i * 0.3, frameCount * 0.01) * height;
    let x2 = x1 + random(-50, 50);
    let y2 = y1 + random(-50, 50);
    line(x1, y1, x2, y2);
  }
}

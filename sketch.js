// ==========================================
// IT3 Final Drill: Math-Based Animation
// Topic: Circular Motion using Trigonometry
// ==========================================

// --- Animation State Variables ---
let centerX;              // X-coordinate of the center of the orbit
let centerY;              // Y-coordinate of the center of the orbit
let orbitRadius = 140;    // Radius (r) of the circular path in pixels
let angle = 0;            // Current angle (theta) in radians
let angularSpeed = 0.03;  // How much the angle increases per frame (radians/frame)
let isPaused = false;     // Tracks whether the animation is paused

function setup() {
  // Create a 700x450 canvas inside the <main> HTML element
  let canvas = createCanvas(700, 450);
  
  // Set the center point of the orbit to the middle of the canvas
  centerX = width / 2;
  centerY = height / 2;
}

function draw() {
  background(24, 28, 36);

  // 1. Draw reference grid axes passing through (centerX, centerY)
  stroke(60, 70, 85);
  strokeWeight(1);
  line(0, centerY, width, centerY); // X-axis
  line(centerX, 0, centerX, height); // Y-axis

  // 2. Draw the circular orbit path (diameter = 2 * orbitRadius)
  noFill();
  stroke(90, 110, 140);
  strokeWeight(2);
  circle(centerX, centerY, orbitRadius * 2);

  // 3. MATHEMATICAL CALCULATION (Trigonometry)
  // Convert polar coordinates (orbitRadius, angle) to Cartesian coordinates (x, y)
  // x = centerX + r * cos(theta)
  // y = centerY + r * sin(theta)
  let objectX = centerX + orbitRadius * cos(angle);
  let objectY = centerY + orbitRadius * sin(angle);

  // 4. Draw right-triangle legs to visualize cosine (horizontal) and sine (vertical)
  stroke(255, 180, 70); // Orange line for horizontal cosine component
  strokeWeight(2);
  line(centerX, centerY, objectX, centerY);

  stroke(100, 220, 150); // Green line for vertical sine component
  line(objectX, centerY, objectX, objectY);

  // Draw radius hypotenuse line from center to orbiting object
  stroke(255, 255, 255, 150);
  line(centerX, centerY, objectX, objectY);

  // 5. Draw the central anchor point and the orbiting object
  fill(255, 100, 100);
  noStroke();
  circle(centerX, centerY, 14); // Center point

  fill(77, 184, 255);
  circle(objectX, objectY, 26); // Orbiting planet/dot

  // 6. Update the angle over time if not paused
  if (!isPaused) {
    angle += angularSpeed;
    // Keep angle within 0 to TWO_PI (0 to 360 degrees) for clean numbers
    if (angle >= TWO_PI) {
      angle -= TWO_PI;
    }
  }

  // 7. Display live math values & control instructions on the canvas
  drawHUD(objectX, objectY);
}

// Helper function to display live variables and controls on the canvas
function drawHUD(x, y) {
  fill(240);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);

  // Live mathematical values (useful for verifying worked examples)
  let angleDeg = degrees(angle).toFixed(1);
  text(`Center: (${centerX}, ${centerY})`, 15, 15);
  text(`Radius (r): ${orbitRadius} px`, 15, 35);
  text(`Angle (θ): ${angle.toFixed(2)} rad (${angleDeg}°)`, 15, 55);
  text(`Speed: ${angularSpeed.toFixed(3)} rad/frame`, 15, 75);
  text(`Object Position: (${x.toFixed(1)}, ${y.toFixed(1)})`, 15, 95);

  // Control instructions displayed directly on the canvas
  textAlign(LEFT, BOTTOM);
  fill(200, 220, 255);
  text("Controls: [SPACE] Pause/Resume | [UP/DOWN] Speed | [LEFT/RIGHT] Radius", 15, height - 15);
}

// Keyboard interaction to control speed, radius, and pause state
function keyPressed() {
  if (key === ' ') {
    isPaused = !isPaused; // Toggle pause
  } else if (keyCode === UP_ARROW) {
    angularSpeed += 0.01; // Increase speed
  } else if (keyCode === DOWN_ARROW) {
    angularSpeed = max(0.01, angularSpeed - 0.01); // Decrease speed (minimum 0.01)
  } else if (keyCode === RIGHT_ARROW) {
    orbitRadius = min(200, orbitRadius + 15); // Increase radius
  } else if (keyCode === LEFT_ARROW) {
    orbitRadius = max(40, orbitRadius - 15); // Decrease radius
  }
}
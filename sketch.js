let capture;
let bodyPose;
let poses = [];

let noseX,noseY;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose,skeleton;
let actor_img;
let specs,smoke;
let connections;


function preload() {
    // Load the bodyPose model
    bodyPose = ml5.bodyPose();
  }
function setup() {
    createCanvas(800, 500);
    capture = createCapture(VIDEO)
    capture.hide();
    bodyPose.detectStart(capture, gotPoses);
    connections = bodyPose.getSkeleton();
    // posenet = ml5.bodyPose(capture, modelLoaded);
    // posenet.on('pose',receivedPoses);

    // actor_img = loadImage('images/shahrukh.png');
    // specs = loadImage('images/spects.png');
    // smoke = loadImage('images/cigar.png');

}

function receivedPoses(poses){
    console.log(poses);

    if(poses.length > 0){
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function gotPoses(results) {
  // Store the model's results in a global variable
  poses = results;
}

function draw() {

    // images and videos(webcam)
    image(capture, 0, 0);
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i];
        
        for (let j = 0; j < connections.length; j++) {
            let pointAIndex = connections[j][0];
            let pointBIndex = connections[j][1];
            let pointA = pose.keypoints[pointAIndex];
            let pointB = pose.keypoints[pointBIndex];
      
      // Only draw a line if we have confidence in both points
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

    // Iterate through all the poses
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i];
        // Iterate through all the keypoints for each pose
        for (let j = 0; j < pose.keypoints.length; j++) {
            let keypoint = pose.keypoints[j];
            // Only draw a circle if the keypoint's confidence is greater than 0.1
            if (keypoint.confidence > 0.1) {
                fill(0, 255, 0);
                noStroke();
                circle(keypoint.x, keypoint.y, 10);
              }
            }
          }
        }
        


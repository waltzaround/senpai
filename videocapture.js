function detectFace(){
    let video = document.getElementById("videoInput"); // video is the id of video tag
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.log("An error occurred! " + err);
    });
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let gray = new cv.Mat();
    let cap = new cv.VideoCapture(video);
    let faces = new cv.RectVector();
    const FPS = 30;
    let classifier = new cv.CascadeClassifier();
    classifier.load('haarcascade_frontalface_default.xml');
    let width = 320;
    let height = 0;
    height = video.videoHeight / (video.videoWidth/width);
    video.setAttribute("width", width);
    video.setAttribute("height", height);
    streaming = true;
    vc = new cv.VideoCapture(video);


    function processVideo(){
        try {
           /* if (!true){
                // streaming is a boolean for on and off basically - iff not on, clean up the Mats
                src.delete();
                dst.delete();
                gray.delete();
                faces.delete();
                classifier.delete();
                return;
            }
            */
            let begin = Date.now();
            // processing.
            cap.read(src);
            src.copyTo(dst);
            cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
            console.log("hello");
            // face detection
            classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
            // notes to self: faces is a rectvector
            for (let i = 0; i < faces.size(); ++i) {
                let face = faces.get(i);
                let point1 = new cv.Point(face.x, face.y);
                let point2 = new cv.Point(face.x + face.width, face.y + face.height);
                cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
            }
            if (faces.size() < 1){
                console.log("Where you at?");
            }// for a certain amount of time... inc a variable
            else{
                console.log("I see ya");
            }
            let delay = 1000/FPS - (Date.now() - begin);
            setTimeout(processVideo, delay);
            //else reset variable, 
            //always settimeout to start processagain

            }
        catch(err){
            console.log(err);
        }
    }
    setTimeout(processVideo, 0);
}

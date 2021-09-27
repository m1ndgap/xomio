/* Video */
let video = document.querySelector('video');
let isPaused = false;
let observer = new IntersectionObserver((entries, observer) => { 
    entries.forEach(entry => {
        if(entry.intersectionRatio!=1  && !video.paused){
            video.pause();
            isPaused = true;
        }
        else if(isPaused) {
            video.play(); 
            isPaused=false}
        });
    }, {threshold: 1});
    observer.observe(video);
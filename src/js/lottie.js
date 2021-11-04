/* Lottie in fullpage.js */
let $players = document.querySelectorAll('[data-player="lottie"]');

if ($players) {
    for (let player of $players) {
        playerInit(player);
    }
}

function playerInit(player){
    let target = player.parentElement;
    let source = player.getAttribute('src');

    // create an observer instance
    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.removedNodes.length > 0) { // You need to check if the mutation.removedNodes array contains div#test2 here. I'm just too lazy.

                const removedPlayer = [...mutation.removedNodes].find(el => el === player);

                if (removedPlayer) {
                    removedPlayer.load(source)
                    target.append(removedPlayer.cloneNode(true))
                    observer.disconnect(); // stop observing
                }
            }
        });
    });

    // configuration of the observer
    observer.observe(target, {
        childList: true
    }); // start observe
}

class Notify {
    constuctor() {
        this.play = this.play.bind(this);
    }
    play(user) {
        let sound = new Audio('/resources/notify.mp3')
        sound.play();
        document.title = user.name + " messaged you on WobChat!";
        let interval = setInterval(function() {
            if (document.hasFocus()) {
                document.title = "WobChat";
                clearInterval(interval);
            }
        }, 100);
    }
}

module.exports = Notify;

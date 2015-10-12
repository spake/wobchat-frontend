class Notify {
    constuctor() {
        if (!Notification) {
            alert('Desktop notifications not available in your browser. Try Chromium.'); 
            return;
        }
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }

        this.play = this.play.bind(this);
    }
    play(name) {
        let sound = new Audio('/resources/notify.mp3')
        sound.play();
        if (Notification.permission === "granted") {
            let notification = new Notification('New Message on WobChat', {
              icon: 'https://wob.chat/resources/logo.png',
              body: "WobChat: You have a new message from " + name + "!",
            });

            notification.onclick = function () {
              window.open("https://wob.chat/#!/chat");
            };
        }
    }
}

module.exports = Notify;

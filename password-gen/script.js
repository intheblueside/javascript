var password = document.getElementById("password");

// to generate password

function genPassword() {
    var password = "";
    var passwordLength = 12;
    var chars= "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i=0; i<=passwordLength; i++) {
        var randomNum = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNum, randomNum + 1);
    }
    document.getElementById("password").value = password;
}

// to copy password
function copyPassword() {
    var copyText = document.getElementById("password");
    copyText.select();
    document.execCommand("copy");
}

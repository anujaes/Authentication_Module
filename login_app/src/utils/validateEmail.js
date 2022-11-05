function isValidEmail(inputString) {

    let mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (inputString.match(mailformat))
        return true;
    else {
        return false;
    }
}

export {isValidEmail};
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

Array.prototype.fromObject = function (obj) {
    var ar = [];
    for(item in obj){
        ar.push(obj[item]);
    }
    return ar;
};

var unknown_subjects = ["Matière inconnue", "Unknown subject"];

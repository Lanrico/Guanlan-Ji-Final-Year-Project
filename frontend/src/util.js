export function changeElementColor(elementId, color, bColor) {
    console.log(elementId)
    var element = document.getElementById(elementId);
    console.log(element)
    // element.style.color = color;
    // element.style.backgroundColor = bColor;
}

export function listToString(list, name) {
    var string = '';
    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (index === 0) {
            string = element[name].toString();
        }
        else {
            string = string + ', ' + element[name].toString();
        }
    }
    return string;
}

export const capitalizeFirstLowercaseRest = (str) => {
    return (
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    );
};

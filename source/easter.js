function easter(egg) {
    if (egg == "eroro") {
        console.log("We don't talk about it. 🚫🧼");
    } else {
        console.log("Activated an easter egg! 🥳🎉");
    }

    switch (egg) {
        case "eroro":
            resultsPerPageWrapper.children[2].innerText = "***** ****"
            break;
        case "se7en":
            const option = document.createElement("option")
            option.innerHTML = 7
            option.value = 7
            option.selected = true
            resultsPerPageSelect.insertBefore(option, resultsPerPageSelect.firstChild)
    }
}

function chancePercent(itemName, itemPercent) {
    if (typeof itemName !== 'string') {
        console.error('Error: Item name must be a string.');
        return;
    }
    
    if (isNaN(itemPercent)) {
        console.error('Error: Item percent must be a number.');
        return;
    }
    
    var chance = Math.floor(Math.random().toFixed(2) * 100);
    const percent = parseInt(itemPercent);

    if (chance < percent) {
        easter(itemName)
    }
}


  
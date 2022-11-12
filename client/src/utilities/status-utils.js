export function shuffle(array) {
    let currentIndex = array.length
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


export function chunkArray(arr, n) {
    let chunkLength = Math.max(arr.length / n, 1);
    let chunks = [];
    arr.forEach((x, i) =>
        (chunkLength * (i + 1) <= arr.length)
        && chunks.push({
            players: arr.slice(chunkLength * i, chunkLength * (i + 1)),
            team_id: (i + 1).toString()
        })
    );
    return chunks;
}

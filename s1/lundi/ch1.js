const inscriptions = ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona"];

function showAll(inscriptions){
    for(inscrit of inscriptions)
        console.log(inscrit);
        
}
function showFirst(inscriptions){
    console.log(inscriptions[0]);
}
function showLast(inscriptions){
    console.log(inscriptions[inscriptions.length - 1]);
}
inscriptions.push("Armin","Eren")

showAll(inscriptions);


const notes = [12, 8, 15, 6, 18, 9, 14]
const sum = notes.reduce((s,c)=>s+=c,0)
const m = sum/notes.length
let min = notes[0]
let max = notes[0]
let aboveAvg=0;
for(note of notes){
    if (min>note) {
        min = note
    }
    if (max<note) {
        max=note;
    }
    /// calcule des notes superieur a 10
    if(note>=10) aboveAvg++
}
const result = `la somme des notes est : ${sum}\nla note sup est: ${max}\nla note inf est: ${min}\n${aboveAvg} student above avg`
console.log(result)
class Student {
    constructor(name, age, note) {
        this.name = name;
        this.age = age;
        this.note = note;
    }
}
const students = [
    new Student("Alice", 20, 15),
    new Student("Bob", 22, 12),
    new Student("Charlie", 19, 18),
    new Student("Diana", 21, 14),
    new Student("Ethan", 23, 16),
    new Student("Fiona", 20, 17)
];

function etudiantsAdmis(student) {
    for (const student of students)
        if (student.note >= 12) {
            console.log(`${student.name}`);
        }
}
function sortByAge(studens){
    return studens.sort((s1,s2)=>s1.age-s2.age)
}

function findByName(name,students){
    const student = students.find(s=>s.name===name);
    console.log((student === undefined)? "not found" : student.name);
    
}
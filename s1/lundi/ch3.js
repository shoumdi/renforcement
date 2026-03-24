let person = {
    name:"Armin",
    lname:"Ar",
    age:19,
    ville:"Rabat",
    email:"email@email.com"
}

function present(person){
    console.log(`Im ${person.name + person.lname} from ${person.ville} Im ${person.age} yo`);
}
person.ville = "Marrakech"

for(const [key,value] of Object.entries(person))
    console.log(`${key} --> ${value}`);
    
//  const name = "Max";
//  let age = 20;
//  var hasHobbies = true;

//  age = 21;

//  const summarizeUser = (userName, userAge, userHobbies)=> {
//     return(
//         'Name is ' +
//         userName +
//         ', age is ' +
//         userAge +
//         ' and the user has hobbies: ' +
//         userHobbies
//     )
//  }

// const add = (a,b)=> a+b;

// console.log(add(2,4));


//  console.log(summarizeUser(name,age,hasHobbies));

// const person ={
//     name:"Meezan",
//     age:20,
//     greet:()=> {
//         console.log(`Hi, I am ${this.name}`)
//     }
// }

// person.greet(); Hi I am undefined (because of arrow function which make find global object);

// const hobbies = ['Sports', 'Cooking'];
// for(let hobby of hobbies){
//     console.log(hobby);
// }

// console.log(hobbies.map(hobby=>'Hobby: '+ hobby))
// console.log(hobbies)

// const person ={
//     name:"Meezan",
//     age:20,
//     greet:()=> {
//         console.log(`Hi, I am ${this.name}`)
//     }
// }

// Spread Operator
// const copiedPerson = {...person}
// console.log(copiedPerson)

// const copiedArray = [...hobbies];
// console.log(copiedArray);

// Rest Operator
// const toArray = (...args)=>{
//     return args
// }
// console.log(toArray(1,2,3,4))

// Destructuring
// const person ={
//     name:"Meezan",
//     age:20,
//     greet:()=> {
//         console.log(`Hi, I am ${this.name}`)
//     }
// }
// const printName = (person)=>{
//     console.log(person.name)
// }
// const printName = ({name, age})=>{
//     console.log(name, age)
// }
// printName(person)
// const {name ,age}= person;
// console.log(name, age)

// const hobbies= ["Sports", "Cooking"];
// const [hobby1, hobby2] = hobbies;
// console.log(hobby1,hobby2)

// First way
// const fetchData = callback =>{
//     setTimeout(()=>{
//         callback('Done');
//     }, 1500);
// }  
// setTimeout(()=>{
//     console.log("Timer is done!");
//     fetchData(text => {
//         console.log(text)
//     });
// },2000);

// Promises Way
// const fetchData = () =>{
//     const promise = new Promise((resolve,reject)=>{
//         setTimeout(()=>{ 
//             resolve('Done');
//         }, 1500);
//     });
//     return promise;
// }  

// setTimeout(()=>{
//     console.log("Timer is done!");
//     fetchData().then(text =>{
//         console.log(text);
//         return fetchData();
//     })
//     .then(text2 => {
//         console.log(text2);
//     })
// },2000);

// console.log('Hello!');
// console.log('Hi!');
const form = document.getElementById("contact-form");

const response = document.getElementById("response");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const inputs = form.querySelectorAll("input, textarea");

const data = {

name: inputs[0].value,

email: inputs[1].value,

message: inputs[2].value

};

const result = await fetch(

"http://localhost:5000/contact",

{

method: "POST",

headers: {

"Content-Type":"application/json"

},

body: JSON.stringify(data)

}

);

const output = await result.json();

response.innerText = output.message;

form.reset();

});
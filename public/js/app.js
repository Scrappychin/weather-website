console.log('client side javascript file is loaded')


//lecture 58 - This is getting the stuff on the form made in index.hbs
const weatherForm = document.querySelector('form')
//selecting the input in the index form
const search = document.querySelector('input')
//59 wiring up the interface, here he actually explained how this works, it finds the first form, or first input or first <p> aragraph
//if you wanna get a certain paragraph or form or whatever then you gotta assign a unique ID on the form in index
const messageOne = document.querySelector('#messagePoops')
const messageTwo = document.querySelector('#messageScrotum')
//messageOne.textContent = 'From Javascript'




//adding an event listener which will first name the event of the thing that we are listening for (submit) and the function to run when it is submitted
//usually you add this (e) argument to say prevent the page from refreshing after submission
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    //making the url pass with the argument encoded as URI so it is proper (he doesn't do this in the course but I think it would be right)
    const urlAddress = 'http://localhost:3000/weather?address='+encodeURIComponent(location)
    //This dude is going just above fetch to let the person know that the data is coming
    messageOne.textContent = 'Finding your weather ya mug'
    messageTwo.textContent = ''
    //my understanding of the then function is to wait for the fetch to complete, then to do the thing
    //in this case it is a function called response sending the data to the console
    fetch(urlAddress).then((response) =>{
        response.json().then((data)=> {
            if(data.error){
                console.log(data.error)
            }else{
                messageOne.textContent = 'Location returned: '+data.location
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }   
        })
    })
})




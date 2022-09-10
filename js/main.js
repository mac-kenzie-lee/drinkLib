//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
const isDrunk = {drunk:0, noDrink:false, homeMenu:true}
document.querySelector('form').addEventListener('submit', getDrink)

document.querySelector('form').addEventListener('click', (f) => {
   if (isDrunk.noDrink === true) {
    document.querySelector(".nodrinky").remove()
    isDrunk.noDrink = false;
   }
    if (isDrunk.drunk > 0) {
        f.target.value = ""

    }})

document.querySelector('form').addEventListener('submit', (d) => {
if (isDrunk.drunk > 0) {
        document.querySelectorAll("article").forEach((q) => q.remove()) 
        getDrink(d)
}})

    

const main = document.querySelector("main")

function getDrink(e) {
    e.preventDefault();
    if (isDrunk.homeMenu === true) {
        //if the initial search ran it changes the style of the home menu
        let land = document.querySelectorAll(".land");
        //removes the land class from all elements
        land.forEach((e) => {
            e.classList.remove('land');
        })
        isDrunk.homeMenu = false;

    }
    let drink = document.querySelector('input').value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        .then(res => res.json())
        .then(data => {


       drunk(data)
       isDrunk.drunk++;

       document.querySelector('form').removeEventListener('submit', getDrink)
        }).catch(err => {
            console.log(`An error: ${err} was encountered, try again.`)
        })

}

function noDrinksFound(){

    const noDrinks = document.createElement("div")
    noDrinks.classList.add('nodrinky')
    const noDrinksWarning = document.createElement("h2")
    const noDrinksReason = document.createElement("p")

    noDrinksReason.innerText = "No drinks found! Try searching again with a different term."
    noDrinksWarning.innerText = "Hey, a little drunk already?"
    noDrinks.appendChild(noDrinksWarning)
    noDrinks.appendChild(noDrinksReason)
    main.appendChild(noDrinks);
    isDrunk.noDrink = true;
}

function drunk(data) { 
    
    if (data.drinks === null) {
        noDrinksFound();       
    } else {
        let drinkCount = data.drinks.length
    for (let i = 0; i < drinkCount; i++) {
        console.log(data.drinks[i])
        const drinkContainer = document.createElement("article")
        drinkContainer.classList.add('flexCard')
        drinkContainer.classList.add('slide')

        const drinkwrap = document.createElement('section'
        )
        const drinkInfoContainer = document.createElement("div")
        const drinkInfoLeft = document.createElement("div") 
        const drinkInfoRight = document.createElement("div")
        const drinkGlass = document.createElement("p")
        const drinkIngredH = document.createElement('h3')
        const drinkIngred = document.createElement("ul")
        const drinkIndredlist = document.createElement("p")
        

        const drinkImg = document.createElement("img")
        
        const drinkName = document.createElement("h2")

        const drinkInstructions = document.createElement("h3")
        const drinkSteps = document.createElement("p")
        const drinkThumb = document.createElement("img")
        const drinkTcont = document.createElement('div')
        


        drinkIngredH.innerText = "Ingredients:"
        drinkIngredH.classList.add('ingredH')
        if (i === 0) {
            drinkContainer.dataset['active'] = true

        }

        drinkGlass.innerText = "Use a " + data.drinks[i].strGlass
        drinkGlass.classList.add('drinkGlass')
        let ingred = "";
        for (let k = 1; k <= 15; k++) {
            let ka = "strMeasure" + k
            let va = "strIngredient" + k;
            if(data.drinks[i][va] !== null) {
                
                let ki = data.drinks[i][va];
                let vi = data.drinks[i][ka];
  
                let pi = document.createElement("li");
                pi.classList.add("ingredLi");

                if (vi !== null) {
                pi.innerText = vi + " " + ki;
                } 
                else {
                    pi.innerText = ki ;
                }
                drinkIngred.appendChild(pi)
            }
        }

        drinkTcont.classList.add("title")
        drinkImg.classList.add("drinkImg")
        drinkThumb.classList.add("drinkThumb")
        drinkName.classList.add("drinkTitle")
        drinkInstructions.classList.add("drinkIns")

        drinkInfoContainer.classList.add("drinkInfoContainer")
        drinkInfoLeft.classList.add("drinkInfoL")
        drinkwrap.classList.add('drinkwrap')

        drinkInfoRight.classList.add("drinkInfoR")


        drinkName.innerText = data.drinks[i].strDrink
        drinkImg.src = data.drinks[i].strDrinkThumb
        drinkThumb.src = data.drinks[i].strDrinkThumb + "/preview"
        drinkThumb.alt = data.drinks[i].strDrink + " in a glass thumbnail"




        drinkImg.alt = data.drinks[i].strDrink + " in a glass"
        drinkInstructions.innerText = "How to make it:"
        drinkSteps.innerText = data.drinks[i].strInstructions


        drinkTcont.appendChild(drinkImg)
        drinkTcont.appendChild(drinkName)
        drinkInfoLeft.appendChild(drinkGlass)
        
        drinkInfoLeft.appendChild(drinkIngredH)
        drinkInfoLeft.appendChild(drinkIngred)
        drinkInfoLeft.appendChild(drinkIndredlist)

        drinkInfoRight.appendChild(drinkInstructions)
             
        drinkInfoRight.appendChild(drinkSteps)
       // drinkInfoRight.appendChild(drinkThumb)
  
        drinkwrap.appendChild(drinkTcont)


        drinkInfoContainer.appendChild(drinkInfoLeft)
        drinkInfoContainer.appendChild(drinkInfoRight)

        
       

        drinkwrap.appendChild(drinkInfoContainer)
        
       
        drinkContainer.appendChild(drinkwrap)

        main.appendChild(drinkContainer)


    }

    const back = document.getElementById("slideBack")
    const front = document.querySelector("#slideFront")
    if ( data.drinks.length > 1) {
  
    front.classList.remove('hide')
    back.classList.remove('hide')
    front.classList.add('show')
    back.classList.add('show')
    const main2 = document.querySelector("main")




    const bbuttons = document.querySelectorAll("[data-carousel-button]")

    document.querySelector('#formli').classList.add("formliafter");
    document.querySelector('#flexul').classList.add("flexulafter");
    document.querySelector('#formlibtn').classList.add("formlibtnafter");

    bbuttons.forEach(b => {
        b.addEventListener('click', () => {
            const offset = b.dataset.carouselButton === "next" ? 1 : -1;
            const slides = b.closest("[data-carousel]").querySelector("[data-slides]")


            const activeSlide = slides.querySelector("[data-active]")
          
            let newIndex = [...slides.children].indexOf(activeSlide) + offset

            if (newIndex < 0) {
                newIndex = slides.children.length - 1;
            }
            if (newIndex >= slides.children.length) {
                newIndex = 0;
            }

            slides.children[newIndex].dataset['active'] = true
            
            slides.children[newIndex].style.opacity = 0;
            setTimeout(() => {
                slides.children[newIndex].style.opacity = 1;
            }, this.animationDelay + 20)
            slides.children[newIndex].style.transition = "200ms opacity ease-in-out";
          
            delete activeSlide.dataset[
                'active'
            ]
        })

    })} else {

            front.classList.remove('show')
            back.classList.remove('show')
            front.classList.add('hide')
            back.classList.add('hide')
    } 
/*    document.querySelector('form').addEventListener('click', function(e) {

        document.querySelectorAll("article").forEach((q) => q.remove()) 
        document.querySelector('form').value=""       
        
       
    
        e.target.value = ""

        })*/}
    }
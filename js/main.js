//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('form').addEventListener('submit', getDrink)

const main = document.querySelector("main")

function getDrink(e) {
    e.preventDefault();
    let drink = document.querySelector('input').value;


    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        .then(res => res.json())
        .then(data => {
            console.dir(data)
            let drinkCount = data.drinks.length


            for (let i = 0; i < drinkCount; i++) {


                const drinkContainer = document.createElement("article")
                drinkContainer.classList.add('flexCard')
                drinkContainer.classList.add('slide')

                const drinkwrap = document.createElement('section'
                )
                const drinkInfoContainer = document.createElement("div")
                const drinkInfoLeft = document.createElement("div") 
                const drinkInfoRight = document.createElement("div")

                const drinkImg = document.createElement("img")
                
                const drinkName = document.createElement("h2")

                const drinkInstructions = document.createElement("h3")
                const drinkSteps = document.createElement("p")
                const drinkThumb = document.createElement("img")
                const drinkTcont = document.createElement('div')

                if (i === 0) {
                    drinkContainer.dataset['active'] = true

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
                drinkInstructions.innerText = "How to make: "
                drinkSteps.innerText = data.drinks[i].strInstructions


                drinkTcont.appendChild(drinkImg)
                drinkTcont.appendChild(drinkName)
                drinkInfoLeft.appendChild(drinkInstructions)
                     
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
                    delete activeSlide.dataset[
                        'active'
                    ]
                })

            })

            document.querySelector('form').addEventListener('click', () => {
                location.reload()
            })

        }).catch(err => {
            console.log(`An error: ${err} was encountered, try again.`)
        })

}
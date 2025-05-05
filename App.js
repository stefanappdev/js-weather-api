
<%- include('../partials/header.ejs') %>

<main id="main-app">
    
    
    
    <h1 id="App-title"><%- title %></h1>

    <div class="form-container" >
        <form id="Weather-form">
            <label for="city-name">Enter your city:</label>
            
            <input type="text" id="city-name" name="city-name" placeholder="search for a city"/>

            <div class="weather-form-btns-container">
                <input type="submit" name="submit-button" class="weather-form-button" id="weather-form-submit-button" value="Submit" />
                <input type="button" name="reest-button" class="weather-form-button" id="weather-form-reset-button"  value="reset" />
            </div>
           
        </form>

        <br/>

    </div>
       
 
 
 
 
    <div id="weather-cards-div">




    </div>




   

        <script>
                // html elements
                let Form=document.querySelector('#Weather-form');
                let resetbtn=document.querySelector('#weather-form-reset-button');
                let weathercardscontainer=document.querySelector('#weather-cards-div');

            

                //object to store info about new card

                let ID=1;

                let newcard={
                    id:ID,
                    city:'',
                    country:'',
                    forecast:'',
                    temperature:'',
                }


               ///reset button event listener
               resetbtn.addEventListener('click',function(event){
                    localStorage.clear();
                    alert('all data reset');
                    weathercardscontainer.innerHTML='';


               })
                
                
                
                Form.addEventListener('submit',(event)=>{
                    
                            event.preventDefault();
                            //console.log("city-name is:",event.target['city-name'].value)
                            //submits city and returns weather for city submitted



                    ////random change here

                            
                            //checks if user enters a city
                            
                            if(event.target['city-name'].value===''){
                                    alert('please enter a city');
                                    return
                            }


                            let city=event.target['city-name'].value;
                            let key='<%- key %>'
                            let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

                        fetch(url)
                                    .then(response=>response.json())
                                    .then(data=>{
                                        //set  new card details from api data

                                        //set info for new card
                                        newcard.city=data.name;
                                        newcard.country=data.sys.country;
                                        newcard.forecast=data.weather[0].description;
                                        newcard.temperature=data.main.temp;
                                        

                                        

                                        //function to add new weather card to local storage and then display 
                                        const addnewCard=(cardobj)=>{

                                             
                                            const addNewCardDataToLocalStorage=(cardobj)=>{

                                                 //add new card data to local storage if it exists, create new local storage
                                                //then add card if it doesnt
                                            
                                                if(JSON.parse(localStorage.getItem('weathercards'))===null){
                                                    
                                                    localStorage.setItem('weathercards',JSON.stringify([cardobj]));
                                                   
                                                    
                                                        }


                                                //update local storage if it exists with new card
                                                else if(JSON.parse(localStorage.getItem('weathercards'))!==null){ 
                                                    

                                                    let currentWeatherCards=JSON.parse(localStorage.getItem('weathercards'));

                                                    //dont re-add card info exists already in local storage 
                                                    let target=currentWeatherCards.find(card=>card.city===cardobj.city&&card.country===cardobj.country)
                                                    
                                                    if(target){
                                                        alert('card already in local storage')
                                                        return
                                                    }


                                                   //update id before adding new card
                                                    cardobj.id+=1;
                                                    localStorage.setItem('weathercards',JSON.stringify([...currentWeatherCards,cardobj]));
                                                    
                                                }


                                                

                                            }




                                            //create a function to update container of weathercards with new card(to be completed)
                                            const addNewCardToDisplaySection=(cardobj)=>{

                                                let currentLocalStorage=JSON.parse(localStorage.getItem('weathercards'));
                                                
                                                let newweathercard=document.createElement('div');
                                                let cardlocationheader=document.createElement('h2');
                                                let cardimgcontainer=document.createElement('div');
                                                let cardforecast=document.createElement('span');
                                                let cardtemp=document.createElement('span');
                                                let cardimage=document.createElement('img');

                                                let target=currentLocalStorage.find(card=>card.city===cardobj.city&&card.country===cardobj.country)
                                                
                                                if (target){

                                                    //js to add info to new card

                                                    cardlocationheader.textContent=`${target.city},${target.country}`;
                                                    cardimage.setAttribute('alt','forecast image of card ');
                                                    cardforecast.textContent=`${target.forecast}`;
                                                    cardtemp.textContent=`Temperature:${target.temperature}`;
                                                   
                                                   
                                                    //js to add new card to display section

                                                    //selectors for card components
                                                    newweathercard.classList.add('weathercard');
                                                    cardimage.classList.add('cardimage');
                                                    cardimgcontainer.classList.add('cardimgcontainer')
                                                    cardtemp.classList.add('cardtemp');
                                                    cardforecast.classList.add('cardforecast');
                                                    cardlocationheader.classList.add('cardlocationheader')



                                                    cardimgcontainer.appendChild(cardimage);
                                                    newweathercard.appendChild(cardlocationheader);
                                                    newweathercard.appendChild(cardimgcontainer);
                                                    newweathercard.appendChild(cardforecast);
                                                    newweathercard.appendChild(cardtemp);
                                                    weathercardscontainer.appendChild(newweathercard)

                                                }
                                                   


                                            }




                                            addNewCardDataToLocalStorage(cardobj);
                                            addNewCardToDisplaySection(cardobj);




                                        }









                        addnewCard(newcard)
                        console.log("my weather cards:", JSON.parse(localStorage.getItem('weathercards')));
                        })
                
                            
                    
                    //clear city input field
                    event.target['city-name'].value='';
            });


            </script>





  

    

    <%- include('../partials/footer.ejs') %>

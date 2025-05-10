//the main color is the color saved in local storage
let mainColor = localStorage.getItem("color-option");

document.documentElement.style.setProperty('--main--color',mainColor);
// make the color selected with active class
document.querySelectorAll(".color-list li").forEach(ele =>{
    ele.classList.remove("active");
    if(ele.dataset.color === mainColor){
        ele.classList.add("active");
    }
})


// start random change for the background image

let landingpage = document.querySelector(".landing-page");

let imgArray = ["img01.jpg", "img02.jpg", "img03.jpg", "img04.jpg"];

let backgroundOption = false;

let backgroundInterval;

let backgroundLocalItem = localStorage.getItem("background-option");

if(backgroundLocalItem !== null){
    // data type in local storage always string
    if(backgroundLocalItem === "true"){
        backgroundOption = true;
    }else{
        backgroundOption = false;
    }
}

document.querySelectorAll(".random-back span").forEach(ele=>{
    ele.classList.remove("active");
})

if(backgroundLocalItem === "true"){
    document.querySelector(".random-back .yes").classList.add("active");
}else{
    document.querySelector(".random-back .no").classList.add("active");
}

function randomizeImg(){
    if(backgroundOption === true){
        backgroundInterval = setInterval(() =>{
            let randomNum = Math.floor(Math.random() * imgArray.length);
        
            landingpage.style.backgroundImage = 'url("images/'+imgArray[randomNum]+'")'
        },1000);
        
    }
}


// end random change for the background image

//start setting box 
let gear = document.querySelector(".icon");
let box = document.querySelector(".setting-box");
// make the box state fixed
box.style.left = localStorage.getItem("boxstyle");

gear.addEventListener("click", function(){
    if(box.style.left == '-200px'){
        box.style.left = '0';
    }else{
        box.style.left = '-200px';
    }
    localStorage.setItem("boxstyle",box.style.left)
});
//end setting box

//start color change
const colorli = document.querySelectorAll(".color-list li");

colorli.forEach(li => {
    li.addEventListener("click", function(e){
        //set color on root
        document.documentElement.style.setProperty('--main--color',e.target.dataset.color);
        //set color on localstorage
        localStorage.setItem("color-option",e.target.dataset.color);
        //document.documentElement.style.setProperty('--main--color',localStorage.getItem("color-option"))
        
        //remove active class from all children
        e.target.parentElement.querySelectorAll(".active").forEach(ele =>{
            ele.classList.remove("active");
        });
        e.target.classList.add("active");
        
    })
});

//end color change

//start random background change
const background = document.querySelectorAll(".random-back span");

background.forEach(span => {
    span.addEventListener("click", function(e){
        
        //remove active class from all children
        e.target.parentElement.querySelectorAll(".active").forEach(ele =>{
            ele.classList.remove("active");
        });
        e.target.classList.add("active");
        if(e.target.dataset.background === 'yes'){
            backgroundOption = true;
            randomizeImg();
            localStorage.setItem("background-option", true);
        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option", false);
        }
    })
});
// call the function when reload the page without click again 
if(backgroundLocalItem === "true"){
    randomizeImg();
}
//end random background change

//start bullets state
let bulletsSpan = document.querySelectorAll(".bullets-state span");
let bulletsContainer = document.querySelector(".nav-bullets");

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        bulletsSpan.forEach(s => s.classList.remove("active"));
        e.target.classList.add("active");

        if (e.target.dataset.bullet === "show") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_option", "show");
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_option", "hide");
        }
    });
});

//local storage
let bulletOption = localStorage.getItem("bullets_option");
if(bulletOption !== null){
    bulletsSpan.forEach(s => s.classList.remove("active"));
    if(bulletOption === "show"){
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-state .yes").classList.add("active");
    }else{
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-state .no").classList.add("active");
    }
}
//end bullets state

//skills animation
let ourSkills = document.querySelector(".skills");

window.onscroll = function(){
    //skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;

    //skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //window height
    let windowHeight = this.innerHeight;

    //widow scroll top
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        let allSkills = document.querySelectorAll(".skills .skills-cards .skill-card span");

        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        })
    };
};

// gallery

let ourGallery = document.querySelectorAll(".gallery .img img");

ourGallery.forEach(img=>{
    img.addEventListener("click", ()=>{
        //create overley
        let overley = document.createElement("div");
        overley.className = "popup-overley";
        document.body.appendChild(overley);

        //create popup
        let popUpBox = document.createElement("div");
        popUpBox.className = "popup-box";

        
        if(img.alt !== null){
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            //append text to imgheading
            imgHeading.appendChild(imgText);
            //append imgheading to popupBox
            popUpBox.appendChild(imgHeading);
        }
        // the image create is the same image that i clicked on
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        
        // append image to box
        popUpBox.appendChild(popupImage);

        document.body.appendChild(popUpBox);

        //create close button
        let closeButton = document.createElement("span");

        let closeText = document.createTextNode("X")
        
        closeButton.appendChild(closeText);
        
        closeButton.className = "close-button";
        
        popUpBox.appendChild(closeButton);

        closeButton.onclick = function(){
            overley.remove();
            popUpBox.remove();
        };
        //remove img when click on overley
        overley.onclick = function(){
            overley.remove();
            popUpBox.remove();
        };
    });
});

//select all bullets and links

function scrolling(element){
    element.forEach(ele=>{
        ele.addEventListener('click', (e)=>{
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            });
        });
    });
};
// variables to apply function on
let bullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll(".links a");

scrolling(bullets);
scrolling(allLinks);

//reset

document.querySelector(".reset-option").onclick = function() {
    localStorage.clear();
    window.location.reload();
}


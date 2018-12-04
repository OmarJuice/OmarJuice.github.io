$(document).ready(function () {
    
    $(".navbar-burger").click(function () {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $('#navbarBasicExample').toggleClass('menu-shift')
        $(".navbar-menu").toggleClass("is-active");

    });
    let speed = 25;
    let increment = 1;
    function Spinner() {
        let deg = 1;

        setInterval(function () {
            $('#dball').css({
                transform: `rotate(${deg}deg)`,
                MozTransform: `rotate(${deg}deg)`,
                OTransform: `rotate(${deg}deg)`,
                webkitTransform: `rotate(${deg}deg)`,
                msTransform: `rotate(${deg}deg)`,
            })
            deg += increment;
            if(deg > 359){
                deg = 1
            }
        }, speed)
    };
    Spinner();
    
    let myNameDisplayed = false;
    $('#dball').on("click", function changeHeroDisplay(e) { 
        e.preventDefault();
        $(this).off("click")
        myNameDisplayed = !myNameDisplayed;
        increment = increment * -1;
        increment = increment * 15;
        if (!myNameDisplayed){$('#myName').slideToggle(400, 'linear', function () {
            $('#alias').slideToggle();
            $('#subtitle').text('A glass half full');
            increment = increment/15;
            $('#dball').on("click", changeHeroDisplay)

        } )}
        else if(myNameDisplayed){
            $('#alias').slideToggle(400, 'linear', function () {
                $('#myName').slideToggle();
                $('#subtitle').text('A Web Developer');
                increment = increment/15;
                $('#dball').on("click", changeHeroDisplay)
            })
        }
    });

    let listsOfTechnologies = $('.techList').text();
    $.each($('.projectCard'), function (indexInArray, valueOfElement) { 
         $(this).attr('id', `project${indexInArray}`)
    });
    let techArr = [];
    for (let list of listsOfTechnologies){
       techArr.push(Array.from(list).join(' '));
    }
    techArr = techArr.join('').split(' ').filter(e=>e);


    function doSearch() {
        let searchStr = $('#Search').val().toLowerCase();
        let searchArr = searchStr.split(/,\s|\s|,/).filter(e => e);
        $('#Search').val('');
        let count = 0;
        for (let str of searchArr) {
            for (let i = 0; i < techArr.length; i++) {

                if (!techArr[i].includes(str)) {
                    $(`#project${i}`).slideUp();
                    count++; console.log(count);
                    $(`#project${i} .card`).css('box-shadow', 'none')
                }
                else {
                    $(`#project${i}`).slideDown();
                    $(`#project${i} .card`).css('box-shadow', '1px 0px 2px 2px green')
                }
            }
            if (count == $('.projectCard').length) {
                $('#Match').text('No matches found.')
                $('#Match').fadeIn(500, 'linear');;
                return;
            }
            else {
                let quantity = ($('.projectCard').length - count);
                console.log(quantity);
                let es = 'es';
                if (quantity === 1) {
                    es = '';
                }
                $('#Match').text(`${quantity} match${es} found.`)
                $('#Match').fadeIn(500, 'linear');
            }
        }

    }
    
    $('#searchButton').click(doSearch);

    $('#refresh').click(function () {
        $('#Match').fadeOut();
        $('.projectCard').slideDown();
        $('.projectCard .card').css('box-shadow', 'none')
    })

    $('#Search').keypress(function (e) { 
        if (e.which === 13){
            doSearch();
            $('#searchButton').toggleClass('is-outlined');
            setTimeout(() => {
                $('#searchButton').toggleClass('is-outlined')
            }, 200);
        }
    });

});





